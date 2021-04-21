const { Router } = require('express');
const router = Router();
const Offer = require('../models/Offer');

router.post('/account', async (req, res) => {
	const { userId } = req.body;
	
	const offer = await Offer.find({ownerId: userId}, (err, doc) => {
		if (err) return res.json({message: "Преложений не найдено"});

		res.json(doc);
	});

	res.json(offer);

	console.log(offer);
});

router.post('/admin', async (req, res) => {
	const offer = await Offer.find({}, (err, doc) => {
		if (err) return res.json({message: "Предложений не найдено"});

		res.json(doc)
	})

	res.json(offer)
})

module.exports = router;