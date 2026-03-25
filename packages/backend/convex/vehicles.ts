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
        acceleration: v.optional(v.string()),
        drive: v.optional(v.string()),
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
