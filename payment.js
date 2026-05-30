// payment.js
const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Plan select hone par message dikhana
    bot.action(/pay_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1]; // 1d, 7d, 30d
        ctx.session.selectedPlan = plan; // Plan save ho gaya
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: yourname@upi\n\n` +
            `Payment karne ke baad Screenshot yahan bhejein.`, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')]
            ])
        });
    });

    // 2. Screenshot aate hi Admin ko forward karna
    bot.on('photo', async (ctx) => {
        if (!ctx.session.selectedPlan) {
            return ctx.reply("❌ Pehle plan select karein!");
        }

        const plan = ctx.session.selectedPlan;
        const userId = ctx.from.id;
        const username = ctx.from.username ? `@${ctx.from.username}` : "No Username";
        const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        // Admin ko details ke sath forward
        await bot.telegram.sendPhoto(7918372543, photo, { // Yahan apni ADMIN_ID likho
            caption: `🔔 **New Payment!**\n\n` +
                     `👤 User: ${username} (ID: ${userId})\n` +
                     `📅 Plan: ${plan.toUpperCase()}\n\n` +
                     `Approve karne ke liye niche click karein:`,
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.callback('✅ Approve & Send Key', `approve_${userId}`)]
            ])
        });

        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin check karke key bhej dega.");
    });
};
