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

    setProfile() {
        return new Promise((resolve, reject) => {
            if (this.userProfile) resolve(this.userProfile)
            else {
                const accessToken = localStorage.getItem('access_token');
    
                if (!accessToken) {
                    reject('Access Token must exist to fetch profile');
                }
    
                this.webAuth.client.userInfo(accessToken, (err, profile) => {
                    if (profile) {
                        this.userProfile = profile;
                        resolve(profile);
                    } else {
                        reject("Missing user profile");
                    }
                });
            }

        })
    },

    auth() {
        return new Promise((resolve, reject) => {
            if(CONST.test && CONST.test.enabled === true) {
                this.userProfile = {sub: CONST.test.profile};
                resolve()
                return;
            }
            const auth = CONST.auth;
            this.webAuth = new auth0.WebAuth({
                ...auth,
                redirectUri: window.location.href,

            });
    
            this.webAuth.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';
                    this.setSession(authResult);
                    this.setProfile()
                    .then (() => {resolve();})
                    .catch(() => {
                        this.webAuth.authorize();
                    })

    
                } else if (err) {
                    window.location.hash = '';
                    reject(err);
                } else {
                    return this.webAuth.authorize();
                }
            });
        })
        
    }
}
