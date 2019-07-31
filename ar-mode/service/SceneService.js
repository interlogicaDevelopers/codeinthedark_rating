import fightService from './FightService.js'
import CONST from '../const.js';
import sceneComponent from '../components/scene/Scene.js';

export default {

    start() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            // When ready, auto-scroll 1px to hide URL bar
            window.addEventListener("load", function () {
                // Set a timeout...
                setTimeout(function () {
                    // Hide the address bar!
                    window.scrollTo(0, 1);
                }, 0);
            });
        }
        document.addEventListener("StartVote", this.startVote.bind(this));
        // document.addEventListener("StopVote", this.stopVote.bind(this))
    },

    getSceneComponent() {
        return document.getElementById('main-scene');
    },

    startVote() {
        const frag = document.createDocumentFragment();
        const figthers = fightService.getFigthers()
        const positions = CONST.SCENE_POSITIONS.FIGHTERS['' + figthers.length];
        figthers.forEach((el, idx) => {
            el.index = idx;
            frag.appendChild(sceneComponent.createFighter(el, idx, positions[idx]));
        })
        const scene = document.querySelector('a-scene');
        scene.querySelector('#directionalLight').setAttribute('visible', 'true');
        scene.querySelectorAll("#waitingRound")
            .forEach(el => el.parentElement.removeChild(el));
        scene.appendChild(frag);
        scene.flushToDOM(true);
    }
}