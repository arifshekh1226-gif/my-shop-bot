const { Markup } = require('telegraf');

module.exports = (bot) => {
    const ADMIN_ID = "7918372543";

    // 1. Menu dikhana
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("🛒 **Select Your Plan:**", {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "1 Day (₹299)", callback_data: 'plan_1d' }],
                    [{ text: "7 Days (₹999)", callback_data: 'plan_7d' }],
                    [{ text: "30 Days (₹1799)", callback_data: 'plan_30d' }],
                    [{ text: "🔙 Back to Menu", callback_data: 'main_menu' }]
                ]
            }
        });
    });

    // 2. Plan selection aur UPI dikhana
    bot.action(/plan_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        ctx.session.selectedPlan = plan; 
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: yourname@upi\n\n` +
            `Payment karke Screenshot yahan bhejein.`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[{ text: "🔙 Back to Plans", callback_data: 'buy_menu' }]]
            }
        });
    });

    // 3. Screenshot handle karke Admin ko bhejna (Combined Logic)
    bot.on('photo', async (ctx) => {
        if (!ctx.session || !ctx.session.selectedPlan) return;

        const userId = ctx.from.id;
        const plan = ctx.session.selectedPlan;
        const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        await bot.telegram.sendPhoto(ADMIN_ID, photo, {
            caption: `🔔 **New Payment Verification**\n\n👤 User ID: ${userId}\n📅 Plan: ${plan.toUpperCase()}`,
            reply_markup: {
                inline_keyboard: [[{ text: "✅ Approve & Send Key", callback_data: `approve_${userId}` }]]
            }
        });

        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin jald hi approve karega.");
        ctx.session.selectedPlan = null; // Session clear
    });
};
