const { Telegraf } = require('telegraf');
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const saveData = () => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

// Modules load karo
require('./admin')(bot, data, saveData);
require('./shop')(bot, data, saveData);

bot.start((ctx) => ctx.reply('Welcome! /buy ya /addkey use karein.'));
bot.launch();
