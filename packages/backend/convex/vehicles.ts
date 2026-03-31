import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { vehicleRates } from "./pricing";

export const create = mutation({
  args: {
    companyId: v.id("companies"),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    plateNumber: v.string(),
    rates: vehicleRates,
    photos: v.optional(v.array(v.id("_storage"))),
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
        // Customer-facing fuel type
        fuelType: v.optional(
          v.union(
            v.literal("petrol"),
            v.literal("diesel"),
            v.literal("hybrid"),
          ),
        ),
        // Specific powertrain classification (omit for pure combustion)
        // "MHEV" — Mild Hybrid: small motor assists engine, cannot drive alone
        // "HEV"  — Full Hybrid: electric-only at low speed, self-charging
        // "PHEV" — Plug-in Hybrid: chargeable battery, meaningful electric-only range before combustion kicks in
        // "BEV"  — Battery Electric Vehicle: fully electric, no combustion engine
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
  },
  handler: async (ctx, args) => {
    const { photos, ...rest } = args;
    return await ctx.db.insert("vehicles", {
      ...rest,
      photos: photos ?? [],
      status: "available",
    });
  },
});

export const listByCompany = query({
  args: {
    companyId: v.id("companies"),
    status: v.optional(
      v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("maintenance"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const { status } = args;
    if (status) {
      return await ctx.db
        .query("vehicles")
        .withIndex("by_company_and_status", (q) =>
          q.eq("companyId", args.companyId).eq("status", status),
        )
        .collect();
    }
    return await ctx.db
      .query("vehicles")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("vehicles"),
    status: v.union(
      v.literal("available"),
      v.literal("rented"),
      v.literal("maintenance"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
