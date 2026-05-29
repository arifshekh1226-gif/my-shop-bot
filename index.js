const { Telegraf } = require('telegraf');
const fs = require('fs');

// Bot Token load karo
const bot = new Telegraf(process.env.BOT_TOKEN);

// Database load
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

// Start Command with Inline Buttons
bot.start((ctx) => {
    ctx.reply("👋 **Welcome to Premium Shop!**\n\nChoose an option:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🛒 Buy Keys", callback_data: 'buy_menu' }],
                [{ text: "💳 Add Balance", callback_data: 'pay_menu' }],
                [{ text: "📞 Support", url: "https://t.me/cy992" }]
            ]
        }
    });
});

// Load Modules
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);
require('./payment')(bot, data, saveData);

bot.launch().then(() => console.log("🚀 System Online!"));
