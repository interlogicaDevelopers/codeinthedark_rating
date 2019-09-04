import CONST from '../const.js';

export default {
    connect: () => {
        return new Promise((resolve, reject) => {
            const opt = {
                rememberUpgrade: true,
                transports: ['websocket'],
                secure: true, 
                rejectUnauthorized: false
            };
            const socket = io.connect(CONST.host); //, opt);
            
            socket.on('connect', () => {
                socket.on('message', (msg) => {
                    console.log(`Socker message`, msg);
                    document.dispatchEvent(new CustomEvent("SocketMessage",{detail:{msg}}));
                });
                resolve(true);
            });
            socket.on('connect_error', (m) => { 
                console.error(m);
                reject(m); 
            });
            socket.on('error', (err) => {
                reject(err);
            });
        })
    }
}