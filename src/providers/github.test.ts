import { describe, expect, it, vi } from 'vitest'
import type { HTTPClient } from '../services/http'
import { GitHubProvider } from './github'

function mockClient(response: unknown): HTTPClient {
  return { get: vi.fn().mockResolvedValue(response) } as unknown as HTTPClient
}

describe('GitHubProvider', () => {
  it('maps search results to matches', async () => {
    const client = mockClient({ items: [{ name: 'foo' }, { name: 'fool' }] })
    const provider = new GitHubProvider(client)

    const result = await provider.check('foo')

    expect(result.provider).toBe('GitHub')
    expect(result.status).toBe('TAKEN')
    expect(result.matches).toHaveLength(2)
  })

  it('returns AVAILABLE when no items found', async () => {
    const client = mockClient({ items: [] })
    const provider = new GitHubProvider(client)

    const result = await provider.check('foo')

    expect(result.status).toBe('AVAILABLE')
  })
})
