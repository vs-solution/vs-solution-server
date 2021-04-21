const {Schema, model, Types} = require('mongoose');

const Offer = new Schema(
	{
		gameName: {type: String},
		ownerId: {type: Types.ObjectId, ref: 'User'},
		ownerName: { type: String },
		price: {
			type: String,
		},
		contacts: {
			type: String,
		}
	},
	{
		collection: 'offers',
	}
);

module.exports = model('Offer', Offer);

// Предложения, сумма предложений, Имя, Соц. Сети, почта