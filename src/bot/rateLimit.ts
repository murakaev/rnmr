const lastRequest = new Map<number, number>()
const COOLDOWN_MS = 5000

export function isRateLimited(userId: number): boolean {
  const now = Date.now()
  const last = lastRequest.get(userId)
  if (last && now - last < COOLDOWN_MS) return true
  lastRequest.set(userId, now)
  return false
}
