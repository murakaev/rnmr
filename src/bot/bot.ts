import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { Checker } from '../core/checker'
import { registerCheckCommand } from './commands/check'
import { registerStartCommand } from './commands/start'

export function createBot(checker: Checker, token: string): Telegraf {
  const bot = new Telegraf(token)

  registerStartCommand(bot)
  registerCheckCommand(bot, checker)

  return bot
}
