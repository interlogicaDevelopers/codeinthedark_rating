import broserCheckService from './service/BrowserCheckService.js'
import reportService from './service/ReportService.js'
import CONST from './const.js';
import './components/index.js';

function startup() {
    if(CONST.test && CONST.test.enabled === true) {
        const tdata = CONST.test;
        localStorage.setItem("expires_at", tdata.expires_at);
        localStorage.setItem("id_token", tdata.id_token);
        localStorage.setItem("access_token", tdata.access_token);
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
                        if (screen.orientation.lock) {
                            screen.orientation.lock('landscape')
                                .catch(err => console.log(err));
                        }
                        return Promise.all([
                            import('./service/RegisterComponentService.js').then(v => v.default),
                            import('./service/PageService.js').then(v => v.default)
                        ]);
                    })
                    .then(([registerComponentService, pageService]) => {
                        setTimeout(() => {
                            const tmpl = document.querySelector('#tmpl-scene');
                            document.body.appendChild(document.importNode(tmpl.content, true));
                            
                            const s = document.querySelector('a-scene');
                            s.classList.remove("hidden");
                            registerComponentService.register();
                            pageService.start();

                            const p = document.querySelector('.poster');
                            p.parentNode.removeChild(p);
                            
                            document.dispatchEvent(new CustomEvent("ShowWaitRound"));
                        }, 2000)
                    })
                    .catch((err) => {
                        reportService.report(err.message)
                        .then(() => {
                            location.href = CONST.app_old;
                        });
                    })
            })
            .catch((err) => {
                reportService.report(err.message)
                .then(() => {
                    location.href = CONST.app_old;
                });
            })
    } else {
        reportService.report('unsupported browser')
        .then(() => {
            location.href = CONST.app_old;
        });
    }
}

window.addEventListener("load", startup, false);
