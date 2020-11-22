const mongoose = require('./connection')
const Gift = require('../models/gift')
const giftSeedsData = require('./seeds.json')

Gift.deleteMany({})
.then(() => {
    return Gift.insertMany(giftSeedsData)
})
.then(console.log)
.catch(console.error)
.finally(() => {
    process.exit()
})

////////////////

// const User = require('../models/user')

// User.deleteMany({})
// .then(console.log)
// .catch(console.error)
// .finally(() => {
//     process.exit()
// })