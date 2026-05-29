module.exports = (bot, data, saveData) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 1 Day (₹299)", callback_data: 'buy_1d' }],
                    [{ text: "💎 7 Days (₹999)", callback_data: 'buy_7d' }],
                    [{ text: "💎 30 Days (₹1799)", callback_data: 'buy_30d' }],
                    [{ text: "🔙 Back", callback_data: 'main_menu' }]
                ]
            }
        });
    });

    // Plan logic
    const plans = {
        'buy_1d': { name: "1 Day", price: 299 },
        'buy_7d': { name: "7 Days", price: 999 },
        'buy_30d': { name: "30 Days", price: 1799 }
    };

    bot.action(/buy_(.+)/, (ctx) => {
        const planKey = ctx.match[0]; // e.g., buy_1d
        const plan = plans[planKey];
        
        if (!plan) return;

        const uid = ctx.from.id.toString();
        const userBal = data.users[uid] ? data.users[uid].balance : 0;

        if (userBal < plan.price) {
            return ctx.answerCbQuery("❌ Insufficient balance!");
        }

        // Deduct money
        data.users[uid].balance -= plan.price;
        saveData();

        ctx.answerCbQuery("✅ Purchased!");
        ctx.editMessageText(`✅ **Purchase Successful!**\n\nPlan: ${plan.name}\nPrice: ₹${plan.price}\n\nBalance remaining: ₹${data.users[uid].balance}`, {
            reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: 'main_menu' }]] }
        });
    });
};
