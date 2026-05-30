const { Markup } = require('telegraf');

module.exports = (bot) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('1 Day (₹299)', 'plan_1d')],
                [Markup.button.callback('7 Days (₹999)', 'plan_7d')],
                [Markup.button.callback('30 Days (₹1799)', 'plan_30d')],
                [Markup.button.callback('🔙 Back to Menu', 'main_menu')]
            ])
        });
    });

    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        ctx.session.selectedPlan = plan; // Yahan plan save ho gaya
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: yourname@upi\n` +
            `Payment karke Screenshot bhejein.`, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')]
            ])
        });
    });
};
