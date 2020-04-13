
/*
const Telegraf = require('telegraf')
require('dotenv').config();
const _ = require('underscore');

const bot = new Telegraf(process.env.TOKEN)
 var responses = [
    {
        q: "",
        
    }
]
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.on('message', (ctx) => {
    console.log(ctx.message)
    
    ctx.reply("se prendio la respuesta")
})


 */
const Telegraf = require('telegraf');
require('dotenv').config();
// Create a bot using TOKEN provided as environment variable
const bot = new Telegraf(process.env.TOKEN);

// Import replies file
const replies = require('./controllers/replies')

// Extract reply_to_message.message_id field from Telegraf ctx
// If not present, return null
const getReplyToMessageId = ctx => (
    ctx.message.reply_to_message ? ctx.message.reply_to_message.message_id : null
)

// This method will send the reply, based on the answer type
// (text / gif / sticker). See replies.js for objects structure.
const sendReply = (ctx, reply) => {
    // reply method will be the Telegraf method for sending the reply
    let replyMethod = {
        text: ctx.reply,
        gif: ctx.replyWithDocument,
        sticker: ctx.replyWithSticker
    }[reply.type]

    replyMethod(reply.value, {
        // this will make the bot reply to the original message instead of just sending it
        reply_to_message_id: getReplyToMessageId(ctx)
    })
}

// /list command - will send all the triggers defined in replies.js.
bot.command('list', ctx => {
    ctx.reply(
        'Available triggers:\n\n' +
        Object.keys(replies).join('\n')
    )
})

// Listen on every text message, if message.text is one of the trigger,
// send the reply
bot.on('text', ctx => {
    let cmd = ctx.message.text.toLowerCase()
    if (cmd in replies)
        sendReply(ctx, replies[cmd])
})

bot.startPolling();