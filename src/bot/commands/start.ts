import { Telegraf } from 'telegraf'

export function registerStartCommand(bot: Telegraf): void {
  bot.start(async (ctx) => {
    await ctx.reply('Bot started')
  })
}
