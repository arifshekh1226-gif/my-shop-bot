bot.action('buy_menu', (ctx) => {
    // Ye line add karke dekho agar menu hi nahi khul raha
    console.log("Buy menu clicked!"); 
    ctx.answerCbQuery();
    ctx.editMessageText("Select your plan:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "1 Day (₹299)", callback_data: 'buy_1d' }],
                [{ text: "7 Days (₹999)", callback_data: 'buy_7d' }]
            ]
        }
    });
});
