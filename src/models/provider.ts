import type { ProviderResult } from './result'

export interface Provider {
  name: string

  check(name: string): Promise<ProviderResult>
}
