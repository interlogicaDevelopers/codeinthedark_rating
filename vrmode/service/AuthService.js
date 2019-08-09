import CONST from '../const.js';

export default {

    setSession (authResult) {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    },

    getProfile() {
        if (!this.userProfile) {
            const accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.log('Access Token must exist to fetch profile');
            }

            webAuth.client.userInfo(accessToken, (err, profile) => {
                if (profile) {
                    this.userProfile = profile;
                    console.log("user profile", this.profile);
                }
            });
        }
    },

    auth() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
        /*
        const auth = CONST.auth;
        this.webAuth = new auth0.WebAuth({
            ...auth,
            redirectUri: window.location.href,

        });

        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
                getProfile();
                document.dispatchEvent(new CustomEvent("AuthorizationDone"));

            } else if (err) {
                console.log(err);
                console.log(err.errorDescription);
                window.location.hash = '';
            } else {
                webAuth.authorize();
            }
        });
        */
    }
}
