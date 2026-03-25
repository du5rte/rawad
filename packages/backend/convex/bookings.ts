import { calcPriceBreakdown } from "@rawad/core";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { discount } from "./pricing";

export const create = mutation({
  args: {
    companyId: v.id("companies"),
    customerId: v.id("customers"),
    vehicleId: v.optional(v.id("vehicles")),
    startDate: v.number(),
    endDate: v.number(),
    discounts: v.optional(v.array(discount)),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const agent = await ctx.db
      .query("agents")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!agent || agent.companyId !== args.companyId)
      throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("companyCustomers")
      .withIndex("by_company_and_customer", (q) =>
        q.eq("companyId", args.companyId).eq("customerId", args.customerId),
      )
      .unique();
    if (!existing) {
      await ctx.db.insert("companyCustomers", {
        companyId: args.companyId,
        customerId: args.customerId,
      });
    }

    let priceBreakdown: ReturnType<typeof calcPriceBreakdown> | undefined;
    if (args.vehicleId) {
      const vehicle = await ctx.db.get(args.vehicleId);
      if (vehicle) {
        priceBreakdown = calcPriceBreakdown(
          vehicle,
          args.startDate,
          args.endDate,
          args.discounts ?? [],
        );
      }
    }

    const checkoutToken = crypto.randomUUID();
    const bookingId = await ctx.db.insert("bookings", {
      companyId: args.companyId,
      customerId: args.customerId,
      vehicleId: args.vehicleId,
      createdBy: agent._id,
      checkoutToken,
      status: "pending_documents",
      startDate: args.startDate,
      endDate: args.endDate,
      priceBreakdown,
    });

    return { bookingId, checkoutToken };
  },
});

export const getByCheckoutToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_checkout_token", (q) => q.eq("checkoutToken", args.token))
      .unique();
  },
});

export const listByCompany = query({
  args: {
    companyId: v.id("companies"),
    status: v.optional(
      v.union(
        v.literal("pending_documents"),
        v.literal("documents_submitted"),
        v.literal("card_saved"),
        v.literal("rta_registered"),
        v.literal("active"),
        v.literal("completed"),
        v.literal("cancelled"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const { status } = args;
    if (status) {
      return await ctx.db
        .query("bookings")
        .withIndex("by_company_and_status", (q) =>
          q.eq("companyId", args.companyId).eq("status", status),
        )
        .order("desc")
        .take(100);
    }
    return await ctx.db
      .query("bookings")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .take(100);
  },
});

export const updateDates = mutation({
  args: {
    id: v.id("bookings"),
    token: v.string(),
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking || booking.checkoutToken !== args.token)
      throw new Error("Not found");
    if (booking.status !== "pending_documents")
      throw new Error("Dates cannot be changed at this stage");

    let priceBreakdown: ReturnType<typeof calcPriceBreakdown> | undefined;
    if (booking.vehicleId) {
      const vehicle = await ctx.db.get(booking.vehicleId);
      if (vehicle) {
        priceBreakdown = calcPriceBreakdown(
          vehicle,
          args.startDate,
          args.endDate,
          booking.priceBreakdown?.discounts ?? [],
        );
      }
    }

    await ctx.db.patch(args.id, {
      startDate: args.startDate,
      endDate: args.endDate,
      priceBreakdown,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(
      v.literal("pending_documents"),
      v.literal("documents_submitted"),
      v.literal("card_saved"),
      v.literal("rta_registered"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
