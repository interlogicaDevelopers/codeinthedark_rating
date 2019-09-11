export default {

    gifs: [
        'https://media.giphy.com/media/WghwyziDDfR4s/source.gif',
        'https://giphy.com/embed/l0ExgO5m0tcnfUKyY',
        'https://giphy.com/embed/nKN7E76a27Uek',
        'https://giphy.com/embed/uRcoPXfNZUMp2',
        'https://giphy.com/embed/Jalikml2XiUgw',
        'https://giphy.com/embed/npUpB306c3EStRK6qP',
        'https://giphy.com/embed/l0NwuvFERvrjszjd6',
        'https://giphy.com/embed/nNH7LvI9NhaRq',
        'https://giphy.com/embed/cS83sLRzgVOeY',
        'https://giphy.com/embed/3owypf6HrM3J7UTvAA',
        'https://giphy.com/embed/3o8doTsfXIV3ZTHA76',
        'https://giphy.com/embed/Jk4ZT6R0OEUoM',
        'https://giphy.com/embed/ZeB4HcMpsyDo4',
        'https://giphy.com/embed/3oxRmGNqKwCzJ0AwPC',
        'https://giphy.com/embed/EXHHMS9caoxAA',
        'https://giphy.com/embed/3oGRFvUEbJdLWlawLu'
    ],

    getRandomIndex() {
        return 0;
        // return (Math.round(Math.random() * this.gifs.length - 1));
    },

    initAssets() {
        const frag = document.createDocumentFragment();

        for (let i=0, l = this.gifs.length; i<l; i++) {
            const elm = document.createElement('a-asset-item');
            elm.setAttribute('id', 'gift-'+i);
            elm.setAttribute('src', this.gifs[i]);
            frag.appendChild(elm);
        }
        document.querySelector('a-assets').appendChild(frag);
    },

    showAsset() {
        // ${this.getRandomIndex()}
        // <a-entity geometry="primitive: plane; height: 3.6; width: 4" position="0 -1.3 0.01" 
        // material="shader: gif; src: url(https://media.giphy.com/media/WghwyziDDfR4s/source.gif)"></a-entity></a-entity>
        return `<a-entity geometry="primitive: plane; height: 3.6; width: 4"
                    position="0 -1.3 0.01" 
                    material="shader:gif; src:url(${this.gifs[this.getRandomIndex()]})"></a-entity>`
    }
}