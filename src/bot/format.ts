import { Match, ProviderResult, Status } from '../models/result'

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}

function statusEmoji(status: Status): string {
  switch (status) {
    case 'AVAILABLE':
      return '✅'
    case 'SIMILAR':
      return '⚠️'
    case 'TAKEN':
      return '❌'
    default:
      console.log(`Unknown status: ${status}`)
      return '📦'
  }
}

function formatMatches(matches: Match[]): string {
  const names = matches.map((m) => escapeMarkdown(m.name))
  const preview = names.slice(0, 3)
  const remaining = names.length - preview.length

  return remaining > 0
    ? preview.join(', ') + ` and ${remaining} more`
    : preview.join(', ')
}

export function formatResults(name: string, results: ProviderResult[]): string {
  let message = ''

  message += `🔍 *${escapeMarkdown(name)}*\n\n`

  for (const result of results) {
    if (result.error) {
      message += `⛔️*${result.provider}* — Error: ${escapeMarkdown(result.error)}\n`
    } else {
      message += `${statusEmoji(result.status)} *${result.provider}* — ${result.status.toLowerCase()}\n`

      if (result.matches.length > 0) {
        message += `└ ${formatMatches(result.matches)}\n`
      }
    }
  }

  return message.trim()
}
