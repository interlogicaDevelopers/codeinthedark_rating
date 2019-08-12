// "http://admin.codeinthedark.interlogica.it:3000"
export default {
    host: 'http://localhost:3000',
    auth: {
        domain: 'codeinthedarkve.eu.auth0.com',
        clientID: '6jXh1PMXdoj6GQdFYH2EjAMoAyCxPxHf',
        responseType: 'token id_token',
        scope: 'openid',
    },
    scene_positions: {
        players: {
            '8': [
                {
                    position: '-7 2 -2',
                    rotation: '0 70 0'
                },
                {
                    position: '-6.5 2 -5',
                    rotation: '0 50 0'
                },
                {
                    position: '-4.5 2 -7',
                    rotation: '0 30 0'
                },
                {
                    position: '-2 2 -8',
                    rotation: '0 0 0'
                },
                {
                    position: '.5 2 -8',
                    rotation: '0 0 0'
                },
                {
                    position: '3.5 2 -8',
                    rotation: '0 -15 0'
                },
                {
                    position: '6 2 -6.5',
                    rotation: '0 -50 0'
                },
                {
                    position: '8 2 -4',
                    rotation: '0 -80 0'
                }
            ],
            '2': [
                {
                    position: '-2 2 -8',
                    rotation: '0 0 0'
                },
                {
                    position: '.5 2 -8',
                    rotation: '0 0 0'
                },
            ]
        }
    },
    APP_FALLBACK: 'http://localhost:8001/'
}