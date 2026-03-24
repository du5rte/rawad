import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const upsert = mutation({
  args: {
    type: v.union(
      v.literal("passport"),
      v.literal("eid"),
      v.literal("driving_licence")
    ),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const customer = await ctx.db
      .query("customers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!customer) throw new Error("Customer not found");

    const existing = await ctx.db
      .query("documents")
      .withIndex("by_customer_and_type", (q) =>
        q.eq("customerId", customer._id).eq("type", args.type)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { storageId: args.storageId });
      return existing._id;
    }

    return await ctx.db.insert("documents", {
      customerId: customer._id,
      type: args.type,
      storageId: args.storageId,
    });
  },
});

export const listByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect();
  },
});
