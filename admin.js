module.exports = (bot, data, saveData) => {
    const ADMIN_ID = '7918372543'; // Apni ID yahan cross-check kar le

    // Callback query handling
    bot.action(/approve_(.+)_(\d+)/, async (ctx) => {
        // Security check: Sirf admin hi approve kar sake
        if (ctx.from.id.toString() !== ADMIN_ID) {
            return ctx.answerCbQuery("❌ Tum Admin nahi ho!");
        }

        const uid = ctx.match[1];
        const amount = parseInt(ctx.match[2]);

        if (!data.users[uid]) data.users[uid] = { balance: 0 };
        data.users[uid].balance += amount;
        saveData();

        // Status update
        ctx.editMessageText(`✅ Approved! ₹${amount} add kar diye gaye.`);
        
        // User ko notification
        try {
            await bot.telegram.sendMessage(uid, `🎉 Success! ₹${amount} aapke account mein add ho gaye.`);
        } catch (e) {
            console.error("User ko message nahi gaya:", e);
        }
        
        ctx.answerCbQuery("Done!");
    });
};
