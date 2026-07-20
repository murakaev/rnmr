import 'dotenv/config'
import type { Provider } from '../models/provider'
import { HTTPClient } from '../services/http'
import { GitHubProvider } from './github'
import { NpmProvider } from './npm'
import { PyPIProvider } from './pypi'

export function createProviders(client: HTTPClient): Provider[] {
  return [
    new GitHubProvider(client, process.env.GITHUB_TOKEN),
    new NpmProvider(client),
    new PyPIProvider(client),
  ]
}
