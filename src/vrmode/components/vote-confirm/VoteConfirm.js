import template from './VoteConfirm.html.js'

export default {

    show(data) {
        const scene = document.querySelector('a-scene');
        scene.insertAdjacentHTML('beforeEnd', template(data));
        scene.querySelector('#directionalLight').setAttribute('visible', 'false');
    }
}