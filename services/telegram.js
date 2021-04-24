require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TLG_BOT_TOKEN, {polling: true});

const sendNotify = async (message) => {
	await bot.sendMessage(process.env.TLG_CHAT_ID, message);
};

const sendScreenshot = (photo) => {
	photo.map((item) => {
	  bot.sendPhoto(process.env.TLG_CHAT_ID, item.data, {filename: item.nama, contentType: item.mimetype});
	})
}

module.exports = {sendNotify, sendScreenshot};