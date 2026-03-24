import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.db.insert("customers", {
      clerkId: identity.subject,
      name: args.name,
      phone: args.phone,
      email: args.email,
    });
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("customers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const getById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const findByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .unique();
  },
});

export const findByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const listByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    const companyCustomers = await ctx.db
      .query("companyCustomers")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    const customers = await Promise.all(
      companyCustomers.map((cc) => ctx.db.get(cc.customerId))
    );
    return customers.filter(Boolean);
  },
});
