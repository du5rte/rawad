# Schema decisions

## File organisation

The schema lives entirely in `schema.ts` — Convex requires a single file for all table definitions. Query and mutation logic is split into domain files (`bookings.ts`, `customers.ts`, etc.) using Convex's file-based routing, so function references read as `api.bookings.create`, `api.reviews.createCompanyReview`, etc.

Validators are not exported from domain files for reuse in the schema. `Doc<"tableName">` from `_generated/dataModel` covers all typing needs on the query/mutation side.

## Authentication and user types

Two distinct user types both authenticate via Clerk. Role is stored in Clerk public metadata (`role: "agent" | "customer"`) and read from the JWT — not from a database field. On the backend, the caller's identity is always derived server-side via `ctx.auth.getUserIdentity()`, never accepted as a function argument.

- **Agents** — rental company staff, linked to a `companies` record via `agents.companyId`
- **Customers** — renters, have their own Clerk account and `customers` record

## Multi-tenancy

Shared database with `companyId` on every company-scoped table (`agents`, `vehicles`, `bookings`). Tenant isolation is enforced at the query/mutation level — every agent mutation verifies the caller's `companyId` matches the resource before reading or writing.

## Customer identity

Customers are matched by phone or email at booking creation time. If a match is found, the existing `customers` record is used. If not, a new one is created when the customer signs up via the checkout link. This is how the cross-company renter reputation layer is built — one customer profile regardless of how many companies they rent from.

## companyCustomers join table

A dedicated `companyCustomers` table (not derived from `bookings`) tracks which customers have rented from which company. This keeps "list all customers for company X" a simple indexed query rather than a deduplication problem. It is populated when a booking is created.

## Documents and payment methods

Both belong to the **customer**, not to the company or booking. A customer uploads their passport once; any company they book with can access it via the booking relationship. Same for saved cards — one card on file usable across companies.

`paymentMethods` is a separate table (not an array on the customer document) because individual records need to be patched or deleted independently (set default, remove card, Stripe webhooks). Rewriting the full array on every mutation would be wasteful and error-prone.

## Reviews

Three separate tables rather than a single polymorphic/union table:

| Table | Who writes | Who is reviewed |
|---|---|---|
| `companyReviews` | Agent | Customer |
| `customerReviews` | Customer | Company |
| `vehicleReviews` | Customer | Vehicle |

All three are tied to a `bookingId`. A discriminated union in a single table was considered and rejected — indexes cannot efficiently target a field that only exists on some variants.

Aggregate rating (average + count per customer/company/vehicle) is intentionally not embedded in the reviewed document. When needed, a separate `reviewStats` document per entity will be maintained as a denormalized counter, updated in the same mutation that creates the review.

## Booking status flow

```
pending_documents → documents_submitted → card_saved → rta_registered → active → completed
                                                                                 ↘ cancelled
```

## Vehicles

`fuelType` and `electrification` are two separate fields serving different purposes:

- `fuelType` — customer-facing label used in the UI (petrol / diesel / hybrid). Always set.
- `electrification` — specific powertrain classification. Only set when relevant; omit for pure combustion vehicles.

Electrification values:

| Value | Meaning |
|---|---|
| `MHEV` | Mild Hybrid — small motor assists the engine, cannot drive on electricity alone |
| `HEV` | Full Hybrid — electric-only at low speed, self-charging, no plug needed |
| `PHEV` | Plug-in Hybrid — chargeable battery with meaningful electric-only range before combustion kicks in |
| `BEV` | Battery Electric Vehicle — fully electric, no combustion engine |

The split avoids exposing powertrain jargon to all users while still enabling powertrain-specific filtering.

## Checkout token

A plain UUID generated via `crypto.randomUUID()` at booking creation. Stored on the booking as `checkoutToken`. The token is the session — no customer login is required to open the checkout link, but the customer will be prompted to sign up or log in via Clerk to save their profile.
