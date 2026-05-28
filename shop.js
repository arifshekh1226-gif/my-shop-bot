module.exports = (bot, data, saveData) => {
    // 1. /buy likhte hi buttons dikhaye
    bot.command('buy', (ctx) => {
        ctx.reply("🛒 **Premium Shop Menu**\nSelect your item below:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 Buy Fluorite Key", callback_data: 'buy_fluorite' }],
                    [{ text: "📞 Contact Admin", url: "https://t.me/TumharaUsername" }]
                ]
            }
        });
    });

    // 2. Button click hone par action perform kare
    bot.action('buy_fluorite', (ctx) => {
        if (data.keys.fluorite.length > 0) {
            const key = data.keys.fluorite.shift();
            saveData();
            // User ko message edit karke key dikha do
            ctx.editMessageText(`✅ **Purchase Successful!**\n\nYour Key: \`${key}\`\n\n*Copy this carefully.*`, { parse_mode: 'Markdown' });
        } else {
            ctx.answerCbQuery("❌ Out of stock! Please contact admin.");
        }
    });
};
