import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ratingValidator = v.union(
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
);

// Company rates customer
export const createCompanyReview = mutation({
  args: {
    bookingId: v.id("bookings"),
    rating: ratingValidator,
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const agent = await ctx.db
      .query("agents")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!agent) throw new Error("Unauthorized");

    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.companyId !== agent.companyId)
      throw new Error("Unauthorized");

    return await ctx.db.insert("companyReviews", {
      bookingId: args.bookingId,
      customerId: booking.customerId,
      companyId: booking.companyId,
      reviewedBy: agent._id,
      rating: args.rating,
      note: args.note,
    });
  },
});

export const listCompanyReviewsByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("companyReviews")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .order("desc")
      .take(50);
  },
});

// Customer rates company
export const createCustomerReview = mutation({
  args: {
    bookingId: v.id("bookings"),
    rating: ratingValidator,
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const customer = await ctx.db
      .query("customers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!customer) throw new Error("Unauthorized");

    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.customerId !== customer._id)
      throw new Error("Unauthorized");

    return await ctx.db.insert("customerReviews", {
      bookingId: args.bookingId,
      customerId: customer._id,
      companyId: booking.companyId,
      rating: args.rating,
      note: args.note,
    });
  },
});

export const listCustomerReviewsByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customerReviews")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .take(50);
  },
});

// Customer rates vehicle
export const createVehicleReview = mutation({
  args: {
    bookingId: v.id("bookings"),
    rating: ratingValidator,
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const customer = await ctx.db
      .query("customers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!customer) throw new Error("Unauthorized");

    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.customerId !== customer._id)
      throw new Error("Unauthorized");
    if (!booking.vehicleId)
      throw new Error("No vehicle assigned to this booking");

    return await ctx.db.insert("vehicleReviews", {
      bookingId: args.bookingId,
      customerId: customer._id,
      vehicleId: booking.vehicleId,
      rating: args.rating,
      note: args.note,
    });
  },
});

export const listVehicleReviewsByVehicle = query({
  args: { vehicleId: v.id("vehicles") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("vehicleReviews")
      .withIndex("by_vehicle", (q) => q.eq("vehicleId", args.vehicleId))
      .order("desc")
      .take(50);
  },
});
