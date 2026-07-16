import { createBot } from './bot/bot'
import { Checker } from './core/checker'
import { createProviders } from './providers'
import { HTTPClient } from './services/http'

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN is not set')
  process.exit(1)
}

const http = new HTTPClient()

const checker = new Checker(createProviders(http))

const bot = createBot(checker, process.env.BOT_TOKEN!)

bot.launch()

console.log('Bot started')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
