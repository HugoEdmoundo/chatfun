import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    })
        .index("by_userId", ["userId"])
        .index("by_email", ["email"]),

    channels: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        createdBy: v.string(),
        isPublic: v.boolean(),
        streamChannelId: v.optional(v.string()),
        subscriberCount: v.number(),
    })
        .index("by_createdBy", ["createdBy"])
        .index("by_isPublic", ["isPublic"]),

    channelMembers: defineTable({
        channelId: v.id("channels"),
        userId: v.string(),
        role: v.union(v.literal("admin"), v.literal("subscriber")),
        joinedAt: v.number(),
    })
        .index("by_channelId", ["channelId"])
        .index("by_userId", ["userId"])
        .index("by_channelId_userId", ["channelId", "userId"]),

    channelPosts: defineTable({
        channelId: v.id("channels"),
        authorId: v.string(),
        content: v.string(),
        imageUrl: v.optional(v.string()),
        createdAt: v.number(),
        updatedAt: v.optional(v.number()),
        isPinned: v.boolean(),
    })
        .index("by_channelId", ["channelId"])
        .index("by_channelId_createdAt", ["channelId", "createdAt"])
        .index("by_authorId", ["authorId"]),

    channelComments: defineTable({
        postId: v.id("channelPosts"),
        channelId: v.id("channels"),
        authorId: v.string(),
        content: v.string(),
        parentCommentId: v.optional(v.id("channelComments")),
        reactions: v.array(v.object({
            emoji: v.string(),
            userId: v.string(),
        })),
        createdAt: v.number(),
        updatedAt: v.optional(v.number()),
    })
        .index("by_postId", ["postId"])
        .index("by_postId_createdAt", ["postId", "createdAt"])
        .index("by_authorId", ["authorId"])
        .index("by_parentCommentId", ["parentCommentId"]),
});
