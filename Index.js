const { Telegraf, Markup } = require('telegraf');
const express = require('express');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const CHANNEL_ID = process.env.CHANNEL_ID;
const PROMO_WALLET = process.env.PROMO_WALLET;

// EXPRESS SERVER
const app = express();
app.get('/', (req, res) => res.send('SolPulse is alive!'));
app.listen(3000, () => console.log('✅ Express server lancé'));

bot.start((ctx) => {
  ctx.reply('Bienvenue sur SolPulse — Le cœur de Solana pulse ici !');
});

bot.command('help', (ctx) => {
  ctx.reply('/start - Bienvenue\n/help - Liste des commandes');
});

// Trending Message Example
async function postTrending() {
  const trendingMessage = `⚡️ SOL PULSE | TRENDING NOW ⚡️

🥇 $ALONE - Forever Alone (+711%)
🔥 Chart: https://dexscreener.com/solana/xxxxxxxx

🥈 $TINI - tini (-52%)
⚡️ Chart: https://dexscreener.com/solana/yyyyyyyy

🥉 $NETFLIX - Netflix Cult (-56%)
📺 Chart: https://dexscreener.com/solana/zzzzzzzz

— Only SOLANA Gems | Powered by @Solpulse_trending`;

  try {
    const msg = await bot.telegram.sendMessage(CHANNEL_ID, trendingMessage);
    await bot.telegram.pinChatMessage(CHANNEL_ID, msg.message_id, { disable_notification: true });
  } catch (e) {
    console.error('Erreur trending:', e.message);
  }
}

// Buybot Simulation
function simulateBuybot() {
  const buyMessage = `🚀 NEW BUY | $POPCAT
💰 2.31 SOL just sniped!
📈 Price: +83% | MCap: 57K | Holders: 312

Chart: https://dexscreener.com/solana/XXXXXXXX
Token: https://birdeye.so/token/XXXXXXXX
TG: https://t.me/officialpopcat`;

  bot.telegram.sendMessage(CHANNEL_ID, buyMessage, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.url('⚡ SNIPE PULSE', 'https://phantom.app/')]
    ])
  });
}

// Auto launch functions
setInterval(postTrending, 60 * 60 * 1000); // 1h
setInterval(simulateBuybot, 30 * 1000);     // 30s

bot.launch();
console.log('✅ SolPulse bot lancé');
