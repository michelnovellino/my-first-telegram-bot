const Telegraf = require('telegraf')
require('dotenv').config();
const _ = require('underscore');
const bot = new Telegraf(process.env.TOKEN)
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()