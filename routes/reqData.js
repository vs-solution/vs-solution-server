const { Router } = require('express');

const router = Router();
const googleSheets = require('../services/googleSheets');
const offerDb = require('../services/offerDb');
const telegram = require('../services/telegram');

// Brawl Stars
router.post('/account/brawl', (req, res) => {
	const reqData = Object.values(req.body); 			// Create array for Google Sheets
	const screenshot = req.files.screenshot;			// Get image from Form
	const data = req.body; 								// Get data for message
	const message = ` 
		Отправлена анкета!
		Игра: ${data.gameName},
		Легендарных персон: ${data.legendPerson},
		Количество кубков: ${data.cupNumber},
		Скины: ${data.skins},
		Цена: ${data.price} рублей,
		Контакты: ${data.contacts}
	`; 													// Message for Telegram
	googleSheets('Brawl Stars', 7, reqData);			// Send data to Google Sheets
	offerDb(req.body);									// Send data to MongoDB
	telegram.sendNotify(message);						// Send Message to Telegram
	telegram.sendScreenshot(screenshot);				// Send image to Telegram
});

// Albion Online
router.post('/account/albion', async (req, res) => {
	const screenshot = req.files.screenshot;			// Get image from Form
	const data = req.body;								// Get data for message
	const reqData = Object.values(req.body);			// Create array for Google Sheets
	const message = `
		Отправлена анкета!
			Игра: ${data.gameName},
			Фейма на аккаунте: ${data.accountFame},
			Ценные вещи: ${data.valueProperty},
			Цена: ${data.price} рублей,
			Контакты: ${data.contacts}
		`; 												// Message for Telegram
	
	googleSheets('Albion Online', 7, reqData);			// Send data to Google Sheets

	telegram.sendScreenshot(screenshot);				// Send image to Telegram
	telegram.sendNotify(message)						// Send message to Telegram
	offerDb(data);									// Send data to MongoDB
});
router.post('/currency/albion', (req, res) => {
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Количество серебра: ${data.numberSilver},
			Цена: ${data.price} рублей,
			Контакты: ${data.contacts}
	`;
	googleSheets('Albion Online Silver', 4, reqData);	// Send data to Google Sheets
	telegram.sendNotify(message)						// Send message to Telegram
	offerDb(data);									// Send data to MongoDB
});

// Hearthstone
router.post('/account/hearthstone', (req, res) => {
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Количество легендарных карт: ${data.numberLegendCard},
			Количество золотых карт: ${data.numberGoldenCard},
			Количество золота: ${data.numberGolds},
			Количество пыли: ${data.numberDust},
			Ссылка на hsReplay: ${data.hsReplayLink},
			Цена: ${data.price} рублей,
			Контакты: ${data.contacts}
	`;
	googleSheets('Hearthstone', 10, reqData);
	telegram.sendNotify(message)						// Send message to Telegram
	offerDb(data);									// Send data to MongoDB
});

// League of Legends
router.post('/account/lol', (req, res) => {
	const screenshot = req.files.screenshot;			// Get image from Form
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Страна сервера: ${data.serverLocation},
			Уровень профиля: ${data.profileLevel},
			Количество чемпионов: ${data.numberChamps},
			Скины: ${data.skins},
			Описание аккаунта: ${data.accountDescription},
			Контакты: ${data.contacts}
	`;
	googleSheets('League of Legends', 9, reqData);
	telegram.sendNotify(message)						// Send message to Telegram
	telegram.sendScreenshot(screenshot);				// Send image to Telegram
	offerDb(data);										// Send data to MongoDB
});

// Other
router.post('/account/other', (req, res) => {
	const screenshot = req.files.screenshot;			// Get image from Form
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Описание аккаунта: ${data.accDescription},
			Цена: ${data.price} рублей,
			Контакты: ${data.contacts}
	`;
	googleSheets('Other', 7, reqData);
	telegram.sendNotify(message)						// Send message to Telegram
	telegram.sendScreenshot(screenshot);				// Send image to Telegram
	offerDb(data);										// Send data to MongoDB
});

// Steam
router.post('/account/steam', (req, res) => {
	const screenshot = req.files.screenshot;			// Get image from Form
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Название предмета: ${data.itemName},
			Цена предмета в Steam Store: ${data.itemPrice} $,
			Цена: ${data.dollar} $,
			Контакты: ${data.contacts}
	`;
	googleSheets('Steam', 7, reqData);
	telegram.sendNotify(message)						// Send message to Telegram
	telegram.sendScreenshot(screenshot);				// Send image to Telegram
	offerDb(data);										// Send data to MongoDB
});

// World of Warcraft
router.post('/account/wow', (req, res) => {
	const reqData = Object.values(req.body);
	const data = req.body;
	const message = `
		Отправлена анкета! Продажа серебра.
			Игра: ${data.gameName},
			Платная подписка: ${data.subscribe},
			Ссылка на Armory: ${data.armoryLink},
			Золотых монет в сумме на персонаже: ${data.goldsPerHero},
			Цена: ${data.price} рублей,
			Описание аккаунта: ${data.accDescription},
			Контакты: ${data.contacts}
	`;
	googleSheets('World of Warcraft', 8, reqData);
	telegram.sendNotify(message)						// Send message to Telegram
	offerDb(data);										// Send data to MongoDB
});

module.exports = router;