const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

// Modules load karo
require('./shop')(bot);
// require('./admin')(bot); // Filhal ise hata do, pehle shop test karenge

// Bot start
bot.start((ctx) => ctx.reply("✨ Bot is ready! Click below:", {
    reply_markup: {
        inline_keyboard: [[{ text: "• Shop •", callback_data: 'buy_menu' }]]
    }
}));

bot.launch({ dropPendingUpdates: true })
    .then(() => console.log("🚀 Bot is LIVE!"));
