module.exports = (bot) => {
    bot.action(/approve_(.+)/, (ctx) => {
        ctx.session.admin_pending = ctx.match[1];
        ctx.answerCbQuery("Ab Key bhejein.");
        ctx.reply("✅ User verify hua. Key bhejein:");
    });

    bot.on('text', async (ctx) => {
        if (ctx.session?.admin_pending) {
            const userId = ctx.session.admin_pending;
            await bot.telegram.sendMessage(userId, `🎉 **Approved!**\n\n🔑 Key: \`${ctx.message.text}\``, { parse_mode: 'Markdown' });
            ctx.reply("✅ Key bhej di gayi.");
            ctx.session.admin_pending = null;
        }
    });
};
