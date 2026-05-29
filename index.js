const { Telegraf } = require('telegraf');
const fs = require('fs');

// Bot initialization
const bot = new Telegraf(process.env.BOT_TOKEN);

// Data loading
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

// Start Command with Pro UI
bot.start((ctx) => {
    ctx.reply(`✨ **GAMING KEY SHOP**\n\n🔒 Premium Gaming Keys Marketplace\n⚡ Instant Delivery.\n💎 Trusted Automated Key Distribution\n\n👋 Welcome ${ctx.from.first_name}!`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "• Purchase Key •", callback_data: 'buy_menu' }],
                [{ text: "• Account •", callback_data: 'account' }, { text: "• History •", callback_data: 'history' }],
                [{ text: "• Deposit Fund •", callback_data: 'pay_menu' }],
                [{ text: "• Feedback •", callback_data: 'feedback' }]
            ]
        }
    });
});

// Global Main Menu (Har jagah se wapas aane ke liye)
bot.action('main_menu', (ctx) => {
    ctx.answerCbQuery();
    ctx.editMessageText(`✨ **GAMING KEY SHOP**\n\n🔒 Premium Gaming Keys Marketplace\n⚡ Instant Delivery.\n💎 Trusted Automated Key Distribution\n\n👋 Welcome back!`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "• Purchase Key •", callback_data: 'buy_menu' }],
                [{ text: "• Account •", callback_data: 'account' }, { text: "• History •", callback_data: 'history' }],
                [{ text: "• Deposit Fund •", callback_data: 'pay_menu' }],
                [{ text: "• Feedback •", callback_data: 'feedback' }]
            ]
        }
    });
});

// Load Modules
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);
require('./payment')(bot, data, saveData);
require('./user')(bot, data, saveData);

// Force Launch - Yeh conflict fix karega
bot.launch({ dropPendingUpdates: true })
    .then(() => console.log("🚀 Bot is live!"))
    .catch((err) => console.error("❌ Launch Error:", err));
