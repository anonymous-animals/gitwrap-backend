const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const Gift = require('../models/gift');

const { createUserToken } = require('../middleware/auth');

// SIGN UP
// POST /user/signup
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

// SIGN IN
// POST /user/signin
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

// ADD TO FAVORITES
// router.get('/favorites', (req, res, next) => {
//   Gift.find({})
//     .then((stuff) => {
//       res.json(stuff)
//     })
//     .catch(next)
// })
//
//CREATE A GIFT IN USER
//
router.get('/');

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

//search through gifts
//add selected gift to user's favorites category
// exit
// user/id/giftId
router.put('/:id/:giftId', (req, res, next) => {
	Gift.findById(req.params.giftId)
		.then((gift) => {
			return User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { favorites: gift } },
				{ new: true }
			);
		})
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});



router.put('/id/:id/:giftId', (req, res, next) => {
	Gift.findById(req.params.giftId)
		.then((gift) => {
			return User.findOneAndUpdate(
				{ gift: req.body },
				{ $push: { favorites: gift } },
				{ new: true }
			);
		})
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});



//find users favorites
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

//aggregate function on collections
//add logic to get gift data instead of just their ids
//define a route as i'm getting the user by user.findbyid, send that user favorites as json response
//to get all the gifts by the giftId

module.exports = router;
