export default {

    gifs: [
        'https://media.giphy.com/media/l0ExgO5m0tcnfUKyY/giphy.gif',
        'https://media.giphy.com/media/nKN7E76a27Uek/source.gif',
        'https://media.giphy.com/media/ihynxz6JxlmN2/source.gif',
        'https://media.giphy.com/media/WghwyziDDfR4s/source.gif',
        'https://media.giphy.com/media/Jalikml2XiUgw/giphy.gif',
        'https://media.giphy.com/media/55iSbCOrU9L5UrfI3L/source.gif',
        'https://media.giphy.com/media/l0NwuvFERvrjszjd6/source.gif',
        'https://media.giphy.com/media/nNH7LvI9NhaRq/giphy.gif',
        'https://media.giphy.com/media/3owypf6HrM3J7UTvAA/giphy.gif',
        'https://media.giphy.com/media/3o8doTsfXIV3ZTHA76/source.gif',
        'https://media.giphy.com/media/Jk4ZT6R0OEUoM/source.gif',
        'https://media.giphy.com/media/ZeB4HcMpsyDo4/source.gif',
        'https://media.giphy.com/media/3oxRmGNqKwCzJ0AwPC/source.gif',
        'https://media.giphy.com/media/EXHHMS9caoxAA/giphy.gif',
        'https://media.giphy.com/media/3oGRFvUEbJdLWlawLu/source.gif'
    ],

    getRandomIndex() {
        return (Math.trunc(Math.random() * this.gifs.length));
    },

    showAsset() {
        // src:url(${this.gifs[this.getRandomIndex()]})
        // TODO: set visible true only when texture loaded
        return `<a-entity id="gifContainer" geometry="primitive: plane; height: 3.6; width: 4"
                    position="0 -1.3 0.01" visible="true"
                    material="shader:gif; src:url(${this.gifs[0]})"></a-entity>`
    }
}

// this.getRandomIndex()