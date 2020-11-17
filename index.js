// REQUIREMENTS
const express = require('express');
const app = express();



//MIDDLEWARE
app.use(express.json());



// CONTROLLERS




// PORT
app.listen(4000, () => {
	console.log('running on 4000');
});
