import "dotenv/config"

import { createBot } from "./bot/bot"


const token = process.env.BOT_TOKEN!


const bot = createBot(token)


bot.launch()

console.log("Bot started")