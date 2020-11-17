const mongoose = require ('mongoose')

const mongoURI =
  process.env.PORT === 'production'
    ? process.env.DB_URL
    : 'mongodb://localhost/gifts';
    
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});
module.exports = mongoose;
