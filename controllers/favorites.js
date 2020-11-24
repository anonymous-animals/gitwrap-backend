const express = require('express')
const User = require('../models/user')
const router = express.Router()


// SHOW USER INFO /user/userId
router.get('/user/:userId', (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) => {
			res.json(user);
		})
		//getting an array of our favorites
		// .then((gifts) => {
		// 	console.log(gifts);
		// })
		.catch(next);
});

// SHOW USER'S FAVORITES /user/gifts/userId
router.get('/gifts/:userId', (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) => {
			return user.favorites;
		})
		//getting an array of our favorites
		.then((gifts) => {
			console.log(gifts);
		})
		.catch(next);
});

// ADD GIFT TO USER FAVORITES LIST /user/id/giftId
router.put('/:id/:giftId', (req, res, next) => {
	//search through gifts
	Gift.findById(req.params.giftId)
	.then((gift) => {
		//add selected gift to user's favorites category
		return User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { favorites: gift } },
			{ new: true }
			);
		})
		// exit
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

module.exports = router