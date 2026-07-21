import { Telegraf } from 'telegraf'

export function registerStartCommand(bot: Telegraf): void {
  bot.start(async (ctx) => {
    await ctx.reply(
      '👋 Hey\\! I check if a name is available across GitHub\, npm\, PyPI\, and domains\\.\n\nTry it\: `/check yourname`',
      { parse_mode: 'MarkdownV2' }
    )
  })
}
