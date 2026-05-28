module.exports = (bot) => {
    bot.command('pay', (ctx) => {
        const upiID = "xejaj@fam"; 
        const name = "ShopOwner";
        const amount = "100";
        const note = "Key Payment";

        const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
        
        ctx.reply("💰 Payment karne ke liye neeche link par click karein:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Pay Now 💸", url: upiLink }]
                ]
            }
        });
    });
};
