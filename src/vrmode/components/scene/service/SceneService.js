import CONST from '../../../const.js';
import broserCheckService from '../../../service/BrowserCheckService.js';
import sceneComponent from '../Scene.js';
import voteComponent from './../../../components/vote/Vote.js';
import voteConfirmComponent from './../../../components/vote-confirm/VoteConfirm.js';
import alreadyVoteComponent from './../../../components/already-voted/AlreadyVoted.js';
import voteService from './../../../service/VoteService.js';

import gifService from '../service/GifService.js';
import templateWaitingRound from '../template/WaitingRound.html.js'
import templateVoteCountdown from '../template/VoteCountdown.html.js'
import templateRoundEnd from '../template/RoundEnd.html.js'
import templateReceivingResults from '../template/ReceivingResults.html.js'
import templateShowingResults from '../template/ShowingResults.html.js'
import templateRoundLayout from '../template/RoundLayout.html.js'
 
export default {

    STATUS: {
        WAIT_ROUND: 'WAIT_ROUND',
        VOTING: 'VOTING',
        ALREADY_VOTED: 'ALREADY_VOTED',
        VOTE_COUNTDOWN: 'VOTE_COUNTDOWN',
        ROUND_END_COUNTDOWN: 'ROUND_END_COUNTDOWN',
        RECEIVING_RESULTS: 'RECEIVING_RESULTS',
        SHOWING_RESULTS: 'SHOWING_RESULTS'
    },

    state: {
        currentState: ''
    },

    start() {
        return new Promise((resolve, reject) => {

            const tmpl = document.querySelector('#tmpl-scene');

            document.body.appendChild(document.importNode(tmpl.content, true));
            const s = document.querySelector('a-scene');
            s.classList.remove("hidden");

            const p = document.querySelector('.poster');
            p.parentNode.removeChild(p);
    
            if(AFRAME.utils.device.isMobile()) {
                const or = broserCheckService.getOrientation();
                if (or === broserCheckService.ORIENTATION.PORTRAIT) {
                    const cameraEl = document.querySelector('#rig');
                    cameraEl.setAttribute('rotation', '0 180 0');
                }
            }
    
            document.querySelector('a-scene').addEventListener('loaded', () => {
                document.addEventListener("ShowVotePreview", this.showVotePreview.bind(this));
                document.addEventListener("StartVote", this.onStartVote.bind(this));
                document.addEventListener("StopVote", this.onStopVote.bind(this));
                document.addEventListener("ShowVoteConfirm", this.onShowVoteConfirm.bind(this))
                document.addEventListener("ShowAlreadyVoted", this.onShowAlreadyVoted.bind(this))
                document.addEventListener("SocketMessage", this.onSocketMessage.bind(this));
                gifService.initAssets();
                resolve();
            })
        })

    },

    ////////////// SOCKET LISTENER

    onSocketMessage(evt) {
        const { type, data } = evt.detail.msg;
        switch (type) {
            case 'VOTE_COUNTDOWN':
                this.onVoteCountdown(data);
                break;

            case 'ROUND_END_COUNTDOWN':
                this.showStateTemplate(this.STATUS.ROUND_END_COUNTDOWN, templateRoundEnd(data));
                break;

            case 'RECEIVING_RESULTS':
                this.showStateTemplate(this.STATUS.RECEIVING_RESULTS, templateReceivingResults(data));
                break;
            
            case 'SHOWING_RESULTS':
                this.showStateTemplate(this.STATUS.SHOWING_RESULTS, templateShowingResults(data));
                break;

            default:
                if(this.state.currentState !== type) {
                    this.state.currentState = type;
                    this.showStateTemplate(this.STATUS.WAIT_ROUND, templateWaitingRound());
                }
        }

    },

    getSceneComponent() {
        return document.getElementById('main-scene');
    },

    onStartVote(evt) {
        const round = evt.detail.round;
        this.state.currentState = this.STATUS.VOTING;
        const frag = document.createDocumentFragment();
        const players = round.players;
        const positions = CONST.scene_positions.players['' + players.length];
        players.forEach((el, idx) => {
            el.index = idx;
            frag.appendChild(sceneComponent.createPlayer(el, idx, positions[idx]));
            frag.querySelector('#preview-'+el._id)
                .addEventListener('materialtextureloaded', 
                    function(evt) {
                        scene.querySelector("#"+evt.target.id).setAttribute('visible', true);
                    });
        })
        const scene = document.querySelector('a-scene');
        scene.querySelector('#directionalLight').setAttribute('visible', 'true');
        this.cleanEntityTemplate(scene, 'waiting');
        this.cleanEntityTemplate(scene, 'voted');
        scene.appendChild(frag);
        scene.insertAdjacentHTML('beforeEnd', templateRoundLayout(round));
        scene.querySelector("#imgRoundLayout")
            .addEventListener('materialtextureloaded', 
                function(evt) {
                    scene.querySelector("#roundLayout").setAttribute('visible', true);
                });
    },

    onStopVote(evt) {
        const scene = document.querySelector('a-scene');
        this.cleanScene(scene, 'voting');
        //TODO does SHOWING_RESULTS arrive after this?
    },

    onVoteCountdown(data) {
        const scene = document.querySelector('a-scene');
        if (this.state.currentState !== this.STATUS.VOTE_COUNTDOWN && !scene.querySelector('#countdown')) {
            this.state.currentState = this.STATUS.VOTE_COUNTDOWN;
            scene.insertAdjacentHTML('beforeEnd', templateVoteCountdown(data));
        } else if((this.STATUS.VOTE_COUNTDOWN + ' '+ this.STATUS.VOTING).includes(this.state.currentState)) {
            const n = scene.querySelector('#countdown');
            if (!n) return;
            n.setAttribute('value', data.missing);
        }
    },

    onShowVoteConfirm(evt) {
        this.state.currentState = this.STATUS.ALREADY_VOTED;
        const scene = document.querySelector('a-scene');
        this.cleanScene(scene, 'voting');
        voteConfirmComponent.show(evt.detail);
    },

    onShowAlreadyVoted(evt) {
        if (this.state.currentState !== this.STATUS.ALREADY_VOTED) {
            this.state.currentState = this.STATUS.ALREADY_VOTED;
            const scene = document.querySelector('a-scene');
            this.cleanEntityTemplate(scene, 'waiting');
            this.cleanEntityTemplate(scene, 'voted');
            this.cleanScene(scene, 'voting');
            alreadyVoteComponent.show();
        }
    },

    showVotePreview(evt) {
        const id = evt.detail.id;
        const detail = voteService.getPlayer(id);
        if (detail) {
            voteComponent.show({
                ...detail, 
                layout_url: voteService.state.currentRound.layout_url
            });
        }
    },

    onShowRoundCountdown(evt) {
        const { data } = evt.detail;
    },

    ////// PRIVATE

    dismissVoteConfirm() {
        const el = document.querySelector('#voteConfirm');
        el.parentElement.removeChild(el);
    },

    showStateTemplate(type, tmpl) {
        if (this.state.currentState !== type) {
            this.state.currentState = type;
            const scene = document.querySelector('a-scene');
            this.cleanEntityTemplate(scene, 'waiting');
            this.cleanEntityTemplate(scene, 'voting');
            this.cleanScene(scene, 'voted');
            this.renderTemplate(scene, tmpl);
        }
    },

    renderTemplate(scene, tmpl) {
        scene.querySelector('#directionalLight').setAttribute('visible', 'false');
        scene.insertAdjacentHTML('beforeEnd', tmpl);
    },

    cleanScene(scene, status) {
        this.cleanEntityTemplate(scene, status);
        scene.querySelectorAll("[vote-marker]")
            .forEach(el => el.parentElement.removeChild(el));

        scene.querySelectorAll("#voteContainer")
            .forEach(el => el.parentElement.removeChild(el));

        scene.querySelectorAll("#voteConfirm")
            .forEach(el => el.parentElement.removeChild(el));
    },

    cleanEntityTemplate(scene, status) {
        scene.querySelectorAll(`[data-status='${status}']`)
            .forEach(el => el.parentElement.removeChild(el));
    },


}