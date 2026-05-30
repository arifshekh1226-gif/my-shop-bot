const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Main Plan Selection Menu
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('1 Day (₹299)', 'buy_1d')],
                [Markup.button.callback('7 Days (₹999)', 'buy_7d')],
                [Markup.button.callback('30 Days (₹1799)', 'buy_30d')],
                [Markup.button.callback('🔙 Back to Menu', 'main_menu')]
            ])
        });
    });

    // 2. Plan select karne par Payment Info
    bot.action(/buy_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        
        ctx.editMessageText(`Aapne ${plan.toUpperCase()} plan select kiya hai.\n\n` +
            `UPI ID: yourname@upi\n\n` +
            `Payment karne ke baad Screenshot yahan bhejein.\n` +
            `Admin verify karke key bhej dega.`, {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')]
            ])
        });
    });
};
