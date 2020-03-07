require('dotenv').config();
const app = require('./app');
require('./database');

var fs = require('fs')
var https = require('https')



https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)

.listen(4000, function () {
  console.log('listening on port 4000! Go to https://localhost:3000/')
})

async function main () {
  await app.listen(4001);
  console.log('Server on port ', app.get('port'));
}

main()
