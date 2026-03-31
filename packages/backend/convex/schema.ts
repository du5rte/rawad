import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { discount, money, vehicleRates } from "./pricing";

export default defineSchema({
  companies: defineTable({
    name: v.string(),
  }),

  agents: defineTable({
    clerkId: v.string(),
    companyId: v.id("companies"),
    role: v.union(v.literal("owner"), v.literal("agent")),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_company", ["companyId"]),

  customers: defineTable({
    clerkId: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_phone", ["phone"])
    .index("by_email", ["email"]),

  companyCustomers: defineTable({
    companyId: v.id("companies"),
    customerId: v.id("customers"),
  })
    .index("by_company", ["companyId"])
    .index("by_company_and_customer", ["companyId", "customerId"]),

  vehicles: defineTable({
    companyId: v.id("companies"),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    plateNumber: v.string(),
    status: v.union(
      v.literal("available"),
      v.literal("rented"),
      v.literal("maintenance"),
    ),
    rates: vehicleRates,
    photos: v.array(v.id("_storage")),
    description: v.optional(v.string()),
    specs: v.optional(
      v.object({
        engine: v.optional(v.string()),
        horsepower: v.optional(v.number()),
        acceleration: v.optional(v.string()),
        drive: v.optional(
          v.union(
            v.literal("FWD"),
            v.literal("RWD"),
            v.literal("AWD"),
            v.literal("4WD"),
          ),
        ),
        transmission: v.optional(
          v.union(v.literal("automatic"), v.literal("manual")),
        ),
        fuelType: v.optional(
          v.union(
            v.literal("petrol"),
            v.literal("diesel"),
            v.literal("hybrid"),
          ),
        ),
        electrification: v.optional(
          v.union(
            v.literal("MHEV"),
            v.literal("HEV"),
            v.literal("PHEV"),
            v.literal("BEV"),
          ),
        ),
        seats: v.optional(v.number()),
        doors: v.optional(v.number()),
        luggage: v.optional(v.number()),
        color: v.optional(v.string()),
        category: v.optional(
          v.union(
            v.literal("sedan"),
            v.literal("suv"),
            v.literal("coupe"),
            v.literal("convertible"),
            v.literal("van"),
            v.literal("truck"),
          ),
        ),
      }),
    ),
  })
    .index("by_company", ["companyId"])
    .index("by_company_and_status", ["companyId", "status"]),

  bookings: defineTable({
    companyId: v.id("companies"),
    customerId: v.id("customers"),
    vehicleId: v.optional(v.id("vehicles")),
    createdBy: v.id("agents"),
    checkoutToken: v.string(),
    status: v.union(
      v.literal("pending_documents"),
      v.literal("documents_submitted"),
      v.literal("card_saved"),
      v.literal("rta_registered"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    startDate: v.number(),
    endDate: v.number(),
    priceBreakdown: v.optional(
      v.object({
        effectiveRate: money,
        days: v.number(),
        subtotal: money,
        discounts: v.array(discount),
        total: money,
      }),
    ),
  })
    .index("by_company", ["companyId"])
    .index("by_customer", ["customerId"])
    .index("by_checkout_token", ["checkoutToken"])
    .index("by_company_and_status", ["companyId", "status"]),

  documents: defineTable({
    customerId: v.id("customers"),
    type: v.union(
      v.literal("passport"),
      v.literal("eid"),
      v.literal("driving_licence"),
    ),
    storageId: v.id("_storage"),
  })
    .index("by_customer", ["customerId"])
    .index("by_customer_and_type", ["customerId", "type"]),

  paymentMethods: defineTable({
    customerId: v.id("customers"),
    stripePaymentMethodId: v.string(),
    last4: v.string(),
    brand: v.string(),
    expiryMonth: v.number(),
    expiryYear: v.number(),
    isDefault: v.boolean(),
  }).index("by_customer", ["customerId"]),

  companyReviews: defineTable({
    bookingId: v.id("bookings"),
    customerId: v.id("customers"),
    companyId: v.id("companies"),
    reviewedBy: v.id("agents"),
    rating: v.union(
      v.literal(1),
      v.literal(2),
      v.literal(3),
      v.literal(4),
      v.literal(5),
    ),
    note: v.optional(v.string()),
  })
    .index("by_customer", ["customerId"])
    .index("by_company_and_customer", ["companyId", "customerId"])
    .index("by_booking", ["bookingId"]),

  customerReviews: defineTable({
    bookingId: v.id("bookings"),
    customerId: v.id("customers"),
    companyId: v.id("companies"),
    rating: v.union(
      v.literal(1),
      v.literal(2),
      v.literal(3),
      v.literal(4),
      v.literal(5),
    ),
    note: v.optional(v.string()),
  })
    .index("by_company", ["companyId"])
    .index("by_customer", ["customerId"])
    .index("by_booking", ["bookingId"]),

  vehicleReviews: defineTable({
    bookingId: v.id("bookings"),
    customerId: v.id("customers"),
    vehicleId: v.id("vehicles"),
    rating: v.union(
      v.literal(1),
      v.literal(2),
      v.literal(3),
      v.literal(4),
      v.literal(5),
    ),
    note: v.optional(v.string()),
  })
    .index("by_vehicle", ["vehicleId"])
    .index("by_customer", ["customerId"])
    .index("by_booking", ["bookingId"]),
});
