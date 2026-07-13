export type Status = 'AVAILABLE' | 'TAKEN' | 'SIMILAR'

export interface Match {
  name: string
  status: Status
}

export interface ProviderResult {
  provider: string
  status: Status
  matches: Match[]
  error?: string
}