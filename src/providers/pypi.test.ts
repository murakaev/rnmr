import { describe, expect, it, vi } from 'vitest'
import type { HTTPClient } from '../services/http'
import { PyPIProvider } from './pypi'

function mockClient(response: unknown): HTTPClient {
  return { get: vi.fn().mockResolvedValue(response) } as unknown as HTTPClient
}

describe('PyPIProvider', () => {
  it('returns AVAILABLE when package does not exist (404)', async () => {
    const client = {
      get: vi.fn().mockRejectedValue(new Error('HTTP Error: 404')),
    } as unknown as HTTPClient

    const result = await new PyPIProvider(client).check('foo')

    expect(result.status).toBe('AVAILABLE')
  })

  it('rethrows non-404 errors', async () => {
    const client = {
      get: vi.fn().mockRejectedValue(new Error('HTTP Error: 500')),
    } as unknown as HTTPClient

    await expect(new PyPIProvider(client).check('foo')).rejects.toThrow('500')
  })
})
