import 'dotenv/config'
import { Telegraf } from 'telegraf'
import { Checker } from '../core/checker'
import { registerCheckCommand } from './commands/check'
import { registerStartCommand } from './commands/start'

export function createBot(checker: Checker): Telegraf {
  const bot = new Telegraf(process.env.BOT_TOKEN!)

  registerStartCommand(bot)
  registerCheckCommand(bot, checker)

  return bot
}
