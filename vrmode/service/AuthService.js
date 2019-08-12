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

            this.webAuth.client.userInfo(accessToken, (err, profile) => {
                if (profile) {
                    this.userProfile = profile;
                    console.log("user profile", this.userProfile);
                }
            });
        }
    },

    auth() {
        return new Promise((resolve, reject) => {
            const auth = CONST.auth;
            this.webAuth = new auth0.WebAuth({
                ...auth,
                redirectUri: window.location.href,
    
            });
    
            this.webAuth.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';
                    this.setSession(authResult);
                    this.getProfile();
                    console.log("Autorization done", );
                    resolve();
    
                } else if (err) {
                    console.log(err);
                    console.log(err.errorDescription);
                    window.location.hash = '';
                    reject(err);
                } else {
                    return this.webAuth.authorize();
                }
            });
        })
        
    }
}
