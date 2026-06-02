import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const startCall = mutation({
    args: {
        channelId: v.string(),
        startedBy: v.string(),
        startedByName: v.string(),
        callId: v.string(),
    },
    handler: async (ctx, { channelId, startedBy, startedByName, callId }) => {
        return await ctx.db.insert("callHistory", {
            channelId,
            startedBy,
            startedByName,
            callId,
            startedAt: Date.now(),
        })
    },
})

export const endCall = mutation({
    args: {
        historyId: v.id("callHistory"),
    },
    handler: async (ctx, { historyId }) => {
        const record = await ctx.db.get(historyId)
        if (!record) return

        const now = Date.now()
        const duration = Math.round((now - record.startedAt) / 1000)

        await ctx.db.patch(historyId, {
            endedAt: now,
            duration,
        })
    },
})
