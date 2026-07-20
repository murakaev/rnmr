import type { Provider } from '../models/provider'
import { buildProviderResult, type ProviderResult } from '../models/result'
import { HTTPClient } from '../services/http'

const SEARCH_URL = 'https://registry.npmjs.org/-/v1/search'

interface NpmResponse {
  objects: { package: { name: string } }[]
}

export class NpmProvider implements Provider {
  name = 'npm'

  constructor(private client: HTTPClient) {}

  async check(name: string): Promise<ProviderResult> {
    const candidates = await this.search(name)
    return buildProviderResult(this.name, name, candidates)
  }

  private async search(name: string): Promise<string[]> {
    const params = new URLSearchParams({ text: name, size: '10' })
    const data = await this.client.get<NpmResponse>(`${SEARCH_URL}?${params}`)

    return data.objects.map((o) => o.package.name)
  }
}
