module.exports = (bot, data, saveData) => {
    const ADMIN_ID = '7918372543'; // Apni sahi Numeric ID yahan likho

    bot.action(/approve_(.+)/, (ctx) => {
        if (ctx.from.id.toString() !== ADMIN_ID) return;
        const userId = ctx.match[1];
        if (!data.users) data.users = {};
        if (!data.users[userId]) data.users[userId] = { balance: 0 };
        
        data.users[userId].balance += 100;
        saveData();
        
        ctx.editMessageText("✅ Balance Added Successfully!");
        bot.telegram.sendMessage(userId, "🎉 Aapka balance update ho gaya hai! Ab /buy use karein.");
    });
};
