import type { Provider } from '../types/provider'
import type { Match, ProviderResult, Status } from '../models/result'
import { HTTPClient } from '../services/http'

const SEARCH_URL = 'https://api.github.com/search/repositories'

interface GitHubResponse {
  items: {
    name: string
  }[]
}

export class GitHubProvider implements Provider {
  name = 'GitHub'

  constructor(private client: HTTPClient) {}

  async check(name: string): Promise<ProviderResult> {
    const params = new URLSearchParams({
      q: `${name} in:name`,
      per_page: '10',
    })

    const data = await this.client.get<GitHubResponse>(
      `${SEARCH_URL}?${params}`
    )

    const matches: Match[] = data.items.map((repo) => ({
      name: repo.name,
      status:
        repo.name.toLowerCase() === name.toLowerCase() ? 'TAKEN' : 'SIMILAR',
    }))

    const status: Status = matches.some((match) => match.status === 'TAKEN')
      ? 'TAKEN'
      : matches.length > 0
        ? 'SIMILAR'
        : 'AVAILABLE'

    return {
      provider: this.name,
      status,
      matches,
    }
  }
}
