module.exports = (bot, data, saveData) => {
    // Admin ID yahan daal
    const ADMIN_ID = '7918372543'; 

    bot.action(/approve_(.+)/, (ctx) => {
        // Sirf Admin hi approve kar paye
        if (ctx.from.id.toString() !== ADMIN_ID) {
            return ctx.answerCbQuery("❌ Tum Admin nahi ho!");
        }

        const userId = ctx.match[1];
        if (!data.users) data.users = {};
        if (!data.users[userId]) data.users[userId] = { balance: 0 };
        
        // Balance add karo
        data.users[userId].balance += 100;
        saveData();
        
        ctx.editMessageText("✅ Balance Successfully Added!");
        bot.telegram.sendMessage(userId, "🎉 Balance update ho gaya! Ab /buy se key khareedo.");
    });
};
