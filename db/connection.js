const mongoose = require ('mongoose')
const mongoURI = 'mongodb://localhost/gitwrap-db'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});
module.exports = mongoose;
