const { Telegraf } = require('telegraf');
const fs = require('fs');

// Bot Token Railway ke Variable se le raha hai
const bot = new Telegraf(process.env.BOT_TOKEN);

// Database Load aur Save ka function
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Modules Import kar rahe hain
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);
require('./payment')(bot);

// Welcome message
bot.start((ctx) => {
    ctx.reply('Welcome to the Shop!\n\nCommands:\n/buy - Key khareedne ke liye\n/pay - Payment details\n/addkey - Admin only');
});

// Bot Start
bot.launch().then(() => console.log("🚀 Bot Running!"));

// Error handling ke liye
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
