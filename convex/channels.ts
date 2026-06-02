import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
})

export const createPostWithImage = mutation({
    args: {
        channelId: v.id("channels"),
        authorId: v.string(),
        content: v.string(),
        storageId: v.string(),
    },
    handler: async (ctx, { channelId, authorId, content, storageId }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", authorId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can create posts")
        }

        const imageUrl = await ctx.storage.getUrl(storageId)

        return await ctx.db.insert("channelPosts", {
            channelId,
            authorId,
            content,
            imageUrl: imageUrl ?? undefined,
            createdAt: Date.now(),
            isPinned: false,
        })
    },
})

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

export const createComment = mutation({
    args: {
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        authorId: v.string(),
        content: v.string(),
        parentCommentId: v.optional(v.id("channelComments")),
    },
    handler: async (ctx, { postId, channelId, authorId, content, parentCommentId }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", authorId))
            .first()

        if (!membership) {
            throw new Error("Only channel members can comment")
        }

        return await ctx.db.insert("channelComments", {
            postId,
            channelId,
            authorId,
            content,
            parentCommentId,
            reactions: [],
            createdAt: Date.now(),
        })
    },
})

export const getPostComments = query({
    args: { postId: v.id("channelPosts") },
    handler: async (ctx, { postId }) => {
        return await ctx.db
            .query("channelComments")
            .withIndex("by_postId_createdAt", (q) => q.eq("postId", postId))
            .order("asc")
            .collect()
    },
})

export const toggleReaction = mutation({
    args: {
        commentId: v.id("channelComments"),
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
        emoji: v.string(),
    },
    handler: async (ctx, { commentId, postId, channelId, userId, emoji }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership) {
            throw new Error("Only channel members can react")
        }

        const comment = await ctx.db.get(commentId)
        if (!comment) throw new Error("Comment not found")

        const existing = comment.reactions.find(
            (r) => r.emoji === emoji && r.userId === userId
        )

        if (existing) {
            await ctx.db.patch(commentId, {
                reactions: comment.reactions.filter(
                    (r) => !(r.emoji === emoji && r.userId === userId)
                ),
            })
        } else {
            await ctx.db.patch(commentId, {
                reactions: [...comment.reactions, { emoji, userId }],
            })
        }
    },
})

export const updateComment = mutation({
    args: {
        commentId: v.id("channelComments"),
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
        content: v.string(),
    },
    handler: async (ctx, { commentId, postId, channelId, userId, content }) => {
        const comment = await ctx.db.get(commentId)
        if (!comment) throw new Error("Comment not found")
        if (comment.authorId !== userId) {
            throw new Error("Only the comment author can edit")
        }

        await ctx.db.patch(commentId, { content, updatedAt: Date.now() })
    },
})

export const deleteComment = mutation({
    args: {
        commentId: v.id("channelComments"),
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
    },
    handler: async (ctx, { commentId, postId, channelId, userId }) => {
        const comment = await ctx.db.get(commentId)
        if (!comment) throw new Error("Comment not found")

        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        const isAdmin = membership?.role === "admin"
        const isOwner = comment.authorId === userId

        if (!isAdmin && !isOwner) {
            throw new Error("You are not allowed to delete this comment")
        }

        const replies = await ctx.db
            .query("channelComments")
            .withIndex("by_parentCommentId", (q) => q.eq("parentCommentId", commentId))
            .collect()

        for (const reply of replies) {
            await ctx.db.delete(reply._id)
        }

        await ctx.db.delete(commentId)
    },
})
