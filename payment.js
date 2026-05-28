module.exports = (bot) => {
    bot.command('pay', (ctx) => {
        const upiID = "xejaj@fam"; 
        const name = "ShopOwner";
        const amount = "100";
        const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
        
        ctx.reply("💰 **Payment Section**\n\nScan QR or click below to pay:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Pay Now 💸", url: upiLink }]
                ]
            }
        });
    });
};
