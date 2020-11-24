// REQUIREMENTS
const express = require('express');
const app = express();
const cors = require('cors');

const requestLogger = require('./middleware/request_logger');
const { handleErrors } = require('./middleware/custom_errors')



//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(requestLogger)
app.use(handleErrors)

app.get('/', (req, res) => {
	res.redirect('/gifts')
})

// CONTROLLERS
const giftsController = require('./controllers/gifts')
app.use('/gifts', giftsController)

const userController = require('./controllers/users')
app.use('/user', userController)

const favoritesController = require('./controllers/favorites')
app.use('/favorites', favoritesController)



app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
const message = err.message || 'Internal Server Error';
res.status(statusCode).send(message)

})



// PORT
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});