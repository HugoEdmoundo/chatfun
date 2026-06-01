import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createChannel = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        createdBy: v.string(),
        isPublic: v.boolean(),
    },
    handler: async (ctx, { name, description, createdBy, isPublic }) => {
        const channelId = await ctx.db.insert("channels", {
            name,
            description,
            createdBy,
            isPublic,
            subscriberCount: 1,
        })

        await ctx.db.insert("channelMembers", {
            channelId,
            userId: createdBy,
            role: "admin",
            joinedAt: Date.now(),
        })

        return channelId
    },
})

export const getChannels = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("channels")
            .order("desc")
            .collect()
    },
})

export const getPublicChannels = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("channels")
            .withIndex("by_isPublic", (q) => q.eq("isPublic", true))
            .collect()
    },
})

export const getChannel = query({
    args: { channelId: v.id("channels") },
    handler: async (ctx, { channelId }) => {
        return await ctx.db.get(channelId)
    },
})

export const getChannelsByUser = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const memberships = await ctx.db
            .query("channelMembers")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .collect()

        const channels = await Promise.all(
            memberships.map(async (m) => {
                const channel = await ctx.db.get(m.channelId)
                if (!channel) return null
                return { ...channel, role: m.role }
            })
        )

        return channels.filter((c): c is NonNullable<typeof c> => c !== null)
    },
})

export const joinChannel = mutation({
    args: { channelId: v.id("channels"), userId: v.string() },
    handler: async (ctx, { channelId, userId }) => {
        const existing = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (existing) return existing._id

        await ctx.db.insert("channelMembers", {
            channelId,
            userId,
            role: "subscriber",
            joinedAt: Date.now(),
        })

        const channel = await ctx.db.get(channelId)
        if (channel) {
            await ctx.db.patch(channelId, {
                subscriberCount: (channel.subscriberCount || 0) + 1,
            })
        }
    },
})

export const leaveChannel = mutation({
    args: { channelId: v.id("channels"), userId: v.string() },
    handler: async (ctx, { channelId, userId }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (membership) {
            await ctx.db.delete(membership._id)
        }

        const channel = await ctx.db.get(channelId)
        if (channel && (channel.subscriberCount || 0) > 0) {
            await ctx.db.patch(channelId, {
                subscriberCount: (channel.subscriberCount || 1) - 1,
            })
        }
    },
})

export const isChannelMember = query({
    args: { channelId: v.id("channels"), userId: v.string() },
    handler: async (ctx, { channelId, userId }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        return !!membership
    },
})

export const getUserRoleInChannel = query({
    args: { channelId: v.id("channels"), userId: v.string() },
    handler: async (ctx, { channelId, userId }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        return membership?.role ?? null
    },
})

export const createPost = mutation({
    args: {
        channelId: v.id("channels"),
        authorId: v.string(),
        content: v.string(),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, { channelId, authorId, content, imageUrl }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", authorId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can create posts")
        }

        return await ctx.db.insert("channelPosts", {
            channelId,
            authorId,
            content,
            imageUrl,
            createdAt: Date.now(),
            isPinned: false,
        })
    },
})

export const getChannelPosts = query({
    args: { channelId: v.id("channels") },
    handler: async (ctx, { channelId }) => {
        return await ctx.db
            .query("channelPosts")
            .withIndex("by_channelId_createdAt", (q) => q.eq("channelId", channelId))
            .order("desc")
            .collect()
    },
})

export const getSubscriberCount = query({
    args: { channelId: v.id("channels") },
    handler: async (ctx, { channelId }) => {
        const members = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId", (q) => q.eq("channelId", channelId))
            .collect()

        return members.length
    },
})
