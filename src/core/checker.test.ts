import { describe, expect, it } from 'vitest'
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
})
