import { ProviderResult } from '../../models/result'

export function formatResults(results: ProviderResult[]): string {
  let message = ''

  message += '🔍 rnmr\n\n'

  for (const result of results) {
    message += `👀 ${result.provider}\n`

    if (result.error) {
      message += `⚠️ Error: ${result.error}\n\n`
    } else {
      switch (result.status) {
        case 'AVAILABLE':
          message += '✅ Available\n'
          break
        case 'TAKEN':
          message += '❌ Taken\n'
          break
        case 'SIMILAR':
          message += '⚠️ Similar\n'
          break
      }

      if (result.matches.length > 0) {
        message += '\nMatches:\n'

        for (const match of result.matches) {
          message += `• ${match.name}\n`
        }
      }
    }

    message += '\n'
  }

  return message.trim()
}
