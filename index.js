const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome to the Shop!'));

bot.command('admin', (ctx) => {
    if (ctx.from.id.toString() !== '7918372543') {
        return ctx.reply('Admin access denied!');
    }
    ctx.reply('Welcome to Admin controls', Markup.keyboard([
        ['🎁 Add Balance', '🎉 Remove Balance'],
        ['📢 SetQr', '🎯 SetUpi Id'],
        ['🔥 Setprice', '🛍 Add Key\'s'],
        ['🔙 Main menu']
    ]).resize());
});

bot.launch();
