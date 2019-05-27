const app = require('../src/app');
const debug = require('debug')('Everton:server');
const http = require('http');
const config = require('../config/config');

const port = normalizaPort(config.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('#################################################');
        console.log('###      Servidor rodando na porta: ' + port + '      ###');
        console.log('#################################################');
    }
});
server.on('error', onError);
server.on('listening', onListening);


function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        `Pipe ${port}` :
        `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit();
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        `pipe ${addr}` :
        `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}