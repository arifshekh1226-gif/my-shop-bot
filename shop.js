// shop.js
module.exports = (bot) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("Select your plan:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "1 Day (₹299)", callback_data: 'buy_1d' }],
                    [{ text: "7 Days (₹999)", callback_data: 'buy_7d' }]
                ]
            }
        });
    });
};
