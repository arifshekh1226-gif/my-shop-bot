module.exports = (bot) => {
    bot.action('buy_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("🛒 Shop Menu opened!");
    });
};
