const { Telegraf } = require('telegraf');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Database Load
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

bot.start((ctx) => ctx.reply('Welcome to the shop! /buy use karein.'));

// Buy Command
bot.command('buy', (ctx) => {
    if (data.keys.fluorite.length > 0) {
        const key = data.keys.fluorite.shift();
        saveData();
        ctx.reply(`✅ Aapki Key: ${key}`);
    } else {
        ctx.reply("❌ Stock khatam ho gaya hai!");
    }
});

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
