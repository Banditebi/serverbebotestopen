const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Эндпоинт для обновления монет на сервере
app.post("/api/updateCoins", (req, res) => {
  const { coins } = req.body;

  // Здесь должна быть логика обновления монет в вашей базе данных (MongoDB)
  // Пример:
  // YourModel.findOneAndUpdate({ /* условие для обновления */ }, { coins: coins }, { new: true }, (err, doc) => {
  //   if (err) {
  //     console.log("Something wrong when updating data!");
  //   }
  //   console.log(doc);
  // });

  res.json({ message: "Coins updated successfully" });
});

// Слушаем сервер
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_TELEGRAM_BOT_TOKEN";
const bot = new TelegramBot(token, { polling: true });

// Пример команды для обновления монет
bot.onText(/\/updatecoins (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const newCoins = match[1];

  axios
    .post("http://localhost:3001/api/updateCoins", { coins: newCoins })
    .then((response) => {
      bot.sendMessage(chatId, `Монеты обновлены: ${newCoins}`);
    })
    .catch((error) => {
      bot.sendMessage(chatId, "Ошибка при обновлении монет");
    });
});

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
