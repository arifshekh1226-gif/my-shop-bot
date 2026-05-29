module.exports = (bot, data, saveData) => {
    const ADMIN_ID = '7918372543'; 

    bot.action(/approve_(.+)/, (ctx) => {
        // Sirf tumhara account hi ye command chala payega
        if (ctx.from.id.toString() !== ADMIN_ID) {
            return ctx.answerCbQuery("❌ Sirf Admin hi approve kar sakta hai!");
        }

        const uid = ctx.match[1];
        if (!data.users[uid]) data.users[uid] = { balance: 0 };
        data.users[uid].balance += 100;
        saveData();

        ctx.editMessageText("✅ Approved!");
        bot.telegram.sendMessage(uid, "🎉 Balance add ho gaya!");
    });
};
