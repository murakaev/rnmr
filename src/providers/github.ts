import type { Provider } from '../models/provider'
import { buildProviderResult, type ProviderResult } from '../models/result'
import { HTTPClient } from '../services/http'

const SEARCH_URL = 'https://api.github.com/search/repositories'

interface GitHubResponse {
  items: { name: string }[]
}

export class GitHubProvider implements Provider {
  name = 'GitHub'

  constructor(
    private client: HTTPClient,
    private token?: string
  ) {}

  async check(name: string): Promise<ProviderResult> {
    const candidates = await this.search(name)
    return buildProviderResult(this.name, name, candidates)
  }

  private async search(name: string): Promise<string[]> {
    const params = new URLSearchParams({ q: `${name} in:name`, per_page: '10' })
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
    }
    if (this.token) headers.Authorization = `Bearer ${this.token}`

    const data = await this.client.get<GitHubResponse>(
      `${SEARCH_URL}?${params}`,
      headers
    )

    return data.items.map((repo) => repo.name)
  }
}
