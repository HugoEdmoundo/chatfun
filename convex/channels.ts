import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Id } from './_generated/dataModel'
import { paginationOptsValidator } from 'convex/server'
import { checkRateLimit, rateLimitKey } from './rateLimiter'

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
        checkRateLimit(rateLimitKey(authorId, "createPost"))

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
            reactions: [],
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
        checkRateLimit(rateLimitKey(createdBy, "createChannel"))
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
    args: { channelId: v.id("channels"), userId: v.optional(v.string()) },
    handler: async (ctx, { channelId, userId }) => {
        const channel = await ctx.db.get(channelId)
        if (!channel) return null
        if (channel.isPublic) return channel
        if (!userId) return null
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()
        return membership ? channel : null
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
        checkRateLimit(rateLimitKey(userId, "joinChannel"))
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
                subscriberCount: (channel.subscriberCount ?? 0) + 1,
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

        if (!membership) return

        if (membership.role === "admin") {
            throw new Error("Admins cannot leave the channel. Delete the channel instead.")
        }

        await ctx.db.delete(membership._id)

        const channel = await ctx.db.get(channelId)
        if (channel && channel.subscriberCount > 0) {
            await ctx.db.patch(channelId, {
                subscriberCount: channel.subscriberCount - 1,
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
        checkRateLimit(rateLimitKey(authorId, "createPost"))
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
            reactions: [],
            createdAt: Date.now(),
            isPinned: false,
        })
    },
})

export const getChannelPosts = query({
    args: { channelId: v.id("channels"), userId: v.optional(v.string()), paginationOpts: paginationOptsValidator },
    handler: async (ctx, { channelId, userId, paginationOpts }) => {
        const channel = await ctx.db.get(channelId)
        if (!channel) return { page: [], isDone: true, continueCursor: '' }
        if (!channel.isPublic && userId) {
            const membership = await ctx.db
                .query("channelMembers")
                .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
                .first()
            if (!membership) return { page: [], isDone: true, continueCursor: '' }
        }
        if (!channel.isPublic && !userId) return { page: [], isDone: true, continueCursor: '' }
        return await ctx.db
            .query("channelPosts")
            .withIndex("by_channelId_createdAt", (q) => q.eq("channelId", channelId))
            .order("desc")
            .paginate(paginationOpts)
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
        checkRateLimit(rateLimitKey(authorId, "createComment"))
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
    args: { postId: v.id("channelPosts"), channelId: v.id("channels"), userId: v.optional(v.string()) },
    handler: async (ctx, { postId, channelId, userId }) => {
        const post = await ctx.db.get(postId)
        if (!post) return []
        if (post.channelId !== channelId) return []

        const channel = await ctx.db.get(channelId)
        if (!channel) return []
        if (!channel.isPublic) {
            if (!userId) return []
            const membership = await ctx.db
                .query("channelMembers")
                .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
                .first()
            if (!membership) return []
        }

        return await ctx.db
            .query("channelComments")
            .withIndex("by_postId_createdAt", (q) => q.eq("postId", postId))
            .order("asc")
            .collect()
    },
})

export const getPostCommentCount = query({
    args: { postId: v.id("channelPosts") },
    handler: async (ctx, { postId }) => {
        const comments = await ctx.db
            .query("channelComments")
            .withIndex("by_postId", (q) => q.eq("postId", postId))
            .collect()
        return comments.length
    },
})

export const togglePostReaction = mutation({
    args: {
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
        emoji: v.string(),
    },
    handler: async (ctx, { postId, channelId, userId, emoji }) => {
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership) {
            throw new Error("Only channel members can react")
        }

        const post = await ctx.db.get(postId)
        if (!post) throw new Error("Post not found")

        const reactions = post.reactions ?? []

        const existing = reactions.find(
            (r) => r.emoji === emoji && r.userId === userId
        )

        if (existing) {
            await ctx.db.patch(postId, {
                reactions: reactions.filter(
                    (r) => !(r.emoji === emoji && r.userId === userId)
                ),
            })
        } else {
            await ctx.db.patch(postId, {
                reactions: [...reactions, { emoji, userId }],
            })
        }
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
        checkRateLimit(rateLimitKey(userId, "toggleReaction"))
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership) {
            throw new Error("Only channel members can react")
        }

        const comment = await ctx.db.get(commentId)
        if (!comment) throw new Error("Comment not found")

        const reactions = comment.reactions ?? []

        const existing = reactions.find(
            (r) => r.emoji === emoji && r.userId === userId
        )

        if (existing) {
            await ctx.db.patch(commentId, {
                reactions: reactions.filter(
                    (r) => !(r.emoji === emoji && r.userId === userId)
                ),
            })
        } else {
            await ctx.db.patch(commentId, {
                reactions: [...reactions, { emoji, userId }],
            })
        }
    },
})

export const updateComment = mutation({
    args: {
        commentId: v.id("channelComments"),
        userId: v.string(),
        content: v.string(),
    },
    handler: async (ctx, { commentId, userId, content }) => {
        checkRateLimit(rateLimitKey(userId, "updateComment"))
        const comment = await ctx.db.get(commentId)
        if (!comment) throw new Error("Comment not found")
        if (comment.authorId !== userId) {
            throw new Error("Only the comment author can edit")
        }

        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", comment.channelId).eq("userId", userId))
            .first()

        if (!membership) {
            throw new Error("Only channel members can edit comments")
        }

        await ctx.db.patch(commentId, { content, updatedAt: Date.now() })
    },
})

export const updateChannel = mutation({
    args: {
        channelId: v.id("channels"),
        userId: v.string(),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        isPublic: v.optional(v.boolean()),
    },
    handler: async (ctx, { channelId, userId, name, description, imageUrl, isPublic }) => {
        checkRateLimit(rateLimitKey(userId, "updateChannel"))
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can update the channel")
        }

        const patch: Record<string, unknown> = {}
        if (name !== undefined) patch.name = name
        if (description !== undefined) patch.description = description
        if (imageUrl !== undefined) patch.imageUrl = imageUrl
        if (isPublic !== undefined) patch.isPublic = isPublic

        await ctx.db.patch(channelId, patch)
    },
})

export const updatePost = mutation({
    args: {
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
        content: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, { postId, channelId, userId, content, imageUrl }) => {
        checkRateLimit(rateLimitKey(userId, "updatePost"))
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can update posts")
        }

        const patch: Record<string, unknown> = {}
        if (content !== undefined) patch.content = content
        if (imageUrl !== undefined) patch.imageUrl = imageUrl
        patch.updatedAt = Date.now()

        await ctx.db.patch(postId, patch)
    },
})

export const deletePostMutation = mutation({
    args: {
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        userId: v.string(),
    },
    handler: async (ctx, { postId, channelId, userId }) => {
        checkRateLimit(rateLimitKey(userId, "deletePost"))
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can delete posts")
        }

        const comments = await ctx.db
            .query("channelComments")
            .withIndex("by_postId", (q) => q.eq("postId", postId))
            .collect()

        const deleteCommentAndReplies = async (commentId: Id<"channelComments">) => {
            const replies = await ctx.db
                .query("channelComments")
                .withIndex("by_parentCommentId", (q) => q.eq("parentCommentId", commentId))
                .collect()

            for (const reply of replies) {
                await deleteCommentAndReplies(reply._id)
            }

            await ctx.db.delete(commentId)
        }

        for (const c of comments) {
            await deleteCommentAndReplies(c._id)
        }

        await ctx.db.delete(postId)
    },
})

export const deleteChannelMutation = mutation({
    args: {
        channelId: v.id("channels"),
        userId: v.string(),
    },
    handler: async (ctx, { channelId, userId }) => {
        checkRateLimit(rateLimitKey(userId, "deleteChannel"))
        const membership = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId_userId", (q) => q.eq("channelId", channelId).eq("userId", userId))
            .first()

        if (!membership || membership.role !== "admin") {
            throw new Error("Only admins can delete the channel")
        }

        const members = await ctx.db
            .query("channelMembers")
            .withIndex("by_channelId", (q) => q.eq("channelId", channelId))
            .collect()

        for (const m of members) {
            await ctx.db.delete(m._id)
        }

        const posts = await ctx.db
            .query("channelPosts")
            .withIndex("by_channelId_createdAt", (q) => q.eq("channelId", channelId))
            .collect()

        for (const post of posts) {
            const deletePostCommentsRecursive = async (commentId: Id<"channelComments">) => {
                const childReplies = await ctx.db
                    .query("channelComments")
                    .withIndex("by_parentCommentId", (q) => q.eq("parentCommentId", commentId))
                    .collect()

                for (const reply of childReplies) {
                    await deletePostCommentsRecursive(reply._id)
                }

                await ctx.db.delete(commentId)
            }

            const comments = await ctx.db
                .query("channelComments")
                .withIndex("by_postId", (q) => q.eq("postId", post._id))
                .collect()

            for (const c of comments) {
                await deletePostCommentsRecursive(c._id)
            }

            await ctx.db.delete(post._id)
        }

        await ctx.db.delete(channelId)
    },
})

export const deleteComment = mutation({
    args: {
        commentId: v.id("channelComments"),
        channelId: v.id("channels"),
        userId: v.string(),
    },
    handler: async (ctx, { commentId, channelId, userId }) => {
        checkRateLimit(rateLimitKey(userId, "deleteComment"))
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

        const deleteRepliesRecursive = async (id: Id<"channelComments">) => {
            const replies = await ctx.db
                .query("channelComments")
                .withIndex("by_parentCommentId", (q) => q.eq("parentCommentId", id))
                .collect()

            for (const reply of replies) {
                await deleteRepliesRecursive(reply._id)
            }

            await ctx.db.delete(id)
        }

        await deleteRepliesRecursive(commentId)
    },
})
