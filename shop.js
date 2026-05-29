module.exports = (bot, data, saveData) => {
    const plans = {
        'buy_1d': { name: "1 Day", price: 299, days: 1, keyType: "1d" },
        'buy_7d': { name: "7 Days", price: 999, days: 7, keyType: "7d" },
        'buy_30d': { name: "30 Days", price: 1799, days: 30, keyType: "30d" }
    };

    // Purchase Menu
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

    // Plan Purchase Logic
    bot.action(/buy_(.+)/, (ctx) => {
        const planKey = ctx.match[0]; // e.g., buy_1d
        const plan = plans[planKey];
        if (!plan) return;

        const uid = ctx.from.id.toString();
        if (!data.users[uid]) data.users[uid] = { balance: 0, expiry: 0 };
        
        // 1. Balance Check
        if (data.users[uid].balance < plan.price) {
            return ctx.answerCbQuery("❌ Balance kam hai!");
        }

        // 2. Stock Check
        if (!data.keys[plan.keyType] || data.keys[plan.keyType].length === 0) {
            return ctx.answerCbQuery("❌ Stock khatam hai!");
        }

        // 3. Purchase Process
        const key = data.keys[plan.keyType].shift();
        data.users[uid].balance -= plan.price;
        data.users[uid].expiry = Date.now() + (plan.days * 24 * 60 * 60 * 1000);
        saveData();

        ctx.editMessageText(`✅ **Purchase Successful!**\n\nPlan: ${plan.name}\nKey: \`${key}\`\nExpiry: ${new Date(data.users[uid].expiry).toLocaleDateString()}`, {
            parse_mode: 'Markdown',
            reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: 'main_menu' }]] }
        });
    });
};
