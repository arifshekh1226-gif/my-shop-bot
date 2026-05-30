const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Menu Action
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

    // 2. Plan Click Handling (Regex ke bina, direct handle)
    const handlePlan = async (ctx, plan) => {
        ctx.answerCbQuery();
        ctx.session.selectedPlan = plan;
        await ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: yourname@upi\n\n` +
            `Payment karke Screenshot yahan bhejein.`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[{ text: "🔙 Back to Plans", callback_data: 'buy_menu' }]]
            }
        });
    };

    bot.action('plan_1d', (ctx) => handlePlan(ctx, '1d'));
    bot.action('plan_7d', (ctx) => handlePlan(ctx, '7d'));
    bot.action('plan_30d', (ctx) => handlePlan(ctx, '30d'));

    // 3. Photo Handling (Screenshot Admin ko bhejne ke liye)
    bot.on('photo', async (ctx) => {
        if (!ctx.session.selectedPlan) {
            return ctx.reply("❌ Pehle Plan select karein.");
        }
        
        const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const userId = ctx.from.id;
        const plan = ctx.session.selectedPlan;

        // Admin ko bhejo
        await bot.telegram.sendPhoto("7918372543", photo, {
            caption: `🔔 **New Payment!**\nUser ID: ${userId}\nPlan: ${plan.toUpperCase()}`,
            reply_markup: {
                inline_keyboard: [[{ text: "✅ Approve & Send Key", callback_data: `approve_${userId}` }]]
            }
        });
        ctx.reply("✅ Screenshot bhej diya gaya hai. Admin jald hi approve karega.");
        ctx.session.selectedPlan = null; // Session reset
    });
};
