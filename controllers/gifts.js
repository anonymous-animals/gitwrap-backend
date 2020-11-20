const express = require('express');
const router = express.Router();
const Gift = require('../models/gift');

const { requireToken } = require('../middleware/auth');


// INDEX -> /gifts
router.get('/',  (req, res, next) => {
	Gift.find({})
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
});

// INDEX FOR CATEGORIES /gifts/:category
router.get('/category/:category', requireToken, (req, res, next) => {
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

// LIMIT PRICE /gifts/price/number 
//FILTER BY PRICE, IN ASCENDING (LOW FROM HIGH) ORDER
router.get(`/price/:price/`, (req, res, next) => {
  let min = 0
	const max = req.params.price
	const category = req.params.cateegory
  Gift.find({
		price: { $gt: min, $lt: max },
  })
  .sort({
	  price: 1,
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})


// ASCENDING SORT ALL /gifts/sort/asc
router.get('/sort/asc', (req, res, next) => {
  Gift.find({}).sort({
    price: 1
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})

// ASCENDING SORT BY CATEGORY /gifts/sort/category/asc
router.get('/sort/:category/asc', (req, res, next) => {
	const category = req.params.category;
	Gift.find({ category: category })
		.sort({
			price: 1,
		})
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
})

// DESCENDING SORT ALL /gifts/sort/des
router.get('/sort/des', (req, res, next) => {
  Gift.find({}).sort({
    price: -1
  })
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})

// DESCENDING SORT BY CATEGORY /gifts/sort/category/des
router.get('/sort/:category/des', (req, res, next) => {
	const category = req.params.category;
	Gift.find({ category: category })
		.sort({
			price: -1,
		})
		.then((gifts) => {
			res.json(gifts);
		})
		.catch(next);
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
