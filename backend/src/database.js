const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI ||'mongodb://localhost:27017/mernstack';

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
    autoIndex: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is Connected');
})