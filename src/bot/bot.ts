import { Telegraf } from 'telegraf'

export function createBot(token: string) {
  const bot = new Telegraf(token)

  bot.start(async (ctx) => {
    await ctx.reply('👋 rnmr bot started')
  })

  return bot
}
