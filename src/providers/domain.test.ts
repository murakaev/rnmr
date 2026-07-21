import { describe, expect, it, vi } from 'vitest'
import { DomainProvider } from './domain'
import type { HTTPClient } from '../services/http'

const bootstrapResponse = {
  services: [
    [['com'], ['https://rdap.verisign.com/com/v1/']],
    [['io'], ['https://rdap.nic.io/']],
  ],
}

function mockClient(): HTTPClient {
  const get = vi.fn().mockImplementation((url: string) => {
    if (url.includes('dns.json')) {
      return Promise.resolve(bootstrapResponse)
    }
    if (url.includes('.com')) {
      return Promise.resolve({}) // com "занят" — успешный ответ
    }
    return Promise.reject(new Error('HTTP Error: 404')) // остальные свободны
  })

  return { get } as unknown as HTTPClient
}

describe('DomainProvider', () => {
  it('marks taken TLDs and skips unknown ones', async () => {
    const provider = new DomainProvider(mockClient(), ['com', 'io'])

    const result = await provider.check('myname')

    expect(result.status).toBe('TAKEN')
    expect(result.matches.map((m) => m.name)).toEqual(['myname.com'])
  })

  it('return AVAILABLE if no taken TLDs', async () => {
    const provider = new DomainProvider(mockClient(), ['io', 'net'])

    const result = await provider.check('myname')

    expect(result.status).toBe('AVAILABLE')
  })
})
