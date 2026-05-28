module.exports = (bot, data, saveData) => {
    bot.command('buy', (ctx) => {
        if (data.keys.fluorite.length > 0) {
            const key = data.keys.fluorite.shift();
            saveData();
            ctx.reply(`✅ Aapki Key: ${key}`);
        } else {
            ctx.reply("❌ Stock khatam!");
        }
    });
};
