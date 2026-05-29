// payment.js ke andar bot.on('photo') wala part:

bot.on('photo', (ctx) => {
    // Agar user caption mein amount likhe (jaise "170")
    const caption = ctx.message.caption || "0";
    const amount = parseInt(caption) || 0; 
    
    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const userId = ctx.from.id.toString();

    // Admin ko screenshot bhejo
    bot.telegram.sendPhoto(ADMIN_ID, fileId, {
        caption: `👤 New Payment\n💰 Amount: ₹${amount}\n🆔 User ID: ${userId}\n\nApprove button dabao:`,
        reply_markup: {
            inline_keyboard: [
                [{ text: `✅ Approve ₹${amount}`, callback_data: `approve_${userId}_${amount}` }]
            ]
        }
    });
    ctx.reply("✅ Screenshot bheja gaya! Admin verify karke balance add kar dega.");
});
