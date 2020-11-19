const mongoose = require('../db/connection');

const giftSchema = require('./gift')
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		// favorites: [{
		//   ref: 'Gift',
		//   type: mongoose.Schema.Types.ObjectId,

		// }]
		favorites: [
			{
				name: {
					type: String,
					required: true,
				},
				description: String,
				image: {
					type: String,
					required: true,
				},
				price: Number,
				link: String,
				category: {
					type: [String],
					required: true,
				},
			}
		]
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);



module.exports = mongoose.model('User', userSchema);
