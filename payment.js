const { Markup } = require('telegraf');

module.exports = (bot) => {
    const ADMIN_ID = "7918372543";

    bot.on('photo', async (ctx) => {
        if (!ctx.session || !ctx.session.selectedPlan) {
            return ctx.reply("❌ Pehle 'Purchase Key' mein jaakar plan select karein.");
        }

        const userId = ctx.from.id;
        const plan = ctx.session.selectedPlan;
        const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        // Admin ko notification
        await bot.telegram.sendPhoto(ADMIN_ID, photo, {
            caption: `🔔 **New Payment Verification**\n\n👤 User ID: ${userId}\n📅 Plan: ${plan.toUpperCase()}`,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ Approve & Send Key", callback_data: `approve_${userId}` }]
                ]
            }
        });

        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin jald hi approve karega.");
        ctx.session.selectedPlan = null; // Reset
    });
};
