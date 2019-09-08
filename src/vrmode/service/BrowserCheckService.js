export default {

    browsers: [
        'AppleWebKit/605',
        'Version/12.0',
        'Mozilla',
        'Chrome'
    ],

    ORIENTATION: {
        LANDSCAPE : 'landscape',
        PORTRAIT: 'portrait'
    },

    isARAvailable() {
        const ua = navigator.userAgent;
        return this.browsers.some( function(item) {
            return ua.indexOf(item) > -1;
        })
    },

    getOrientation() {
        if (window.screen.orientation) {
            const expr = /landscape/;
            return expr.test(window.screen.orientation.type) ? this.ORIENTATION.LANDSCAPE : this.ORIENTATION.PORTRAIT;
        } else if(window.matchMedia("(orientation: portrait)").matches ) {
            return this.ORIENTATION.PORTRAIT;
            
        } else if(window.matchMedia("(orientation: landscape)").matches ) {
            return this.ORIENTATION.LANDSCAPE;
        } else {
            return (window.innerHeight > window.innerWidth) ? this.ORIENTATION.PORTRAIT : this.ORIENTATION.LANDSCAPE;
        }
    }
}