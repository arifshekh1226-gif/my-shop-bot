const { Telegraf } = require('telegraf');
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

bot.start((ctx) => {
    ctx.reply("👋 Welcome to Premium Shop!", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🛒 Buy Keys", callback_data: 'buy_menu' }],
                [{ text: "💳 Add Balance", callback_data: 'pay_menu' }],
                [{ text: "📞 Contact Admin", url: "https://t.me/cy992" }]
            ]
        }
    });
});

// Load modules (Bot, Data, Save function)
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);
require('./payment')(bot, data, saveData);

bot.launch().then(() => console.log("🚀 Bot is running!"));
