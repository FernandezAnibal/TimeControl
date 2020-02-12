require('dotenv').config();
const https = require('https');
const fs = require('fs');


const app = require('./app');
require('./database');

async function main () {
    await https.createServer(
        {
            key: fs.readFileSync('./key.pem'), 
            cert: fs.readFileSync('./cert.pem'),
            passphrase: 'moldintec2020',
            requestCert: false,
            rejectUnauthorized: false
        },
        app).listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}

main();