import { Telegraf } from 'telegraf'
import { Checker } from '../../core/checker'
import { formatResults } from '../formatters/formatter'

export function registerCheckCommand(bot: Telegraf, checker: Checker): void {
  bot.command('check', async (ctx) => {
    const name = ctx.message.text.split(' ')[1]

    if (!name) {
      ctx.reply('Usage: /check <name>')
    }

    const result = await checker.check(name)

    await ctx.reply(formatResults(result))
  })
}
