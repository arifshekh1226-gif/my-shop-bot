module.exports = (bot, data, saveData) => {
    
    // 1. Buy Menu
    bot.action('buy_menu', (ctx) => {
        ctx.editMessageText("🛒 **Shop Menu**\nSelect your product:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💎 Buy Fluorite Key (₹100)", callback_data: 'buy_fluorite' }],
                    [{ text: "🔙 Back", callback_data: 'main_menu' }]
                ]
            }
        });
    });

    // 2. Buying Logic (Balance Detection)
    bot.action('buy_fluorite', (ctx) => {
        const userId = ctx.from.id.toString();
        
        // Check if user exists and has balance
        if (!data.users[userId] || data.users[userId].balance < 100) {
            return ctx.answerCbQuery("❌ Insufficient balance! Pehle /addbalance karein.");
        }

        // Check if key is available
        if (!data.keys.fluorite || data.keys.fluorite.length === 0) {
            return ctx.answerCbQuery("❌ Out of stock! Admin ko batayein.");
        }

        // Deduct balance and get key
        data.users[userId].balance -= 100;
        const key = data.keys.fluorite.shift();
        saveData();

        ctx.editMessageText(`✅ **Purchase Successful!**\n\nProduct: Fluorite Key\nKey: \`${key}\`\n\nBalance remaining: ₹${data.users[userId].balance}`, { parse_mode: 'Markdown' });
    });

    // 3. Main Menu Navigation
    bot.action('main_menu', (ctx) => {
        ctx.editMessageText("👋 Welcome back to Premium Shop!", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🛒 Buy Keys", callback_data: 'buy_menu' }],
                    [{ text: "💳 Add Balance", callback_data: 'pay_menu' }]
                ]
            }
        });
    });
};
