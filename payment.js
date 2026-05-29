module.exports = (bot, data, saveData) => {
    bot.command('addbalance', (ctx) => {
        ctx.reply("💰 **Payment System**\n\n1. Pay ₹100 to `xejaj@fam`\n2. Send the Screenshot here.\n\nAfter sending, wait for Admin approval.");
    });

    // Jab user photo bheje
    bot.on('photo', (ctx) => {
        const userId = ctx.from.id;
        ctx.reply("✅ Screenshot received! Admin check kar raha hai...");
        
        // Admin ko forward karo
        bot.telegram.sendPhoto('ADMIN_ID_HERE', ctx.message.photo[0].file_id, {
            caption: `User ${userId} wants to add ₹100. Approve?`,
            reply_markup: {
                inline_keyboard: [[
                    { text: "Approve ✅", callback_data: `approve_${userId}` }
                ]]
            }
        });
    });
};
