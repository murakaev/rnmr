import { HTTPClient } from './services/http'
import { GitHubProvider } from './providers/github'
import { Checker } from './core/checker'
import { createBot } from './bot/bot'

const http = new HTTPClient()

const checker = new Checker([new GitHubProvider(http)])

const bot = createBot(checker)

bot.launch()
