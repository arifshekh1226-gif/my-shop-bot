module.exports = (bot, data, saveData) => {
    const plans = {
        'buy_1d': { name: "1 Day", price: 299, days: 1, keyType: "1d" },
        'buy_7d': { name: "7 Days", price: 999, days: 7, keyType: "7d" },
        'buy_30d': { name: "30 Days", price: 1799, days: 30, keyType: "30d" }
    };

    bot.action(/buy_(.+)/, (ctx) => {
        const planKey = ctx.match[0]; // e.g., buy_1d
        const plan = plans[planKey];
        if (!plan) return;

        const uid = ctx.from.id.toString();
        
        // 1. Balance Check
        if ((data.users[uid]?.balance || 0) < plan.price) {
            return ctx.answerCbQuery("❌ Balance kam hai!");
        }

        // 2. Key Stock Check (Specific Key Type)
        if (!data.keys[plan.keyType] || data.keys[plan.keyType].length === 0) {
            return ctx.answerCbQuery("❌ Is plan ki keys abhi khatam hain!");
        }

        // 3. Key nikalo aur balance kaato
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
