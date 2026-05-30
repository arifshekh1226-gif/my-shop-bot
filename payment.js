// payment.js
const { Markup } = require('telegraf');

module.exports = (bot) => {
    bot.action(/pay_(.+)/, (ctx) => {
        ctx.answerCbQuery();
        const plan = ctx.match[1];
        ctx.session.selectedPlan = plan; 
        
        ctx.editMessageText(`✅ **Plan: ${plan.toUpperCase()}**\n\n` +
            `UPI: xejaj@fam\n` +
            `Payment karke Screenshot bhejein.`, {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Back to Plans', 'buy_menu')] // Back Button
            ])
        });
    });
};
