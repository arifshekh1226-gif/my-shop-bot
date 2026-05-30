const { Telegraf, session } = require('telegraf'); // 'session' import kiya
const fs = require('fs');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Session add kar diya (Sabse upar)
bot.use(session());

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

const mainMarkup = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "• Purchase Key •", callback_data: 'buy_menu' }],
            [{ text: "• Account •", callback_data: 'account' }, { text: "• History •", callback_data: 'history' }],
            [{ text: "• Deposit Fund •", callback_data: 'pay_menu' }],
            [{ text: "• Feedback •", callback_data: 'feedback' }]
        ]
    }
};

bot.start((ctx) => ctx.reply("✨ **CY SHOP**\n\n🔒 Premium Gaming Keys\n⚡ Instant Delivery\n\n👋 Welcome!", mainMarkup));

bot.action('main_menu', (ctx) => {
    ctx.answerCbQuery();
    ctx.editMessageText("✨ **CY SHOP**\n\n🔒 Premium Gaming Keys\n⚡ Instant Delivery\n\n👋 Welcome back!", mainMarkup);
});

// Modules Import (Sirf bot pass kar raha hoon kyunki data/saveData session se handle hoga)
require('./admin')(bot);
require('./shop')(bot);
require('./payment')(bot);
require('./user')(bot);

bot.launch({ dropPendingUpdates: true }).then(() => console.log("🚀 Bot is LIVE!"));
