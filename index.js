// REQUIREMENTS
const express = require('express');
const app = express();



//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.redirect('/gifts')
})

// CONTROLLERS
const giftsController = require('./controllers/gifts')
app.use('/gifts', giftsController)

app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
const message = err.message || 'Internal Server Error';
res.status(statusCode).send(message)

})



// PORT
app.listen(4000, () => {
	console.log('running on 4000');
});
