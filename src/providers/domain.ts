import { Provider } from '../models/provider'
import { buildProviderResult, ProviderResult } from '../models/result'
import { HTTPClient } from '../services/http'

const BOOTSTRAP_URL = 'https://data.iana.org/rdap/dns.json'

interface IanaBootstrap {
  services: [string[], string[]][]
}

export class DomainProvider implements Provider {
  name = 'Domains'

  private tldToServer: Record<string, string> = {}
  private bootstrapLoaded = false

  constructor(
    private client: HTTPClient,
    private tlds: string[] = ['com', 'net', 'io', 'dev']
  ) {}

  async check(name: string): Promise<ProviderResult> {
    await this.ensureBootstrap()
    const takenDomains = await this.resolveDomains(name)
    return buildProviderResult(this.name, name, takenDomains)
  }

  private async ensureBootstrap(): Promise<void> {
    if (this.bootstrapLoaded) return

    const bootstrap = await this.loadBootstrap()

    bootstrap.services.forEach(([tlds, servers]) => {
      tlds.forEach((tld) => {
        this.tldToServer[tld] = servers[0]
      })
    })

    this.bootstrapLoaded = true
  }

  private async loadBootstrap(): Promise<IanaBootstrap> {
    return await this.client.get<IanaBootstrap>(BOOTSTRAP_URL)
  }

  private async resolveDomains(name: string): Promise<string[]> {
    const checks = await Promise.all(
      this.tlds.map(async (tld) => {
        const server = this.tldToServer[tld]
        if (!server) return null // IANA не знает такой TLD — пропускаем

        const domain = `${name}.${tld}`
        const taken = await this.exists(domain, server)
        return taken ? domain : null
      })
    )

    return checks.filter((d): d is string => d !== null)
  }

  private async exists(domain: string, server: string): Promise<boolean> {
    try {
      await this.client.get(`${server}domain/${domain}`)
      return true
    } catch (e) {
      if (e instanceof Error && e.message.includes('404')) return false
      throw e
    }
  }
}
