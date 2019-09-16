import template from './AlreadyVoted.html.js'

export default {

    show() {
        const scene = document.querySelector('a-scene');
        scene.insertAdjacentHTML('beforeEnd', template());
        scene.querySelector('#directionalLight').setAttribute('visible', 'false');
    }
}