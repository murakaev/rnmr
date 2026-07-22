import { Telegraf } from 'telegraf'
import { escapeMarkdown } from '../markdown'

export function registerStartCommand(bot: Telegraf): void {
  bot.start(async (ctx) => {
    await ctx.reply(
      `Hey, ${escapeMarkdown(ctx.from.first_name ?? 'there')}\\! 👋\nI check if a name is available across GitHub\, npm\, PyPI\, and domains\\.\n\nTry it\: \`/check yourname\``,
      { parse_mode: 'MarkdownV2' }
    )
  })
}
