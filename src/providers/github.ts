import type { Provider } from '../types/provider'
import { ProviderResult } from '../models/result'

export class GitHubProvider implements Provider {
  name = 'GitHub'

  async check(name: string): Promise<ProviderResult> {
    return {
      provider: this.name,
      status: 'AVAILABLE',
      matches: [],
    }
  }
}
