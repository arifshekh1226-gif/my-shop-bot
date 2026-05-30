// shop.js
const { Markup } = require('telegraf');

module.exports = (bot) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('1 Day (₹299)', 'pay_1d')],
                [Markup.button.callback('7 Days (₹999)', 'pay_7d')],
                [Markup.button.callback('30 Days (₹1799)', 'pay_30d')]
            ])
        });
    });
};
