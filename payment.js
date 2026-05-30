const { Markup } = require('telegraf');

module.exports = (bot) => {
    const ADMIN_ID = "7918372543";

    bot.action(/pay_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        ctx.session.selectedPlan = plan; 
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: yourname@upi\n\n` +
            `Payment karke Screenshot yahan bhejein.`, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')]
            ])
        });
    });

    bot.on('photo', async (ctx) => {
        if (!ctx.session.selectedPlan) return ctx.reply("❌ Pehle plan select karein!");
        
        const userId = ctx.from.id;
        const plan = ctx.session.selectedPlan;
        const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        await bot.telegram.sendPhoto(ADMIN_ID, photo, {
            caption: `🔔 **New Payment!**\n\n👤 User ID: ${userId}\n📅 Plan: ${plan.toUpperCase()}`,
            reply_markup: {
                inline_keyboard: [[{ text: "✅ Approve & Send Key", callback_data: `approve_${userId}` }]]
            }
        });
        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin jald hi key bhejega.");
    });
};
