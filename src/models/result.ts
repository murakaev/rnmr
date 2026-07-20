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

export function buildProviderResult(
  provider: string,
  searchedName: string,
  candidateNames: string[]
): ProviderResult {
  const matches = Array.from(
    new Map(
      candidateNames.map((name) => [
        name.toLowerCase(),
        {
          name,
          status:
            name.toLowerCase() === searchedName.toLowerCase()
              ? 'TAKEN'
              : 'SIMILAR',
        } as Match,
      ])
    ).values()
  )

  const status: Status = matches.some((m) => m.status === 'TAKEN')
    ? 'TAKEN'
    : matches.length > 0
      ? 'SIMILAR'
      : 'AVAILABLE'

  return { provider, status, matches }
}
