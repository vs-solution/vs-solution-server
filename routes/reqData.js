const { Router } = require('express');

const router = Router();
const googleSheets = require('../services/googleSheets');
const offerDb = require('../services/offerDb');

// Brawl Stars
router.post('/account/brawl', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Brawl Stars', 5, reqData);
	res.json(offerDb(req.body));
	console.log(reqData);
});

// Albion Online
router.post('/account/albion', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Albion Online', 5, reqData)
	console.log(req.body);
});
router.post('/currency/albion', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Albion Online Silver', 2, reqData);
	console.log(req.body);
});

// Hearthstone
router.post('/account/hearthstone', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Hearthstone', 7, reqData);
	console.log(req.body);
});

// League of Legends
router.post('/account/lol', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('League of Legends', 7, reqData);
	console.log(req.body);
});

// Other
router.post('/account/other', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Other', 5, reqData);
	console.log(req.body);
});

// Steam
router.post('/account/steam', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('Steam', 5, reqData);
	console.log(req.body);
});

// World of Warcraft
router.post('/account/wow', (req, res) => {
	const reqData = Object.values(req.body);
	googleSheets('World of Warcraft', 6, reqData);
	console.log(req.body);
});

module.exports = router;