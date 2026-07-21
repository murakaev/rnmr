import type { Provider } from '../models/provider'
import { ProviderResult } from '../models/result'

export class Checker {
  private cache = new Map<
    string,
    { result: ProviderResult[]; expires: number }
  >()

  constructor(
    private providers: Provider[],
    private CACHE_TTL_MS: number = 10 * 60 * 1000 // 10 min
  ) {}

  async check(name: string): Promise<ProviderResult[]> {
    const key = name.toLowerCase()
    const now = Date.now()
    const cached = this.cache.get(key)

    if (cached && now < cached.expires) {
      console.log(`Cache hit: ${key}`)
      return cached.result
    }

    if (cached && now > cached.expires) {
      this.cache.delete(key)
    }

    const result: ProviderResult[] = await Promise.all(
      this.providers.map(async (provider) => {
        try {
          return await provider.check(name)
        } catch (error) {
          return {
            provider: provider.name,
            status: 'AVAILABLE' as const,
            matches: [],
            error: error instanceof Error ? error.message : 'Unknown error',
          }
        }
      })
    )

    this.cache.set(key, { result, expires: now + this.CACHE_TTL_MS })

    return result
  }
}
