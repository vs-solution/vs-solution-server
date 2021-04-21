const Offer = require('../models/Offer');

const offerDb = async (data) => {
	const { price, contacts, name, userId, gameName } = data;
	const offer = new Offer({
		gameName,
		ownerId: userId,
		ownerName: name,
		price: price ? price : dollar,
		contacts
	});
	await offer.save();
};

module.exports = offerDb;