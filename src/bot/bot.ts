import 'dotenv/config'
import { Checker } from '../core/checker'
import { Telegraf } from 'telegraf'
import { registerStartCommand } from './commands/start'
import { registerCheckCommand } from './commands/check'

export function createBot(checker: Checker): Telegraf {
  const bot = new Telegraf(process.env.BOT_TOKEN!)

  registerStartCommand(bot)
  registerCheckCommand(bot, checker)

  return bot
}
