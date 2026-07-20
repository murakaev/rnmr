import { HTTPClient } from '../services/http'
import { Provider } from './provider'
import { buildProviderResult, ProviderResult } from './result'

export class PyPiProvider implements Provider {
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
