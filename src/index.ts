import { createBot } from './bot/bot'
import { Checker } from './core/checker'
import { GitHubProvider } from './providers/github'
import { HTTPClient } from './services/http'

const http = new HTTPClient()

const checker = new Checker([new GitHubProvider(http)])

const bot = createBot(checker)

bot.launch()
