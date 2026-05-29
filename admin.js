// admin.js mein callback regex change karo
bot.action(/approve_(.+)_(\d+)/, (ctx) => {
    const uid = ctx.match[1];
    const amount = parseInt(ctx.match[2]); // Yahan 170 detect ho jayega

    if (!data.users[uid]) data.users[uid] = { balance: 0 };
    data.users[uid].balance += amount; // Amount add ho gaya
    saveData();

    ctx.editMessageText(`✅ Approved! ₹${amount} add kar diye gaye.`);
    bot.telegram.sendMessage(uid, `🎉 ₹${amount} aapke account mein add ho gaye!`);
});
