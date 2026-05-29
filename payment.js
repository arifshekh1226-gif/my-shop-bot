module.exports = (bot, data, saveData) => {
    const ADMIN_ID = '7918372543'; // Apni numeric ID yahan daalo

    bot.action('pay_menu', (ctx) => {
        ctx.editMessageText("💳 UPI: `xejaj@fam`\n\nPayment karne ke baad screenshot yahan bhejiye.");
    });

    // Jab user photo bhejega
    bot.on('photo', (ctx) => {
        const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const userId = ctx.from.id.toString();
        const userName = ctx.from.username || "User";

        // Admin ko screenshot bhejo
        bot.telegram.sendPhoto(ADMIN_ID, fileId, {
            caption: `👤 New Payment from @${userName} (ID: ${userId})\nApprove karne ke liye niche button dabayein:`,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ Approve ₹100", callback_data: "approve_" + userId }]
                ]
            }
        });

        ctx.reply("✅ Screenshot bheja gaya! Admin jald hi approve karega.");
    });
};
