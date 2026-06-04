import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getUserByClerkUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        if (!userId) return null;

        return await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();
    },
})

export const upsertUser = mutation({
    args: { userId: v.string(), name: v.string(), email: v.string(), imageUrl: v.string() },
    handler: async (ctx, { userId, name, email, imageUrl }) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (existingUser) {
            await ctx.db.patch(existingUser._id, { name, email, imageUrl })
            return existingUser._id;
        }

        return await ctx.db.insert("users", { userId, name, email, imageUrl });
    },
})


export const searchUsers = query({
    args: { searchTerm: v.string() },
    handler: async (ctx, { searchTerm }) => {
        if (!searchTerm.trim()) return [];

        const normalizedSearch = searchTerm.toLowerCase().trim();

        const allUsers = await ctx.db
            .query("users")
            .collect();

        return allUsers.filter((user) => user.name.toLowerCase().includes(normalizedSearch) ||
            user.email.toLowerCase().includes(normalizedSearch))
            .slice(0, 20);
    },
})

export const blockUser = mutation({
    args: { blockedId: v.string() },
    handler: async (ctx, { blockedId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const blockerId = identity.subject;

        const existing = await ctx.db
            .query("blocks")
            .withIndex("by_blockerId_blockedId", (q) => q.eq("blockerId", blockerId).eq("blockedId", blockedId))
            .first();

        if (existing) return existing._id;

        return await ctx.db.insert("blocks", {
            blockerId,
            blockedId,
            createdAt: Date.now(),
        });
    },
})

export const unblockUser = mutation({
    args: { blockedId: v.string() },
    handler: async (ctx, { blockedId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const blockerId = identity.subject;

        const existing = await ctx.db
            .query("blocks")
            .withIndex("by_blockerId_blockedId", (q) => q.eq("blockerId", blockerId).eq("blockedId", blockedId))
            .first();

        if (existing) {
            await ctx.db.delete(existing._id);
        }
    },
})

export const isBlocked = query({
    args: { blockedId: v.string() },
    handler: async (ctx, { blockedId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;

        const blockerId = identity.subject;

        const existing = await ctx.db
            .query("blocks")
            .withIndex("by_blockerId_blockedId", (q) => q.eq("blockerId", blockerId).eq("blockedId", blockedId))
            .first();

        return !!existing;
    },
})

export const getUsersBatch = query({
    args: { userIds: v.array(v.string()) },
    handler: async (ctx, { userIds }) => {
        if (userIds.length === 0) return {}

        const uniqueIds = [...new Set(userIds)]

        const users = await Promise.all(
            uniqueIds.map((uid) =>
                ctx.db
                    .query("users")
                    .withIndex("by_userId", (q) => q.eq("userId", uid))
                    .first()
            )
        )

        const results: Record<string, (typeof users)[0]> = {}
        for (let i = 0; i < uniqueIds.length; i++) {
            if (users[i]) {
                results[uniqueIds[i]] = users[i]
            }
        }
        return results
    },
})
