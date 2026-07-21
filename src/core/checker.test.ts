import { describe, expect, it, vi } from 'vitest'
import type { Provider } from '../models/provider'
import { Checker } from './checker'

describe('Checker', () => {
  it('isolates provider errors without failing others', async () => {
    const failing: Provider = {
      name: 'A',
      check: () => Promise.reject(new Error('boom')),
    }
    const working: Provider = {
      name: 'B',
      check: () =>
        Promise.resolve({
          provider: 'B',
          status: 'AVAILABLE' as const,
          matches: [],
        }),
    }

    const results = await new Checker([failing, working]).check('foo')

    expect(results).toHaveLength(2)
    expect(results[0].provider).toBe('A')
    expect(results[0].status).toBe('AVAILABLE')
    expect(results[0].error).toBe('boom')
    expect(results[1].status).toBe('AVAILABLE')
    expect(results[1].error).toBeUndefined()
  })

  it('runs providers in parallel', async () => {
    const calls: string[] = []

    const slow: Provider = {
      name: 'slow',
      check: async () => {
        await new Promise((resolve) => setTimeout(resolve, 20))
        calls.push('slow')
        return { provider: 'slow', status: 'AVAILABLE' as const, matches: [] }
      },
    }
    const fast: Provider = {
      name: 'fast',
      check: async () => {
        calls.push('fast')
        return { provider: 'fast', status: 'AVAILABLE' as const, matches: [] }
      },
    }

    await new Checker([slow, fast]).check('foo')

    expect(calls).toEqual(['fast', 'slow'])
  })

  it('uses cache for exactly same checks', async () => {
    const checkFn = vi.fn().mockResolvedValue({
      provider: 'Test',
      status: 'AVAILABLE' as const,
      matches: [],
    })

    const provider: Provider = {
      name: 'Test',
      check: checkFn,
    }

    const checker = new Checker([provider])

    await checker.check('foo')
    await checker.check('Foo')
    await checker.check('FOO')

    expect(checkFn.mock.calls.length).toBe(1)
  })

  it('expires cache after TTL', async () => {
    const checkFn = vi.fn().mockResolvedValue({
      provider: 'Test',
      status: 'AVAILABLE' as const,
      matches: [],
    })

    const provider: Provider = { name: 'Test', check: checkFn }

    const checker = new Checker([provider], 50)

    await checker.check('foo')
    await new Promise((resolve) => setTimeout(resolve, 60))
    await checker.check('foo')

    expect(checkFn.mock.calls.length).toBe(2)
  })
})
