const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome to our Mini App!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Mini App',
            web_app: { url: 'https://66a76c9cce722300096dfff1--lustrous-mousse-6b5222.netlify.app/' }
          }
        ]
      ]
    }
  });
});

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
