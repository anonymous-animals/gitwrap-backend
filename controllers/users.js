const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const Gift = require('../models/gift');

const { createUserToken } = require('../middleware/auth');

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
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		// .then(res.send({
		// 	auth: true,
		// 	token: token,
		// 	message: 'user found and logged in'
		// }))
		.then((token) => res.json({ token }))
		// .then((token) => res.json({ token, message:"Success", username: req.body.username} ))
		// .then(res.json({message:"Success", username: req.body.username}))
		.catch(next);
});

// ROUTE FOR FRONT END TO CHECK IF LOGGED IN
router.get('/login/:userId', (req, res) => {
	User.findById(req.params.userId)
	.then((userId))
	if (token) {
		res.send({ loggedIn: true, user:user})
	} else {
		res.send({loggedIn: false})
	}
})


//INDEX OF ALL USERS
router.get('/', (req, res, next) => {
	User.find({})
		.then((users) => {
			res.json(users);
		})
		.catch(next);
});

// ADD
router.post('/:id', (req, res, next) => {
	// get the gift data from the body of the request
	const giftData = req.body;
	console.log(req);
	// get the user id from the body
	const userId = req.params.id;
	// find the user by its id
	User.findById(userId)
		.then((user) => {
			// add gift to user
			user.favorites.push(giftData);
			// save restaurant/user
			return user.save();
		})
		// send responsne back to client
		.then((user) => res.status(201).json({ user: user }))

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


module.exports = router;
