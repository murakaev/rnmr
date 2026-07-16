import { Telegraf } from 'telegraf'

export function registerStartCommand(bot: Telegraf): void {
  bot.start(async (ctx) => {
    await ctx.reply(
      '👋 Hi! I check if a name is available on GitHub and other platforms.\n\nUse /check <name>'
    )
  })
}
