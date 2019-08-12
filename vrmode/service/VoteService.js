import CONST from '../const.js';

import voteComponent from '../components/vote/Vote.js'

export default {

    data: [],
    state: {
        currentRound: undefined,
        isFetching: false,
        votes: {}
    },

    start() {
        document.addEventListener("ShowVotePreview", this.showVotePreview.bind(this));
        document.addEventListener("SocketMessage", this.onSocketMessage.bind(this));
        document.addEventListener("ShowVoteConfirm", this.onShowVoteConfirm.bind(this))
    },

    vote(id) {
        console.log("vote", id)
        // TODO: call fetch and then resolve
        return Promise.resolve();
    },

    showVotePreview(evt) {
        const id = evt.detail.id;
        const detail = this.getPlayer(id);
        if (detail) {
            voteComponent.show(detail);
        }
    },

    onSocketMessage(evt) {
        debugger;
        const {type, data} = evt.detail.msg;

        if (type === 'VOTE_COUNTDOWN' && (!this.state.currentRound && !this.state.isFetching)) {
            this.fetchRound(data.round)
                .then(round => {
                    this.state.currentRound = round;
                    this.votePoll()
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },


    fetchRound(roundId) {
        this.state.isFetching = true;
        return fetch(`${CONST.host}/round/${roundId}`)
            .then(response => response.json())
            .then(round => {
                this.state.isFetching = false;
                return round;
            })
    },

    votePoll() {
        debugger;
        if (!this.state.votes[this.state.currentRound._id]) {
            document.dispatchEvent(
                new CustomEvent(
                    "StartVote",
                    {detail:{round: this.state.currentRound}}
                )
            );
        } else {
            document.dispatchEvent(
                new CustomEvent(
                    "ShowAlreadyVoted", 
                    {detail:{round: this.state.currentRound}}
                )
            );
        }
    },

    onShowVoteConfirm(evt) {
        const {data} = evt.detail;
        this.state.votes[this.state.currentRound._id] = data._id;
    },

    getPalyer(id) {
        if (!this.state.currentRound) return null;
        return this.state.currentRound.player.find(elm => elm._id === id);
    }

}