import voteService from './VoteService.js'
import sceneService from '../components/scene/SceneService.js'

export default {

    start() {
        sceneService.start();
        voteService.start()

        document.getElementById('toggleFullscreen')
            .addEventListener('click',
                (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen()
                            .catch(err => console.error(err))
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen()
                            .catch(err => console.error(err))
                        }
                    }
                });
    }
}