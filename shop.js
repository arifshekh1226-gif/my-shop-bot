const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Purchase Key button click karne par Plans dikhao
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('1 Day (₹299)', 'plan_1d')],
                [Markup.button.callback('7 Days (₹999)', 'plan_7d')],
                [Markup.button.callback('30 Days (₹1799)', 'plan_30d')]
            ])
        });
    });

    // 2. Plan select karne par Payment Info
    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1]; // 1d, 7d, ya 30d
        
        ctx.editMessageText(`Aapne ${plan.toUpperCase()} plan select kiya hai.\n\n` +
            `UPI ID: yourname@upi\n\n` +
            `Payment karne ke baad Screenshot yahan bhejein.`, {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')]
            ])
        });
    });
};
