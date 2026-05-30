const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

// Modules
require('./shop')(bot);
require('./admin')(bot);

bot.start((ctx) => ctx.reply("✨ **CY SHOP**\n\n🔒 Premium Gaming Keys\n⚡ Instant Delivery\n\n👋 Welcome!", {
    reply_markup: {
        inline_keyboard: [[{ text: "• Purchase Key •", callback_data: 'buy_menu' }]]
    }
}));

bot.launch({ dropPendingUpdates: true }).then(() => console.log("🚀 Bot is LIVE!"));
