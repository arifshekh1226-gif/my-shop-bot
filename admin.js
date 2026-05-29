bot.action(/approve_(.+)/, (ctx) => {
    const userId = ctx.match[1];
    if (!data.users[userId]) data.users[userId] = { balance: 0 };
    
    data.users[userId].balance += 100;
    saveData();
    
    ctx.editMessageText("✅ Balance Added!");
    bot.telegram.sendMessage(userId, "🎉 Your balance has been updated! Use /buy.");
});
