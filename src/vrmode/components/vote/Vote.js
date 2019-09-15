import voteService from '../../service/VoteService.js';

import template from './Vote.html.js'

export default {

    show(data) {
        const scene = document.querySelector('a-scene');
        scene.insertAdjacentHTML('beforeEnd', template(data));
        scene.querySelector("#layout-img-"+data._id).addEventListener('materialtextureloaded', 
        function(evt) {
            const id = evt.target.id;
            scene.querySelector("#"+id).setAttribute('visible', true);
            scene.querySelector("#layout-loading-"+id.replace('layout-img-', '')).remove();
        });

        scene.querySelector("#img-"+data._id).addEventListener('materialtextureloaded', 
            function(evt) {
                const id = evt.target.id;
                scene.querySelector("#"+id).setAttribute('visible', true);
                scene.querySelector("#loading-"+id.replace('img-', '')).remove();
            });
        this.initEvents();
        scene.querySelector('#directionalLight').setAttribute('visible', 'false');
    },

    initEvents() {
        const container = document.querySelector('#voteContainer');
        this.listeners = {
            'save': this.save.bind(this),
            'close': this.close.bind(this)
        };
        container.querySelector(".confirm").addEventListener("click",this.listeners.save);
        container.querySelector(".cancel").addEventListener("click", this.listeners.close);
    },

    save(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const {name, id} = evt.target.dataset;
        voteService.vote(id)
            .then( () => {
                this.current = null;
                this.removeVoteContainer();
                const evtConfirm = new CustomEvent("ShowVoteConfirm",{detail:{name, id}});
		        document.dispatchEvent(evtConfirm);
            })
            .catch ((resp) => {
                try {
                    const {err, detail} = resp;
                    document.dispatchEvent(new CustomEvent(err, detail));
                } catch (exc) {
                }
            })
    },

    close(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.current = null;
        this.removeVoteContainer();
    },

    removeVoteContainer() {
        document.querySelector('a-scene').querySelector('#directionalLight').setAttribute('visible', 'true');
        const el = document.querySelector('#voteContainer');
        el.querySelector(".confirm").removeEventListener("click",this.listeners.save);
        el.querySelector(".cancel").removeEventListener("click", this.listeners.close);
        this.listeners = null;
        el.remove();
    }
}
