export default {

    fail_gifs: [
        'https://gifs.joelglovier.com/fail/cat-fail.gif',
        'https://gifs.joelglovier.com/fail/cat-mirror.gif',
        'https://gifs.joelglovier.com/fail/ferret-fail.gif',
        'https://gifs.joelglovier.com/fail/girls-swing.gif',
        'https://gifs.joelglovier.com/fail/mascot-spill.gif',
        'https://gifs.joelglovier.com/fail/monday-crash.gif',
        'https://gifs.joelglovier.com/fail/truck-pool.gif',
        'https://gifs.joelglovier.com/fail/wheelbarrel-dump.gif',
        'https://gifs.joelglovier.com/fail/robot-face-smash.gif',
        'https://gifs.joelglovier.com/omg/fresh-prince-omg.gif',
        'https://gifs.joelglovier.com/fu/fu-computer.gif',
        'https://gifs.joelglovier.com/fu/mr-bean.gif',
        'https://gifs.joelglovier.com/fu/stormtrooper.gif'
    ],

    thankyou_gifs: [
        'https://gifs.joelglovier.com/thank-you/thank-you-spice.gif',
        'https://gifs.joelglovier.com/thank-you/thank-you-zach.gif',
        'https://gifs.joelglovier.com/thank-you/thankyou-sandler-farley.gif',
        'https://gifs.joelglovier.com/dancing/ace-ventura-dance.gif',
        'https://gifs.joelglovier.com/dancing/happy-dance-forever.gif',
        'https://gifs.joelglovier.com/web-dev/family-guy-css.gif',
        'https://gifs.joelglovier.com/why-you/i-see-what-you-did-there.gif',
        'https://gifs.joelglovier.com/thumbs-up/suits-thumbsup.gif',
        'https://gifs.joelglovier.com/thumbs-up/shaggy-guy-thumbsup.gif',
        'https://gifs.joelglovier.com/thumbs-up/chuck-norris.gif',
        'https://gifs.joelglovier.com/thumbs-up/wayne-thumbs-up.gif',
        'https://gifs.joelglovier.com/thumbs-up/you-got-it-dude.gif'
    ],

    getRandomIndex() {
        return (Math.trunc(Math.random() * this.fail_gifs.length));
    },

    showAsset(type) {
        let src;
        switch(type) {
            case 'thankyou':
                src = `${this.thankyou_gifs[this.getRandomIndex()]}`;
                break;
            case 'fail':
                src = `${this.fail_gifs[this.getRandomIndex()]}`;
                break;
            default:
                src = `${this.fail_gifs[this.getRandomIndex()]}`;
        }

        // src:url(${this.gifs[this.getRandomIndex()]})
        // TODO: set visible true only when texture loaded
        return `<a-entity id="gifContainer" geometry="primitive: plane; height: 3.6; width: 4"
                    position="0 -1.3 0.01" visible="true"
                    material="shader:gif; src:url(${src})"></a-entity>`
    }
}

// this.getRandomIndex()
