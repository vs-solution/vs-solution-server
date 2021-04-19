const { Router } = require('express');
const router = Router();
const Offer = require('../models/Offer');

router.post('/account', (req, res) => {
	console.log(req);
});

module.exports = router;