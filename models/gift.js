const mongoose = require('../db/connection')

const GiftSchema = new mongoose.Schema( {
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
    }
})

const Gift = mongoose.model('Gift', GiftSchema)

module.exports = Gift