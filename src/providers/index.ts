import type { Provider } from '../models/provider'
import { HTTPClient } from '../services/http'
import { GitHubProvider } from './github'

export function createProviders(client: HTTPClient): Provider[] {
  return [new GitHubProvider(client)]
}
