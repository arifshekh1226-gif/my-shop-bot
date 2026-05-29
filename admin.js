module.exports = (bot, data, saveData) => {
    const ADMIN_ID = '7918372543'; // Teri ID

    // Admin Command
    bot.command('admin', (ctx) => {
        if (ctx.from.id.toString() !== ADMIN_ID) return ctx.reply("❌ Tum Admin nahi ho!");
        ctx.reply("👑 Welcome Admin! Use buttons to approve.");
    });

    // Approval Action
    bot.action(/approve_(.+)/, (ctx) => {
        if (ctx.from.id.toString() !== ADMIN_ID) return ctx.answerCbQuery("❌ Unauthorized!");
        
        const uid = ctx.match[1];
        if (!data.users[uid]) data.users[uid] = { balance: 0 };
        data.users[uid].balance += 100;
        saveData();
        
        ctx.editMessageText("✅ Approved! Balance Added.");
        bot.telegram.sendMessage(uid, "🎉 Balance added!");
    });
};
