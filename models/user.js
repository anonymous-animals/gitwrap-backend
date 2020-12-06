const mongoose = require('../db/connection');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
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
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			id: true,
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);


module.exports = mongoose.model('User', userSchema);
