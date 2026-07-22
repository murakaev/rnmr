import { describe, expect, it } from 'vitest'
import type { ProviderResult } from '../models/result'
import { formatResults } from './format'

describe('formatResults', () => {
  it('includes the searched name, bold and escaped for MarkdownV2', () => {
    const message = formatResults('my.name', [])

    expect(message).toContain('🔍 *my\\.name*')
  })

  it('shows correct emoji and lowercase status per provider', () => {
    const results: ProviderResult[] = [
      { provider: 'GitHub', status: 'AVAILABLE', matches: [] },
      { provider: 'npm', status: 'SIMILAR', matches: [] },
      { provider: 'PyPI', status: 'TAKEN', matches: [] },
    ]

    const message = formatResults('foo', results)

    expect(message).toContain('✅ *GitHub* — available')
    expect(message).toContain('⚠️ *npm* — similar')
    expect(message).toContain('❌ *PyPI* — taken')
  })

  it('omits the match preview line when there are no matches', () => {
    const results: ProviderResult[] = [
      { provider: 'GitHub', status: 'AVAILABLE', matches: [] },
    ]

    const message = formatResults('foo', results)

    expect(message).not.toContain('└')
  })

  it('shows a match preview line with escaped names when matches exist', () => {
    const results: ProviderResult[] = [
      {
        provider: 'Domains',
        status: 'TAKEN',
        matches: [{ name: 'foo.com', status: 'TAKEN' }],
      },
    ]

    const message = formatResults('foo', results)

    expect(message).toContain('└ foo\\.com')
  })

  it('truncates match previews to 3 and shows the remaining count', () => {
    const results: ProviderResult[] = [
      {
        provider: 'npm',
        status: 'SIMILAR',
        matches: [
          { name: 'foo-cli', status: 'SIMILAR' },
          { name: 'foo-utils', status: 'SIMILAR' },
          { name: 'foo-sdk', status: 'SIMILAR' },
          { name: 'foo-core', status: 'SIMILAR' },
          { name: 'foo-web', status: 'SIMILAR' },
        ],
      },
    ]

    const message = formatResults('foo', results)

    expect(message).toContain('└ foo\\-cli, foo\\-utils, foo\\-sdk and 2 more')
  })

  it('does not show "and N more" when matches fit within the preview limit', () => {
    const results: ProviderResult[] = [
      {
        provider: 'npm',
        status: 'SIMILAR',
        matches: [
          { name: 'foo-cli', status: 'SIMILAR' },
          { name: 'foo-utils', status: 'SIMILAR' },
        ],
      },
    ]

    const message = formatResults('foo', results)

    expect(message).toContain('└ foo\\-cli, foo\\-utils')
    expect(message).not.toContain('more')
  })

  it('shows an error line instead of status when a provider errored, with escaped message', () => {
    const results: ProviderResult[] = [
      {
        provider: 'GitHub',
        status: 'AVAILABLE',
        matches: [],
        error: 'Request failed (timeout).',
      },
    ]

    const message = formatResults('foo', results)

    expect(message).toContain(
      '⛔️*GitHub* — Error: Request failed \\(timeout\\)\\.'
    )
    expect(message).not.toContain('✅')
  })

  it('renders multiple providers together in order', () => {
    const results: ProviderResult[] = [
      { provider: 'GitHub', status: 'AVAILABLE', matches: [] },
      {
        provider: 'PyPI',
        status: 'TAKEN',
        matches: [{ name: 'foo', status: 'TAKEN' }],
      },
    ]

    const message = formatResults('foo', results)
    const githubIndex = message.indexOf('GitHub')
    const pypiIndex = message.indexOf('PyPI')

    expect(githubIndex).toBeGreaterThan(-1)
    expect(pypiIndex).toBeGreaterThan(githubIndex)
  })
})
