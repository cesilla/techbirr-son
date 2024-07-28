const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const deepl = require('deepl-node');
const TelegramBot = require('node-telegram-bot-api');
const TonWeb = require('tonweb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const authKey = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M'; // DeepL API key
const translator = new deepl.Translator(authKey);

// Bot Token'inizi buraya ekleyin
const token = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M';
const bot = new TelegramBot(token, { polling: true });

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

// TON wallet setup
const tonweb = new TonWeb();
const { mnemonicNew, mnemonicToWalletKey, Wallets } = tonweb;

async function createWallet() {
  const mnemonic = await mnemonicNew();
  const key = await mnemonicToWalletKey(mnemonic);
  const wallet = new Wallets.all.v3R2(tonweb.provider, {
    publicKey: key.publicKey,
    wc: 0
  });

  return { mnemonic, wallet };
}

// Route to create a new TON wallet
app.get('/create-wallet', async (req, res) => {
  try {
    const { mnemonic, wallet } = await createWallet();
    res.json({ mnemonic, address: await wallet.getAddress() });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Error creating wallet' });
  }
});

// Route to fetch prayer times
app.get('/prayer-times', async (req, res) => {
  const { city, country } = req.query;
  const promises = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    promises.push(
      axios.get(`http://api.aladhan.com/v1/timingsByCity`, {
        params: { city, country, method: 2, date: formattedDate }
      })
    );
  }

  try {
    const responses = await Promise.all(promises);
    const times = responses.map(response => response.data.data.timings);
    res.json(times);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Error fetching prayer times' });
  }
});

// Route to translate text
app.post('/translate', async (req, res) => {
  const { text, target_lang } = req.body;
  try {
    const result = await translator.translateText(text, null, target_lang.toUpperCase());
    res.json({ text: result.text });
  } catch (error) {
    console.error('Error fetching translation:', error);
    res.json({ text }); // Return original text if translation fails
  }
});

// Telegram bot command to fetch prayer times
bot.onText(/\/prayer_times (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [city, country] = match[1].split(',');

  try {
    const response = await axios.get(`http://${process.env.VERCEL_URL}/prayer-times`, {
      params: { city, country }
    });
    const times = response.data;
    let message = `Prayer times for ${city}, ${country}:\n`;
    times.forEach((time, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const formattedDate = date.toISOString().split('T')[0];
      message += `${formattedDate}:\nFajr: ${time.Fajr}\nDhuhr: ${time.Dhuhr}\nAsr: ${time.Asr}\nMaghrib: ${time.Maghrib}\nIsha: ${time.Isha}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    bot.sendMessage(chatId, 'Error fetching prayer times.');
  }
});

// Telegram bot command to translate text
bot.onText(/\/translate (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [text, target_lang] = match[1].split(',');

  try {
    const response = await axios.post(`http://${process.env.VERCEL_URL}/translate`, { text, target_lang });
    const translatedText = response.data.text;
    bot.sendMessage(chatId, translatedText);
  } catch (error) {
    console.error('Error fetching translation:', error);
    bot.sendMessage(chatId, 'Error fetching translation.');
  }
});

// Telegram bot command to create a TON wallet
bot.onText(/\/createwallet/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get(`http://localhost:${PORT}/create-wallet`);
    const { mnemonic, address } = response.data;
    bot.sendMessage(chatId, `Wallet created!\nMnemonic: ${mnemonic.join(" ")}\nAddress: ${address.toString(true, true, true)}`);
  } catch (error) {
    console.error('Error creating wallet:', error);
    bot.sendMessage(chatId, 'Error creating wallet.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export Express app for Vercel
