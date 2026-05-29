module.exports = (bot, data, saveData) => {
    bot.action('pay_menu', (ctx) => {
        ctx.editMessageText("💳 UPI: `xejaj@fam`\n\nScreenshot bhejo.");
    });

    bot.action('main_menu', (ctx) => {
        ctx.editMessageText("👋 Main Menu:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🛒 Buy Keys", callback_data: 'buy_menu' }],
                    [{ text: "💳 Add Balance", callback_data: 'pay_menu' }]
                ]
            }
        });
    });
};
