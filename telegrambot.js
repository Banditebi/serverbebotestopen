const TelegramBot = require("node-telegram-bot-api");

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = "7389103033:AAEAGZVjZjOoOHp1ATGkLur7kBB4wslttnA";

const bot = new TelegramBot(token, { polling: true });

// Пример приветственной команды
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Привет! Я ваш бот.");
});

// Пример эхо-бота
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Вы написали: ${msg.text}`);
});
