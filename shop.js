module.exports = (bot, data, saveData) => {
    bot.action('buy_menu', (ctx) => {
        ctx.editMessageText("🛒 **Shop Menu:**", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 Buy Fluorite Key (₹100)", callback_data: 'buy_fluorite' }],
                    [{ text: "🔙 Back", callback_data: 'main_menu' }]
                ]
            }
        });
    });

    bot.action('buy_fluorite', (ctx) => {
        const uid = ctx.from.id.toString();
        if (!data.users[uid] || data.users[uid].balance < 100) return ctx.answerCbQuery("❌ Insufficient balance!");
        
        const key = data.keys.fluorite.shift();
        data.users[uid].balance -= 100;
        saveData();
        ctx.editMessageText("✅ Key: `" + key + "`", { parse_mode: 'Markdown' });
    });
};
