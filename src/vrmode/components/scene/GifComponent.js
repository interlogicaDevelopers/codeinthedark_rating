export default {

    gifs: [
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

    renderGif() {
        return `<a-entity geometry="primitive:box;" material="shader:gif;src:url(http://giphy.com/embed/l0ExgO5m0tcnfUKyY);color:green;opacity:.8"></a-entity>`
    }
}