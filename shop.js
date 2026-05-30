const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Shop Menu: Plans aur Prices
    bot.action('open_shop', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Hamare Premium Plans:**\n\n" +
            "1️⃣ 1-Day: ₹299\n" +
            "2️⃣ 7-Days: ₹899\n" +
            "3️⃣ 30-Days: ₹1799\n\n" +
            "Plan select karein:", {
            parse_mode: 'Markdown',
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('Buy 1-Day (₹299)', 'buy_1d')],
                [Markup.button.callback('Buy 7-Days (₹899)', 'buy_7d')],
                [Markup.button.callback('Buy 30-Days (₹1799)', 'buy_30d')]
            ])
        });
    });

    // 2. Plan select karne par QR dikhana
    bot.action(/buy_(.+)/, async (ctx) => {
        const plan = ctx.match[1];
        ctx.answerCbQuery();
        
        // Yahan apne QR code ka link ya File ID daal
        await ctx.editMessageText(`Aapne ${plan.toUpperCase()} select kiya hai.\n\nUPI ID: yourname@upi\n\nPayment karne ke baad Screenshot bhejein.`, {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('✅ Payment Screenshot Bheja', 'send_ss')]
            ])
        });
    });

    // 3. Screenshot bhejne ka process
    bot.action('send_ss', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("Ab apna Payment Screenshot yahan upload karein, admin check karke key bhej dega.");
    });
};
