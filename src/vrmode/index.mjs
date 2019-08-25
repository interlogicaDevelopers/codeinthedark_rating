import broserCheckService from './service/BrowserCheckService.js'
import CONST from './const.js';
import './components/index.js';

function startup() {
    if(CONST.isTest) {
        localStorage.setItem("expires_at", "1566324641903");
        localStorage.setItem("id_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1EQTFNREpCUWpCRVF6WTJNRVJGUXpBMU5UTTJORGcxTnpGQlJUWXlRVVU0TlVZM1FrVTROQSJ9");
        localStorage.setItem("access_token", "rGGpIELIA9WB4CbUMzuGELyZ9sF922yj");
    }

    // try to fix device orientation and fullscreen mode
    if (screen.orientation.lock) {
        screen.orientation.lock('landscape')
            .catch(err => console.log(err));
    }

    // check browser
    if (broserCheckService.isARAvailable()) {
        
        Promise.all(
                [
                    import('./service/AuthService.js').then(v => v.default),
                    import('./service/SocketService.js').then(v => v.default)
                ]
            )
            .then(([authService, socketService]) => {
                
                authService.auth()
                    .then(socketService.connect.bind(socketService))
                    .then(() => {
                        return Promise.all([
                            import('./service/RegisterComponentService.js').then(v => v.default),
                            import('./service/PageService.js').then(v => v.default)
                        ]);
                    })
                    .then(([registerComponentService, pageService]) => {
                        setTimeout(() => {

                            const tmpl = document.querySelector('#tmpl-scene');
                            document.body.appendChild(document.importNode(tmpl.content, true));
                            const p = document.querySelector('.poster');
                            const s = document.querySelector('a-scene');
                            s.classList.remove("hidden");
                            p.parentNode.removeChild(p);
                            registerComponentService.register();
                            pageService.start();
                            document.dispatchEvent(new CustomEvent("ShowWaitRound"));
                        }, 2000)
                    })
                    .catch((err) => {
                        console.error("Nothing works...WTF!!", err);
                        location.href = CONST.APP_FALLBACK;
                    })
            })
            .catch((err) => {
                console.error("Nothing works...WTF!!", err);
                location.href = CONST.APP_FALLBACK;;
            })
    } else {
        location.href = CONST.APP_FALLBACK;
    }
}


window.addEventListener("load", startup, false);
