import { createBot } from './bot/bot'
import { Checker } from './core/checker'
import { GitHubProvider } from './providers/github'
import { HTTPClient } from './services/http'

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN is not set')
  process.exit(1)
}

const http = new HTTPClient()

const checker = new Checker([new GitHubProvider(http)])

const bot = createBot(checker, process.env.BOT_TOKEN!)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
