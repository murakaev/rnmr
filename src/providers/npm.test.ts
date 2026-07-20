import { describe, expect, it, vi } from 'vitest'
import type { HTTPClient } from '../services/http'
import { NpmProvider } from './npm'

function mockClient(response: unknown): HTTPClient {
  return { get: vi.fn().mockResolvedValue(response) } as unknown as HTTPClient
}

describe('NpmProvider', () => {
  it('maps search results to matches', async () => {
    const client = mockClient({ objects: [{ package: { name: 'foo' } }] })
    const provider = new NpmProvider(client)

    const result = await provider.check('foo')

    expect(result.provider).toBe('npm')
    expect(result.status).toBe('TAKEN')
  })

  it('returns AVAILABLE when no items found', async () => {
    const client = mockClient({ objects: [] })
    const provider = new NpmProvider(client)

    const result = await provider.check('foo')

    expect(result.status).toBe('AVAILABLE')
  })
})
