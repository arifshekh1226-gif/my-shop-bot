module.exports = (bot, data, saveData) => {
    
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 1 Day (₹299)", callback_data: 'buy_fluorite_1d' }],
                    [{ text: "💎 7 Days (₹999)", callback_data: 'buy_fluorite_7d' }],
                    [{ text: "💎 30 Days (₹1799)", callback_data: 'buy_fluorite_30d' }],
                    [{ text: "🔙 Back", callback_data: 'main_menu' }]
                ]
            }
        });
    });

    // Buying Logic for different plans
    const buyKey = (ctx, plan, price) => {
        const uid = ctx.from.id.toString();
        if (!data.users[uid] || data.users[uid].balance < price) {
            return ctx.answerCbQuery("❌ Insufficient balance!");
        }

        if (!data.keys.fluorite || data.keys.fluorite.length === 0) {
            return ctx.answerCbQuery("❌ Out of stock!");
        }

        const key = data.keys.fluorite.shift();
        data.users[uid].balance -= price;
        saveData();
        ctx.answerCbQuery("✅ Purchase Successful!");
        ctx.editMessageText(`✅ **Purchase Successful!**\n\nPlan: ${plan}\nKey: \`${key}\`\n\nRemaining: ₹${data.users[uid].balance}`, { parse_mode: 'Markdown' });
    };

    bot.action('buy_fluorite_1d', (ctx) => buyKey(ctx, "1 Day", 299));
    bot.action('buy_fluorite_7d', (ctx) => buyKey(ctx, "7 Days", 999));
    bot.action('buy_fluorite_30d', (ctx) => buyKey(ctx, "30 Days", 1799));
};
