module.exports = (bot, data, saveData) => {
    
    // Account Button
    bot.action('account', (ctx) => {
        ctx.answerCbQuery();
        const uid = ctx.from.id.toString();
        const balance = data.users[uid] ? data.users[uid].balance : 0;
        ctx.editMessageText(`👤 **Account Info**\n\n🆔 ID: \`${uid}\`\n💰 Balance: ₹${balance}\n\nBalance add karne ke liye 'Deposit Fund' use karein.`, {
            parse_mode: 'Markdown',
            reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: 'main_menu' }]] }
        });
    });

    // History Button (Filhal simple placeholder)
    bot.action('history', (ctx) => {
        ctx.answerCbQuery();
        ctx.editMessageText("📜 **Purchase History**\n\nAbhi tak koi purchase nahi ki hai.", {
            reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: 'main_menu' }]] }
        });
    });
};
