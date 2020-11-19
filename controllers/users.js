const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

const { createUserToken } = require('../middleware/auth');

// SIGN UP
// POST /user/signup
router.post('/signup', (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash =>
      ({
        email: req.body.email,
        password: hash
      })
    )
    .then(user => User.create(user))
    .then(user => res.status(201).json(user))
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
router.get('/favorites', (req, res, next) => {
  User.find({})
    .then((stuff) => {
      res.json(stuff)
    })
    .catch(next)
})
// 






module.exports = router;