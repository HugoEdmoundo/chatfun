const actionLog = new Map<string, number>()
const MIN_INTERVAL_MS = 1000

export function checkRateLimit(key: string): void {
    const now = Date.now()
    const last = actionLog.get(key)
    if (last && now - last < MIN_INTERVAL_MS) {
        throw new Error("Please wait a moment before performing this action again.")
    }
    actionLog.set(key, now)
}

export function rateLimitKey(userId: string, action: string): string {
    return `${userId}:${action}`
}
