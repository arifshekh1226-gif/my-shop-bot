const { Markup } = require('telegraf');

module.exports = (bot) => {
    // Menu: Plan selection
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('1 Day (₹299)', 'plan_1d')],
                [Markup.button.callback('7 Days (₹999)', 'plan_7d')],
                [Markup.button.callback('30 Days (₹1799)', 'plan_30d')]
            ])
        });
    });

    // Payment step: Plan save hoga aur UPI dikhega
    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1]; // 1d, 7d, 30d
        ctx.session.selectedPlan = plan; // Yahan plan save ho gaya
        
        ctx.editMessageText(`Aapne **${plan.toUpperCase()}** select kiya hai.\n\n` +
            `UPI ID: yourname@upi\n\n` +
            `Payment karne ke baad Screenshot yahan bhejein.`, {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back', 'buy_menu')]
            ])
        });
    });
};
