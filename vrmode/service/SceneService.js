import fightService from './FightService.js'
import CONST from '../const.js';
import sceneComponent from '../components/scene/Scene.js';

export default {

    start() {
        document.addEventListener("StartVote", this.startVote.bind(this));
    },

    getSceneComponent() {
        return document.getElementById('main-scene');
    },

    startVote() {
        const frag = document.createDocumentFragment();
        const figthers = fightService.getFigthers()
        const positions = CONST.scene_positions.fighters['' + figthers.length];
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