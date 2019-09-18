import voteService from './VoteService.js'
import sceneService from '../components/scene/service/SceneService.js'
import tmplService from '../components/scene/service/TmplService.js';
import browserCheckService from './BrowserCheckService.js';

import CONST from '../const.js';

export default {

    start() {
        tmplService.setup();
        
        sceneService.start()
            .then (() => {
                if (AFRAME.utils.device.isIOS()) {
                    try {
                        sceneService.setCameraOrientation(0);
                        // Object {name: "iOS", versionString: "12.1.4"} 
                        const os = browserCheckService.getOS();
                        var v = (os && os.versionString) ? os.versionString : "";
                        if(v && v!== "") {
                            v = v.replace(new RegExp('\\.', 'g'), '').replace(new RegExp('_', 'g'), '').substring(0,3);
                            if (parseInt(v) > 121) {
                                // check motion

                                const mt = setTimeout(() => {
                                    this.showMotionAlert();
                                    this.touchControls();
                                }, 2000);

                                window.addEventListener('devicemotion', function onDeviceMotion(event) {
                                    console.log('devicemotion');
                                    window.removeEventListener('devicemotion', this, false);
                                    clearTimeout(mt);
                                    const cam = document.querySelector('a-entity[camera]');
                                    const tce = cam.getAttribute('touch-look-controls').enabled;
                                    const t = document.getElementById('touchControls').querySelector('span');
                                    if (tce) {
                                        cam.setAttribute('touch-look-controls', 'enabled', false);
                                        t.textContent = 'TOUCH MODE';
                                    }
                                }, {once: true});

                            }
                        }
                    } catch (exc) {
                        this.touchControls();
                    }
                }
                voteService.start();
                this.initEvents();
                document.dispatchEvent(new CustomEvent("ShowWaitRound"));
            })
            .catch(err => {
                location.href = CONST.app_old;
            }) 
            
    },

    showMotionAlert() {
        const c = document.createElement('div');
        c.setAttribute('id', 'alertMessage');
        const p = document.createElement('p');
        const btn = document.createElement('button');
        btn.textContent = 'OK';
        btn.addEventListener('click', (evt) => {
            const m = document.getElementById('alertMessage');
            m.remove();

        });
        p.textContent = 'Enable motion sensors on your device and reload the page in order to use VR correctly, or continue to use touch in order to move in VR scene';
        c.appendChild(p);
        c.appendChild(btn);
        document.body.appendChild(c);
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