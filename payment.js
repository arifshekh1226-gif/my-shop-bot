module.exports = (bot, data, saveData) => {

    bot.action('pay_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("💳 UPI: `xejaj@fam`\nSend screenshot here.", { 
            reply_markup: { inline_keyboard: [[{text:"🔙 Back", callback_data:'main_menu'}]] } 
        });
    });

    bot.on('photo', (ctx) => {
        const amt = parseInt(ctx.message.caption) || 0;
        const uid = ctx.from.id;
        // ADMIN_ID yahan bhi wahi honi chahiye jo tumne admin.js mein use ki hai
        bot.telegram.sendPhoto('7918372543', ctx.message.photo[0].file_id, { 
            caption: `User: ${uid}\nAmount: ${amt}`, 
            reply_markup: { inline_keyboard: [[{text:`✅ Approve ${amt}`, callback_data:`approve_${uid}_${amt}`}]] } 
        });
        ctx.reply("✅ Sent to admin!");
    });

}; // <--- Yeh closing bracket zaroori hai!
