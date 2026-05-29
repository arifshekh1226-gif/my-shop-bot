module.exports = (bot, data, saveData) => {
    bot.command('buy', (ctx) => {
        ctx.reply("🛒 **Shop Menu**\nSelect your product below:", {
            reply_markup: {
                inline_keyboard: [
                    // Ek button (Row 1)
                    [
                        { text: "💎 Buy Fluorite Key", callback_data: 'buy_fluorite' }
                    ],
                    // Dusra button (Row 2)
                    [
                        { text: "📞 Contact Admin", url: "https://t.me/cy992" }
                    ]
                ]
            }
        });
    });

    // Button click hone par action trigger karna
    bot.action('buy_fluorite', (ctx) => {
        // Yahan tumhara logic ayega (Key dena, balance check karna etc)
        ctx.answerCbQuery("Processing..."); // Click karne par loading effect
        ctx.reply("✅ Process start ho gaya hai!");
    });
};
