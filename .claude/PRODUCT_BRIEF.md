# Rawad · رواد
**Fleet management and real-time booking infrastructure for Dubai car rentals**

---

## Problem

Dubai's on-demand culture (food in 20 minutes, rides in 3 minutes) breaks down completely when renting a car. Rentals advertise unavailable inventory, operate on WhatsApp and Google Sheets, and have no system to provide accurate delivery estimates. Cars arrive hours late, customers miss events, and no one is accountable.

Beneath that, a more serious problem: when customers incur fines or cause accidents and leave the country, rental owners have no recourse. Deposits are returned before RTA fines arrive (often days later), and most customers who flee simply block contact. There is no renter reputation layer. No Airbnb-style history that lets a rental owner know who they are dealing with before handing over the keys.

---

## Branding

**Name:** Rawad · رواد

**Arabic meaning:** Pioneers. Those who go first, open new paths, lead the way. A name that positions the product as the infrastructure layer that didn't exist before.

**English resonance:** Sounds like "road" to English ears. A subtle, unforced connection to driving, journey, and movement. Not stated, not branded around, just there. The kind of thing that feels right without knowing why.

**Tone:** Confident, quiet, infrastructure-grade. Not a startup trying to be fun. A system rental companies trust to run their business on.

**Visual identity:** Near-black wordmark. No icon needed at launch; the name carries. If an icon is introduced, it should be geometric and abstract, not a steering wheel or car silhouette.

**Language:** Product UI defaults to English. Arabic RTL support is considered from the token and layout level given the UAE market, not treated as an afterthought.

---

## Solution

Rawad sells a B2B SaaS booking engine to rental companies, starting with the single most painful workflow: RTA driver registration. The MMMVP removes the WhatsApp-chase and Google Sheets entirely by giving rentals a self-checkout link they forward to customers. Customers submit their own documents and save a payment method. That data feeds directly into the RTA registration flow.

Over time, stored customer profiles and a renter reputation system create a trust layer the industry currently has zero of.

---

## Scope

### v1 (MMMVP)

**01. Self-checkout link generator**
Rental agent generates a unique link per booking. Customer opens it on their device, uploads documents, and saves a card on file. No login required from the customer; the link is the session.

**02. Customer card on file**
During self-checkout, the customer saves a payment method (tokenised via Stripe or Telr). The card is stored against their Rawad profile, not shared with the rental directly. Enables post-rental charging for fines and damages without a held deposit. This is the rental owner's single biggest financial risk, addressed at checkout.

**03. RTA registration pre-fill**
Submitted customer data auto-populates the RTA fleet management form. The agent reviews and submits. Eliminates manual re-entry and reduces a 10-minute, error-prone task to one confirmation.

**04. Renter reputation and reviews**
After each rental, the agent rates the customer (1 to 5, with optional notes). Ratings attach to the customer's Rawad profile and are visible to any rental company on the platform. An Airbnb-style trust layer. Deters bad actors, rewards reliable renters, and becomes more valuable with every rental company that joins the network.

### v2

**05. Real-time fleet availability dashboard**
Live inventory with per-car status and estimated delivery windows. Resolves the "let me call my boss" problem and enables honest advertising.

**06. Estimated delivery time display**
Customer-facing ETA using fleet location and prep time. The Deliveroo moment for car rentals.

### v3+

**07. Remote lock/unlock, self-pickup, on-demand rental**
Keyless handoff, 24/7 self-service rental, scooter-style on-demand booking.

---

## User Personas

**Rental ops manager / owner** *(primary seller target)*
Walks through the door. Cares about reducing WhatsApp chaos, fewer booking mistakes, faster RTA compliance, and recovering fines from customers who flee. Pays the subscription.

**Rental booking agent** *(primary daily user)*
Uses the dashboard every day. Cares about speed, not chasing documents, and knowing a customer's rental history before handing over the keys.

---

## Business Model

**Revenue:** SaaS subscription per rental company. Tiered by fleet size or feature access. Monthly recurring.

**Go-to-market:** Direct field sales. Walk into every rental on Google Maps Dubai. A car and petrol is the full marketing budget. Rejections become product research.

---

## Network Moat

The renter reputation system only has value when multiple rental companies are on the platform. This is the network effect that makes Rawad defensible: every new rental company that joins makes the existing ones safer. A single rental's review of a bad customer protects every other rental on the network. The long-term moat is not the booking engine or the RTA pre-fill. It is the shared trust layer no individual rental can build alone.

---

## Technical Spikes

Resolve these before writing product code.

**Spike 1: RTA integration**
Does RTA expose an API for driver and vehicle registration? If not, the path is Playwright browser automation to pre-fill and submit their web form. This determines whether v1 is a one-click submit or a review-and-submit-manually flow. Must be resolved in week 1.

**Spike 2: Payment tokenisation and post-rental charging**
Card on file requires a PCI-compliant payment provider (Stripe or Telr for UAE). The charge model for fines needs legal review. Is Rawad the merchant of record, or does it pass the charge through to the rental company? This affects the entire payment architecture and potentially requires a UAE financial services registration.

**Spike 3: Document storage and PDPL compliance**
Customer passports, EIDs, and licences are PII under UAE data protection law (PDPL). Storage must be encrypted at rest, tenant-isolated per rental company, with defined retention and deletion policies. This architecture must be finalised before any data flows are built.

**Spike 4: Convex multi-tenancy**
Validate the Convex data model for tenant isolation (per company). Confirm live query performance at fleet dashboard scale with concurrent bookings. Decide between a shared DB with row-level security versus per-tenant isolation.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Monorepo | pnpm workspaces |
| Web app | `apps/web` — Next.js (App Router) |
| Mobile | `apps/mobile` — Expo (React Native) |
| Backend | `packages/backend` — Convex |
| Shared UI | `packages/ui` |
| Core logic | `packages/core` |
| Payments | Stripe or Telr (UAE) — pending Spike 2 |
| RTA automation | Playwright — pending Spike 1 |
| Language | TypeScript throughout |

---

## Design Language

**Aesthetic:** Premium minimalism. Expensive restraint. High contrast with minimal mid-grey tones. Luxury communicated through reduction. Reference products: Uber, Revolut, N26, Tesla app.

**Typography:** Inter. Weight contrast between 400 and 600 carries the full hierarchy. No display fonts; the UI is the product.

**Color:** Near-black and white as the dominant surface palette. One brand accent used sparingly for CTAs and active states only. No gradients, no illustration, no decorative color.

**Layout:** Card-based. Generous whitespace. Consistent 24px grid. Every screen should feel like it could belong in a fintech app — precision over expressiveness.

**Figma structure:** Design tokens first (color, type scale, spacing, radius), component library second (button, input, card, badge, table row, nav), screens third, prototype flows fourth.

**RTL:** Arabic layout support built in at the token level from the start.

---

## Key Screens (Figma Scope)

**A. Agent dashboard — bookings overview**
Table of active bookings. Status per row: documents pending, card saved, RTA registered, car assigned, delivered, review pending.

**B. New booking and link generator**
Form with customer name, phone, car, and dates. On submit, generates a shareable self-checkout link for copying or sharing via WhatsApp.

**C. Customer self-checkout (mobile-first web)**
Customer opens the link on their phone. Sees the booking summary. Uploads passport, EID, and driving licence. Saves card on file. Confirms. No login required.

**D. RTA pre-fill review screen**
Auto-populated RTA form fields pulled from submitted documents. Agent reviews, corrects if needed, and submits to RTA.

**E. Customer profile — renter record**
Agent view of a customer's profile: documents on file, card on file status, rental history across all Rawad rentals, aggregate rating, and written reviews from other rental companies.

**F. Post-rental review flow**
After rental closes, agent rates the customer 1 to 5 with an optional note. If a fine or damage charge needs to be raised, the card-on-file payment is triggered from the same screen.

---

## Out of Scope (v1)

Rawad v1 is a tool sold to rental companies. They are the customer, not the end driver. The end driver interacts only through the self-checkout link.

Not in v1: a customer-facing marketplace, GPS fleet tracking, multi-city expansion, an app store app, or payment processing for the rental transaction itself (only post-rental charges for fines and damages).