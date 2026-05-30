const { Markup } = require('telegraf');

module.exports = (bot) => {
    // 1. Admin Command: Nayi Key add karne ke liye
    // Format: /addkey 1d YOUR_KEY_HERE
    bot.command('addkey', (ctx) => {
        if (ctx.from.id != 7918372543) return; // Sirf tu use kar payega

        const args = ctx.message.text.split(' ');
        if (args.length < 3) return ctx.reply("Galat format! Use: /addkey 1d KEY_XYZ");

        const plan = args[1]; // 1d, 7d, 30d
        const key = args[2];
        
        // Yahan database/file mein save karne ka logic (jo tumhara pehle se hai)
        // saveKeyToDatabase(plan, key); 
        
        ctx.reply(`✅ ${plan} ke liye key add ho gayi: ${key}`);
    });

    // 2. Admin Approve button ka logic
    bot.action(/approve_(.+)/, async (ctx) => {
        const userId = ctx.match[1];
        
        // Admin se key maango
        ctx.session.pendingApproval = userId;
        ctx.editMessageText(`User ${userId} ke liye Key paste karo:`);
    });
};
