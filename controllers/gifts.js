const express = require('express');
const router = express.Router();
const Gift = require('../models/gift');

// INDEX -> /gifts
router.get('/', (req, res, next) => {
	Gift.find({})
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
});

// INDEX FOR CATEGORIES /gifts/:category
router.get('/category/:category', (req, res, next) => {
	const category = req.params.category;
	Gift.find({ category: category })
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
});

// SHOW -> /gifts/:id
router.get('/:id', (req, res, next) => {
	Gift.findById(req.params.id)
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
});

// PRACTICE
router.get('/practice/practice/:price', (req, res, next) => {
  const min = 0
  const max = req.params.price
  Gift.find({
    price: { $gt: min, $lt: max }
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})

// TRAINING
router.get('/training/training', (req, res, next) => {
  Gift.find({}).sort({
    price: 1
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})

// DAMN
router.get('/damn/damn', (req, res, next) => {
  const item = 'MLB Game Used Baseball Bat Bottle Opener'
  Gift.find({
    name: { $in: [ item ] }
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})

//CREATE -> /gifts
router.post('/', (req, res, next) => {
	const giftData = req.body;
	Gift.create(giftData)
		.then((gift) => res.status(201).json(gift))
		.catch(next);
});

//UPDATE -> /gifts/:id
router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const giftData = req.body;
	Gift.findByIdAndUpdate(id, giftData, { new: true })
		.then((gift) => res.json(gift))
		.catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	Gift.findOneAndRemove({ _id: id })
		.then((gift) => {
			if (!gift) {
				res.sendStatus(404);
			} else {
				Gift.find({}).then((gifts) => res.json(gifts));
			}
		})
		.catch(next);
});

module.exports = router;
