const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Gift = require('../models/gift');

const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');
const { requireToken } = require('../middleware/auth');


// SIGN UP   /user/signup
router.post('/signup', (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => ({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		}))
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// SIGN IN   /user/signin
router.post('/signin', (req, res, next) => {
	let signedInUser
	User.findOne({ email: req.body.email })
		.then((user) => {
			signedInUser = user
			return	createUserToken(req, user)
		})
		.then((token) => res.json({ token, message:"Success", userId: signedInUser.id} ))
		.catch(next);
});

// SHOW USER INFO /user/userId
router.get('/user/:userId', requireToken, (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) => {
			res.json(user); 
		})
		.catch(next);
});

// ADD TO USER'S FAVORITES LIST /user/id/giftId
router.put('/:id/:giftId', requireToken, (req, res, next) => {
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

// SHOW USER'S FAVORITES /user/gifts/userId
router.get('/gifts/:userId', requireToken, (req, res, next) => {
	User.findById(req.params.userId)
		.then((user) => {
			return user.favorites;
		})
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
});

// UPDATE A SPECIFIC ITEM IN USER'S FAORITES /user/id/giftId
router.patch('/:id/:giftId', requireToken, (req, res, next) => {
	const gift = req.body
	//search through users
	User.findById(req.params.id)
		.then(() => {
			//update selected gift from user's favorites category
			return User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: { favorites: { 
					category: gift.category[0],
					name: gift.name, 
					description: gift.description,
					image: gift.image,
					price: gift.price,
					link: gift.link,
				} } }
			);
		})
		// exit
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

// DELETE A USER'S FAVORITES LIST /user/id/giftId
router.delete('/:id/:giftId', requireToken, (req, res, next) => {
	const gift = req.params.giftId
	//search through users
	User.findById(req.params.id)
	.then(() => {
		//delete selected gift from user's favorites category
		return User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { favorites: { _id:gift } } },
			{ safe: true }
			);
		})
		// exit
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});


// dev route
//INDEX OF ALL USERS /user
router.get('/', (req, res, next) => {
	User.find({})
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});


module.exports = router;
