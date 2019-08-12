import broserCheckService from './service/BrowserCheckService.js'
//import CONST from './const.js';
//import './components/index.js';

function startup() {
    // try to fix device orientation and fullscreen mode
    if (screen.orientation.lock) {
        console.log('screen.orientation.lock');
        screen.orientation.lock('landscape');
    }
/*
    document.getElementById('toggleFullscreen')
        .addEventListener('click',
            (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
*/
    // check browser
    if (broserCheckService.isARAvailable()) {
        /*
        Promise.all(
                [
                    import('./service/AuthService.js').then(v => v.default),
                    import('./service/SocketService.js').then(v => v.default)
                ]
            )
            .then(([authService, socketService]) => {
                console.log("boot");
                /*
                authService.auth()
                    .then(socketService.connect.bind(socketService))
                    .then(() => {
                        return Promise.all([
                            import('./service/RegisterComponentService.js').then(v => v.default),
                            import('./service/VoteService.js').then(v => v.default),
                            import('./components/scene/SceneService.js').then(v => v.default)
                        ]);
                    })
                    .then(([registerComponentService, voteService, sceneService]) => {
                        setTimeout(() => {

                            const tmpl = document.querySelector('#tmpl-scene');
                            document.body.appendChild(document.importNode(tmpl.content, true));

                            const p = document.querySelector('.poster');
                            const s = document.querySelector('a-scene');
                            s.classList.remove("hidden");
                            p.parentNode.removeChild(p);
                            registerComponentService.register();
                            sceneService.start();
                            voteService.start()

                            document.dispatchEvent(new CustomEvent("ShowWaitRound"));

                        }, 2000)
                    })
                    .catch((err) => {
                        debugger;
                        console.error("Nothing works..WTF!!", err);
                        //location.href = CONST.APP_FALLBACK;
                    })
                    

            })
            .catch((err) => {
                debugger;
                console.error("Nothing works..WTF!!", err);
                // location.href = CONST.APP_FALLBACK;;
            })
            */
           console.log("boot 2");

    } else {
        location.href = CONST.APP_FALLBACK;
    }

}

window.addEventListener("load", startup, false);