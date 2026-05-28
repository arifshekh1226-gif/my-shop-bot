module.exports = {
    handlePayment: (bot) => {
        bot.command('pay', (ctx) => {
            const upiLink = "upi://pay?pa=xejaj@fam&pn=ShopOwner&am=100&cu=INR";
            
            // Yahan tum apne QR Code ki direct link daal sakte ho
            const qrImageUrl = "https://i.postimg.cc/JzL77YPF/IMG-20260528-133515-137.jpg"; 

            ctx.replyWithPhoto(qrImageUrl, {
                caption: "💰 QR Code scan karein ya neeche link par click karein:\n\n" + upiLink,
                reply_markup: {
                    inline_keyboard: [[{ text: "Pay via UPI App 💸", url: upiLink }]]
                }
            });
        });
    }
};
