module.exports = (bot) => {
    bot.action(/approve_(.+)/, async (ctx) => {
        const userId = ctx.match[1];
        ctx.session.admin_pending = userId;
        ctx.reply(`✅ User ${userId} verify ho gaya. Ab yahan **KEY** type karke bhejein:`);
    });

    bot.on('text', async (ctx) => {
        if (ctx.session && ctx.session.admin_pending) {
            const userId = ctx.session.admin_pending;
            const key = ctx.message.text;

            await bot.telegram.sendMessage(userId, `🎉 **Payment Approved!**\n\n🔑 Key: \`${key}\``, { parse_mode: 'Markdown' });
            ctx.reply(`✅ Key ${key} bhej di gayi hai.`);
            ctx.session.admin_pending = null;
        }
    });
};
