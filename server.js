const express = require('express');
const fs = require('fs');
const path = require('path');

const ngApp = express();
const app = express();
const ROOT_NG = 'vrmode';
const ROOT_OLD = 'v1';

const NGAPP_PORT = 8000;
const APP_PORT = 8001;

const USE_HTTPS = false;

ngApp.use(express.static(path.resolve(__dirname, ROOT_NG)));
app.use(express.static(path.resolve(__dirname, ROOT_OLD)));

ngApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, ROOT_NG, 'index.html'))
});

const sk = path.resolve(__dirname, 'certs', 'server.key');
const sc = path.resolve(__dirname, 'certs', 'server.cert');

if (USE_HTTPS) {
    const https = require('https');

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
