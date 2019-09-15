import template from './VoteConfirm.html.js'

export default {

    show(data) {
        const scene = document.querySelector('a-scene');
        scene.insertAdjacentHTML('beforeEnd', template(data));
        this.initEvents();
        scene.querySelector('#directionalLight').setAttribute('visible', 'false');
    },

    initEvents() {
        const container = document.querySelector('#voteConfirm');

        this.listeners = {
            'close': this.close.bind(this)
        };
        container.querySelector(".cancel").addEventListener("click", this.listeners.close);
    },

    close(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.current = null;
        this.removeContainer();
    },

    removeContainer() {
        document.querySelector('a-scene').querySelector('#directionalLight').setAttribute('visible', 'true');
        const el = document.querySelector('#voteConfirm');
        el.querySelector(".cancel").removeEventListener("click", this.listeners.close);
        this.listeners = null;
        el.remove();
    }
}