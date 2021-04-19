const {Schema, model, Types} = require('mongoose');

const Offer = new Schema(
	{
		owner: {
			type: Types.ObjectId, 
			ref: 'User'
		},
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