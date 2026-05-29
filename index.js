const { Telegraf } = require('telegraf');
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

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

// Load modules (Bot, Data, Save function)
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);
require('./payment')(bot, data, saveData);

// Force Launch with dropPendingUpdates to clear old messages
bot.launch({ dropPendingUpdates: true }).then(() => {
    console.log("🚀 Bot is live and polling!");
}).catch((err) => {
    console.error("❌ Launch Error:", err);
});
