import { ProviderResult } from '../../models/result'

export function formatResults(results: ProviderResult[]): string {
  let message = ''

  for (const result of results) {
    message += `📦 ${result.provider}\n`
    message += `Status: ${result.status}\n`

    if (result.matches.length > 0) {
      message += '\nMatches:\n'

      for (const match of result.matches) {
        message += `• ${match.name}\n`
      }
    }

    message += '\n'
  }

  return message.trim()
}
