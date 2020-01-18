const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);
const URI = process.env.MONGODB_URI ||'mongoDB://localhost/databasetest';

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