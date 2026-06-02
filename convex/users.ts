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
            await ctx.db.patch(existingUser._id, { name, imageUrl })
            return existingUser._id;
        }

        return await ctx.db.insert("users", { userId, name, email, imageUrl });
    },
})


export const searchUsers = query({
    args: { searchTerm: v.string() },
    handler: async (ctx, { searchTerm }) => {
        if (!searchTerm.trim()) return [];

        const normalizedSearch = searchTerm.toLocaleLowerCase().trim();

        const allUsers = await ctx.db
            .query("users")
            .collect();

        return allUsers.filter((user) => user.name.toLowerCase().includes(normalizedSearch) ||
            user.email.toLowerCase().includes(normalizedSearch))
            .slice(0, 20);
    },
})

export const getUsersBatch = query({
    args: { userIds: v.array(v.string()) },
    handler: async (ctx, { userIds }) => {
        if (userIds.length === 0) return {}

        const users = await Promise.all(
            userIds.map((uid) =>
                ctx.db
                    .query("users")
                    .withIndex("by_userId", (q) => q.eq("userId", uid))
                    .first()
            )
        )

        const result: Record<string, typeof users[0]> = {}
        for (let i = 0; i < userIds.length; i++) {
            if (users[i]) {
                result[userIds[i]] = users[i]
            }
        }
        return result
    },
})
