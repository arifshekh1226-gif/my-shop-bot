const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

// Modules load karo
require('./shop')(bot);
require('./admin')(bot);
require('./payment')(bot);
require('./user')(bot);

// Yahi eklaauta bot.launch hona chahiye
bot.launch({ dropPendingUpdates: true })
    .then(() => console.log("🚀 Bot is LIVE!"))
    .catch((err) => console.error("Launch Error:", err));
