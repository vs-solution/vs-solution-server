require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TLG_BOT_TOKEN, {polling: true});

const sendNotify = async (message) => {
	await bot.sendMessage(process.env.TLG_CHAT_ID, message);
};

const sendScreenshot = async (photo) => {
	const fileOptions = {
		filename: photo.name,
		contentType: photo.mimetype,
	  };
	await bot.sendPhoto(process.env.TLG_CHAT_ID, photo.data, fileOptions);
}

module.exports = {sendNotify, sendScreenshot};