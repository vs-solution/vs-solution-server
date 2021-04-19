const Offer = require('../models/Offer');

const offerDb = async (data) => {
	const offer = await new Offer({ 
		owner: data.userId, 
		price: data.price, 
		contacts: data.contacts 
	});
	await offer.save();

	return offer;
};

module.exports = offerDb;