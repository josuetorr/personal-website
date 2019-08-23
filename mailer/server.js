const http = require('http');
const app = require('./app');

// Check if the is an env variable for the port.
// By default, we listen on port 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => { console.log('listening of port: ', port) });