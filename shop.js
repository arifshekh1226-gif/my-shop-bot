// shop.js
const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Shop menu jahan prices dikhenge
    bot.action('open_shop', (ctx) => {
        ctx.editMessageText('🛒 Hamare Plans:\n\n1. 1-Day: ₹299\n2. 7-Days: ₹899\n3. 30-Days: ₹1799\n\nKoi ek select karein:', {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('1-Day (₹299)', 'buy_1d')],
                [Markup.button.callback('7-Days (₹899)', 'buy_7d')],
                [Markup.button.callback('30-Days (₹1799)', 'buy_30d')]
            ])
        });
    });

    // 2. Jab koi plan select kare
    bot.action(/buy_(.+)/, (ctx) => {
        const plan = ctx.match[1]; // 1d, 7d, ya 30d
        ctx.session.currentPlan = plan; // Plan save kiya
        
        ctx.editMessageText(`Aapne ${plan.toUpperCase()} select kiya hai.\n\nUPI ID: xejaj@fam\n\nPayment karke screenshot yahan bhejo.`, {
            reply_markup: Markup.inlineKeyboard([[Markup.button.callback('🔙 Back', 'open_shop')]])
        });
    });
};
