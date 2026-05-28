const fs = require('fs');
const ADMIN_ID = '7918372543';

module.exports = (bot, data, saveData) => {
    bot.command('addkey', (ctx) => {
        if (ctx.from.id.toString() !== ADMIN_ID) return ctx.reply("❌ Tum admin nahi ho!");
        
        const args = ctx.message.text.split(' ');
        if (!args[1]) return ctx.reply("Usage: /addkey [key]");
        
        data.keys.fluorite.push(args[1]);
        saveData();
        ctx.reply(`✅ Key '${args[1]}' add ho gayi!`);
    });
};
