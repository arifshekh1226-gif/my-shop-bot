module.exports = (bot, data, saveData) => {
    bot.action('account', (ctx) => {
        ctx.answerCbQuery();
        const bal = data.users[ctx.from.id]?.balance || 0;
        ctx.editMessageText(`👤 Balance: ₹${bal}`, { reply_markup: { inline_keyboard: [[{text:"🔙 Back",callback_data:'main_menu'}]] } });
    });
};
