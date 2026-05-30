const { Markup } = require('telegraf');

module.exports = (bot) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", Markup.inlineKeyboard([
            [Markup.button.callback('1 Day (₹299)', 'plan_1d')],
            [Markup.button.callback('7 Days (₹999)', 'plan_7d')]
        ]));
    });

    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        ctx.session.selectedPlan = ctx.match[1];
        ctx.editMessageText(`✅ Plan: ${ctx.session.selectedPlan.toUpperCase()}\n\nUPI: yourname@upi\n\n⚠️ Payment screenshot bhejein.`);
    });

    bot.on('photo', async (ctx) => {
        if (!ctx.session?.selectedPlan) return ctx.reply("❌ Pehle plan select karein!");
        const photo = ctx.message.photo.pop().file_id;
        
        await bot.telegram.sendPhoto("7918372543", photo, {
            caption: `🔔 New Payment! User: ${ctx.from.id}\nPlan: ${ctx.session.selectedPlan}`,
            reply_markup: { inline_keyboard: [[{ text: "✅ Approve", callback_data: `approve_${ctx.from.id}` }]] }
        });
        ctx.reply("✅ Screenshot bheja gaya.");
        ctx.session.selectedPlan = null;
    });
};
