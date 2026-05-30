const { Markup } = require('telegraf');

module.exports = (bot) => {
    const ADMIN_ID = "7918372543";

    // Menu dikhana
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", Markup.inlineKeyboard([
            [Markup.button.callback('1 Day (₹299)', 'plan_1d')],
            [Markup.button.callback('7 Days (₹999)', 'plan_7d')],
            [Markup.button.callback('🔙 Back to Menu', 'main_menu')]
        ]));
    });

    // Plan Select karte hi payment details dikhana
    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        ctx.session.selectedPlan = plan; // Plan save ho gaya
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI ID: yourname@upi\n\n` +
            `⚠️ Payment karke screenshot yahan bhejein.`, 
            Markup.inlineKeyboard([[Markup.button.callback('🔙 Back', 'buy_menu')]])
        );
    });

    // Screenshot handle karke Admin ko bhejna
    bot.on('photo', async (ctx) => {
        if (!ctx.session || !ctx.session.selectedPlan) {
            return ctx.reply("❌ Pehle plan select karein!");
        }

        const userId = ctx.from.id;
        const photo = ctx.message.photo.pop().file_id;

        await bot.telegram.sendPhoto(ADMIN_ID, photo, {
            caption: `🔔 **New Payment!**\nUser: ${userId}\nPlan: ${ctx.session.selectedPlan.toUpperCase()}`,
            reply_markup: {
                inline_keyboard: [[{ text: "✅ Approve & Send Key", callback_data: `approve_${userId}` }]]
            }
        });

        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin jald hi approve karega.");
        ctx.session.selectedPlan = null; // Session clear
    });
};
