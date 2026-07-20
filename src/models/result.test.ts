import { describe, expect, it } from 'vitest'
import { buildProviderResult } from './result'

describe('buildProviderResult', () => {
  it('returns AVAILABLE when no candidates', () => {
    const result = buildProviderResult('test', 'foo', [])
    expect(result.status).toBe('AVAILABLE')
    expect(result.matches).toEqual([])
  })

  it('returns TAKEN when exact match exists', () => {
    const result = buildProviderResult('test', 'foo', ['foo'])
    expect(result.status).toBe('TAKEN')
  })

  it('returns SIMILAR when only partial matches exist', () => {
    const result = buildProviderResult('test', 'foo', ['fooer', 'fool'])
    expect(result.status).toBe('SIMILAR')
  })

  it('returns TAKEN even when similar matches are also present', () => {
    const result = buildProviderResult('test', 'foo', ['fool', 'foo'])
    expect(result.status).toBe('TAKEN')
  })

  it('dedupes candidates case insensitively', () => {
    const result = buildProviderResult('test', 'foo', ['Foo', 'foo', 'FOO'])
    expect(result.matches).toHaveLength(1)
  })

  it('is case insensitive when matching exact name', () => {
    const result = buildProviderResult('test', 'Foo', ['foo'])
    expect(result.status).toBe('TAKEN')
  })
})
