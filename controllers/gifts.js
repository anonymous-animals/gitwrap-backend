const express = require('express')
const router = express.Router()
const Gift = require('../models/gift')

// INDEX -> /gifts
router.get('/', (req, res, next) => {
  Gift.find({})
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next);
})

// INDEX FOR CATEGORIES /gifts/:category
router.get('/:category', (req, res, next) => {
  const category = req.params.category
  Gift.find({category: category})
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next)
})




// SHOW -> /gifts/:id
router.get('/:id', (req, res, next) => {
  Gift.findById(req.params.id)
    .then((gifts) => {
      res.json(gifts)
    })
    .catch(next);
})

//CREATE -> /gifts
router.post('/', (req,res,next) => {
    const giftData = req.body;
    Gift.create(giftData)
    .then((gift) => res.status(201).json(gift))
    .catch(next);
})

//UPDATE -> /gifts/:id
router.patch('/:id', (req,res,next) => {
    const id = req.params.id;
    const giftData = req.body;
    Gift.findByIdAndUpdate(id, giftData, { new: true })
    .then((gift) => res.json(gift))
    .catch(next);
})

//DELETE
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Gift.findOneAndRemove({ _id: id})
  .then(
(gift) => {
    if (!gift) {
    res.sendStatus(404);
    } else {
	Gift.find({}).then((gifts) => res.json(gifts));
	}
    })
  .catch(next);
})





module.exports = router