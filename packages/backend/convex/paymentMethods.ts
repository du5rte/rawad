import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const save = mutation({
  args: {
    stripePaymentMethodId: v.string(),
    last4: v.string(),
    brand: v.string(),
    expiryMonth: v.number(),
    expiryYear: v.number(),
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
      .query("paymentMethods")
      .withIndex("by_customer", (q) => q.eq("customerId", customer._id))
      .collect();

    for (const pm of existing) {
      await ctx.db.patch(pm._id, { isDefault: false });
    }

    return await ctx.db.insert("paymentMethods", {
      customerId: customer._id,
      stripePaymentMethodId: args.stripePaymentMethodId,
      last4: args.last4,
      brand: args.brand,
      expiryMonth: args.expiryMonth,
      expiryYear: args.expiryYear,
      isDefault: true,
    });
  },
});

export const listByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("paymentMethods")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect();
  },
});
