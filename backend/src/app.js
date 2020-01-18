const express = require('express');
const cors = require('cors');
const app = express();

//SETTINGS
app.set('port',process.env.PORT || 4000);


//MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/empleados', require('./routes/empleados'))
app.use('/api/maquinas', require('./routes/maquinas'))
app.use('/api/posiciones', require('./routes/posiciones'))

module.exports = app;
