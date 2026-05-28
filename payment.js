module.exports = (bot) => {
    bot.command('pay', (ctx) => {
        const upiID = "xejaj@fam"; 
        const name = "ShopOwner";
        const amount = "100";
        const note = "Key Payment";

        const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
        
        // Button hata kar message mein link de rahe hain
        ctx.reply(`💰 Payment karne ke liye neeche diye gaye link par click karein:\n\n${upiLink}\n\n(Agar click nahi ho raha, toh link copy karke browser mein paste karein)`);
    });
};
