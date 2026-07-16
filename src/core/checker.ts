import type { Provider } from '../models/provider'
import { ProviderResult } from '../models/result'

export class Checker {
  constructor(private providers: Provider[]) {}

  async check(name: string): Promise<ProviderResult[]> {
    return Promise.all(
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
  }
}
