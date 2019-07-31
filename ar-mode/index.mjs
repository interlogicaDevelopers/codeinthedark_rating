import broserCheckService from './service/BrowserCheckService.js'
import sceneComponent from './components/scene/Scene.js';
import CONST from './const.js';
import './components/index.js';
console.log("init");

// check browser
if (broserCheckService.isARAvailable()) {
    Promise.all([
        import('./service/RegisterComponentService.js'),
        import('./service/VoteService.js'),
        import('./service/SceneService.js'),
        import('./components/notification/NotificationService.js'),
        ]
    )
    .then(([registerComponentService, voteService, sceneService, notificationService]) => {

        setTimeout( () => {
            const p = document.querySelector('.poster');
            const s = document.querySelector('a-scene');
            s.classList.remove("hidden");
            p.parentNode.removeChild(p);
            registerComponentService.default.register();
            sceneService.default.start();
            voteService.default.start()
            notificationService.default.start();
            
            // simulate vote start
            setTimeout(() => {
                console.log("start vote");
                voteService.default.initSimulation();
            }, 3000)
        }, 3000)
       
    });

}  else {
    location.href = CONST.APP_FALLBACK;
}
