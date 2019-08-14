import CONST from '../const.js';

export default {
    connect: () => {
        return new Promise((resolve, reject) => {
            const socket = io(CONST.host);
            
            socket.on('connect', () => {
                socket.on('message', (msg) => {
                    console.log(`Socker message`, msg);
                    document.dispatchEvent(new CustomEvent("SocketMessage",{detail:{msg}}));
                });
                resolve(true);
            });
            socket.on('error', (err) => {
                reject(err);
            });
        })
    }
}