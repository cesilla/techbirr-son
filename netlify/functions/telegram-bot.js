// netlify/functions/telegram-bot.js
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const update = JSON.parse(event.body);
        await bot.handleUpdate(update);
        return {
            statusCode: 200,
            body: '',
        };
    } else {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }
};
