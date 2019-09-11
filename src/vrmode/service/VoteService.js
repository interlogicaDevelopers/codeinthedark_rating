import CONST from '../const.js';
import authService from './AuthService.js';
import voteComponent from '../components/vote/Vote.js';

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
        return new Promise((resolve, reject) => {
            const voteURL = CONST.host + '/vote/' + this.state.currentRound._id + '/' + id;
    
            fetch(voteURL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uuid: authService.userProfile.sub
                    })
                })
                .then(resp => {
                    if (resp.status === 200) {
                        this.state.votes[this.state.currentRound._id] = +new Date();
                        resolve(id);
                    } else {
                        reject({err: 'ShowAlreadyVoted', detail:{round: this.state.currentRound}});
                    }
                });
        })
    },

    showVotePreview(evt) {
        const id = evt.detail.id;
        const detail = this.getPlayer(id);
        if (detail) {
            voteComponent.show({
                ...detail, 
                layout_url: this.state.currentRound.layout_url
            });
        }
    },

    onSocketMessage(evt) {
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
        } else if (type !== 'VOTE_COUNTDOWN' && this.state.currentRound) {
            delete this.state.currentRound;
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
        this.state.votes[this.state.currentRound._id] = evt.detail.id;
    },

    getPlayer(id) {
        if (!this.state.currentRound) return null;
        return this.state.currentRound.players.find(elm => elm._id === id);
    }

}