const TelegramBot = require('node-telegram-bot-api');

// Environment variables se token aur ID lein
const token = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

const bot = new TelegramBot(token, {polling: true});

// /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Purchase Key', callback_data: 'purchase' }],
                [{ text: 'Account', callback_data: 'account' }],
                [{ text: 'Feedback', callback_data: 'feedback' }],
                [{ text: 'Admin Support', callback_data: 'support' }]
            ]
        }
    };
    bot.sendMessage(chatId, 'Welcome! Choose an option:', opts);
});

// Callback queries handle karna
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'purchase') {
        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '1 Day - ₹299', callback_data: 'buy_1d' }],
                    [{ text: '7 Days - ₹999', callback_data: 'buy_7d' }],
                    [{ text: '30 Days - ₹1799', callback_data: 'buy_30d' }]
                ]
            }
        };
        bot.editMessageText('Select your Fluorite iOS plan:', { chat_id: chatId, message_id: query.message.message_id, reply_markup: opts.reply_markup });
    } else if (query.data.startsWith('buy_')) {
        const plan = query.data.split('_')[1];
        bot.editMessageText(`Selected: ${plan.toUpperCase()} Plan.\n\nPayment ke liye QR scan karein aur screenshot upload karein:\nhttps://via.placeholder.com/300x300.png?text=QR+Code`, { chat_id: chatId, message_id: query.message.message_id });
        // User state save karne ke liye yahan database use karein
    }
});

// Screenshot receive karna
bot.on('photo', (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || msg.from.first_name;

    bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
        caption: `New Purchase: @${username} ne payment kiya hai.`
    });
    bot.sendMessage(chatId, "Payment screenshot mil gaya! Admin check kar rahe hain.");
});
