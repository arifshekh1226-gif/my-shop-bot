module.exports = (bot) => {
    bot.command('pay', (ctx) => {
        const upiID = "xejaj@fam"; // Yahan apni UPI ID dalo
        const name = "ShopOwner";
        const amount = "100"; // Jitna price hai
        const note = "Key Payment";

        // UPI Link generate ho raha hai
        const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
        
        ctx.reply("💰 Payment karne ke liye neeche link par click karein:", {
            reply_markup: {
                inline_keyboard: [[{ text: "Pay Now 💸", url: upiLink }]]
            }
        });
    });
};
