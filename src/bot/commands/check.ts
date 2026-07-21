import { Telegraf } from 'telegraf'
import { Checker } from '../../core/checker'
import { formatResults } from '../format'
import { isRateLimited } from '../rateLimit'

export function registerCheckCommand(bot: Telegraf, checker: Checker): void {
  bot.command('check', async (ctx) => {
    if (isRateLimited(ctx.from.id)) {
      await ctx.reply('Wait 5 seconds before another check')
      return
    }

    const name = ctx.message.text.split(' ')[1]

    if (!name) {
      await ctx.reply('Usage: /check <name>')
      return
    }

    if (!/^[a-zA-Z0-9-_.]+$/.test(name)) {
      await ctx.reply(
        'Invalid name. Only letters, numbers, -, _ and . are allowed.'
      )
      return
    }

    console.log(`user ${ctx.from.id} checked: ${name}`)

    try {
      const result = await checker.check(name)
      await ctx.reply(formatResults(result))
    } catch (error) {
      console.error('Check failed:', error)
      await ctx.reply('An error occurred while checking.')
    }
  })
}
