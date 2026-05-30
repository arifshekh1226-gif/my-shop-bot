const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Purchase Menu (Button click trigger)
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

    // 2. Plan Selection Action (Regex use karo)
    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1]; // yahan 1d, 7d, ya 30d aayega
        
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
