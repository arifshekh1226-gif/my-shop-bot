module.exports = (bot, data, saveData) => {
    // Apni Telegram User ID yahan daal
    const ADMIN_ID = '7918372543'; 

    bot.action(/approve_(.+)_(\d+)/, (ctx) => {
        // Security check: Sirf Admin hi approve kar sake
        if (ctx.from.id.toString() !== ADMIN_ID) {
            return ctx.answerCbQuery("❌ Access Denied! Tum Admin nahi ho.");
        }

        const uid = ctx.match[1];
        const amt = parseInt(ctx.match[2]);

        if (!data.users[uid]) data.users[uid] = { balance: 0 };
        data.users[uid].balance += amt;
        saveData();

        ctx.editMessageText(`✅ Approved! ₹${amt} added to User ID: ${uid}`);
        bot.telegram.sendMessage(uid, `🎉 Payment Approved! ₹${amt} aapke balance mein add ho gaye.`);
    });
};
