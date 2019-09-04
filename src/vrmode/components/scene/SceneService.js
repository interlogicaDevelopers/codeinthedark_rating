import CONST from '../../const.js';
import sceneComponent from './Scene.js';

import templateVoteConfirm from './VoteConfirm.html.js'
import templateWaitingRound from './WaitingRound.html.js'
import templateAlreadyVoted from './AlreadyVoted.html.js'
import templateVoteCountdown from './VoteCountdown.html.js'
import templateRoundEnd from './RoundEnd.html.js'
import templateReceivingResults from './ReceivingResults.html.js'
import templateShowingResults from './ShowingResults.html.js'
import templateRoundLayout from './RoundLayout.html.js'
 
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
        document.addEventListener("StartVote", this.onStartVote.bind(this));
        document.addEventListener("StopVote", this.onStopVote.bind(this));
        document.addEventListener("ShowVoteConfirm", this.onShowVoteConfirm.bind(this))
        /*document.addEventListener("ShowWaitRound", this.onShowWaitRound.bind(this))
        document.addEventListener("ShowRoundCountdown", this.onShowRoundCountdown.bind(this))
        */
        document.addEventListener("ShowAlreadyVoted", this.onShowAlreadyVoted.bind(this))
        document.addEventListener("SocketMessage", this.onSocketMessage.bind(this));
    },

    ////////////// SOCKET LISTENER

    onSocketMessage(evt) {
        const { type, data } = evt.detail.msg;
        console.log('SceneService.onSocketMessage', type, data);
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
        })
        const scene = document.querySelector('a-scene');
        scene.querySelector('#directionalLight').setAttribute('visible', 'true');
        this.cleanEntityTemplate(scene, 'waiting');
        this.cleanEntityTemplate(scene, 'voted');
        scene.appendChild(frag);
        scene.insertAdjacentHTML('beforeEnd', templateRoundLayout(round));
        scene.flushToDOM(true);

        // temporary test
        /*
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent("StopVote"));
        }, 5000)
        */
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
            scene.flushToDOM(true);
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
        this.renderTemplate(scene, templateVoteConfirm(evt.detail));
        scene.flushToDOM(true);
    },

    onShowAlreadyVoted(evt) {
        if (this.state.currentState !== this.STATUS.ALREADY_VOTED) {
            this.state.currentState = this.STATUS.ALREADY_VOTED;
            const scene = document.querySelector('a-scene');
            this.cleanEntityTemplate(scene, 'waiting');
            this.cleanEntityTemplate(scene, 'voted');
            this.cleanScene(scene, 'voting');
            this.renderTemplate(scene, templateAlreadyVoted());
            scene.flushToDOM(true);
        }
    },

    onShowRoundCountdown(evt) {
        const { data } = evt.detail;
        console.log('sceneService.onShowRoundCountdown', data);
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
            scene.flushToDOM(true);
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