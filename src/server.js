const express = require('express');
const fs = require('fs');
const path = require('path');

const winston = require('winston');
const { format, transports, createLogger } = winston
require('winston-daily-rotate-file');

const ngApp = express();
const app = express();
const ROOT_NG = 'vrmode';
const ROOT_OLD = 'v1';

const NGAPP_PORT = 8000;
const APP_PORT = 8001;

const USE_HTTPS = true;

const logDirectory = path.join(__dirname, '..', 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new (transports.DailyRotateFile)({
            filename: `${logDirectory}/app-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            timestamp: (new Date()).toLocaleTimeString(),
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'debug'
        })
    ]
});


ngApp.use(express.static(path.resolve(__dirname, ROOT_NG)));
app.use(express.static(path.resolve(__dirname, ROOT_OLD)));

ngApp.use(express.json());

ngApp.post('/report', (req, res) => {
    
    const {userAgent, msg} = req.body;
    logger.warn({
        message: userAgent + ' - '+ msg
    });
    res.status(204).send();
});

ngApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, ROOT_NG, 'index.html'))
});


if (USE_HTTPS) {
    const https = require('https');

    const sk = path.resolve(__dirname, '..', 'certs', 'server.key');
    const sc = path.resolve(__dirname, '..', 'certs', 'server.cert');

    https.createServer({
        key: fs.readFileSync(sk),
        cert: fs.readFileSync(sc)
    }, ngApp).listen(NGAPP_PORT, () => {
        console.log(`AR CITD vote App is listening on port ${NGAPP_PORT}`);
    })

    https.createServer({
        key: fs.readFileSync(sk),
        cert: fs.readFileSync(sc)
    }, app).listen(APP_PORT, () => {
        console.log(`Simple CITD vote App is listening on port ${APP_PORT}`);
    })


} else {
    const http = require('http');

    http.createServer(ngApp).listen(NGAPP_PORT, () => {
        console.log(`AR CITD vote App is listening on port ${NGAPP_PORT}`);
    })

    http.createServer(app).listen(APP_PORT, () => {
        console.log(`Simple CITD vote App is listening on port ${APP_PORT}`);
    })

}
