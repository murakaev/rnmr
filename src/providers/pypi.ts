import { Provider } from '../models/provider'
import { buildProviderResult, ProviderResult } from '../models/result'
import { HTTPClient } from '../services/http'

export class PyPIProvider implements Provider {
  name = 'PyPI'

  constructor(private client: HTTPClient) {}

  async check(name: string): Promise<ProviderResult> {
    const exists = await this.exists(name)
    return buildProviderResult(this.name, name, exists ? [name] : [])
  }

  private async exists(name: string): Promise<boolean> {
    try {
      await this.client.get(`https://pypi.org/pypi/${name}/json`)
      return true
    } catch (e) {
      if (e instanceof Error && e.message.includes('404')) return false
      throw e
    }
  }
}
