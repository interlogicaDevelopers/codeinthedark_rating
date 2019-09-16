import voteService from './VoteService.js'
import sceneService from '../components/scene/service/SceneService.js'
import tmplService from '../components/scene/service/TmplService.js';

import CONST from '../const.js';

export default {

    start() {
        tmplService.setup();
        sceneService.start()
        .then (() => {
            voteService.start();
            this.initEvents();
            document.dispatchEvent(new CustomEvent("ShowWaitRound"));
        })
    },

    initEvents() {
       
        document.getElementById('toggleFullscreen').addEventListener(
            'click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.fullscreen();
            }
        );

        document.getElementById('bugs').addEventListener(
            'click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                location.href = CONST.app_old;
            }
        );

        document.getElementById('touchControls').addEventListener(
            'click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.touchControls();
            }
        );

        document.querySelector('.action-bar').classList.remove('hidden');
        
    },

    fullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .catch(err => console.error(err))
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                .catch(err => console.error(err))
            }
        }
    },

    touchControls() {
        //TODO return in VR mode doesn't work, temp hack: reload page
        const cam = document.querySelector('a-entity[camera]');
        const tce = cam.getAttribute('touch-look-controls').enabled;
        const t = document.getElementById('touchControls').querySelector('span');
        if (tce) {
            cam.setAttribute('touch-look-controls', 'enabled', false);
            t.textContent = 'TOUCH MODE';
        } else {
            t.textContent = 'VR MODE';
            cam.setAttribute('touch-look-controls', 'enabled', true);
        }
        
    }

}