import auth0 from 'auth0-js';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';

let history = createHistory({
  forceRefresh: true
});

let auth = new auth0.WebAuth({
	domain: 'mortonprod.eu.auth0.com',
	clientID: 'eV7o6BUD3KDcNVFemzb3IUyyQRHyOu6H',
	redirectUri: 'http://localhost:3000/about',
	audience: 'https://mortonprod.eu.auth0.com/userinfo',
	responseType: 'token id_token',
	scope: 'openid profile'
});

/**
    Static utility class.
    Links to single instance of auth0 API through closure.
*/
export default class Auth {

  static login() {
    auth.authorize();
  };
  /**
    When called must be rerouted from auth0 after login. 
    Data will be passed via the url redirected.
    @function
  */
  static handleAuthentication() {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        Auth.setSession(authResult);
        history.replace('/about');
      } else if (err) {
        history.replace('/about');
        console.log(err);
      }
    });
  };
  /**
    Store session to auth0 so stay logged in and redirect to home.
    Once we start the session get user information.
    @function
  */
  static setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    if(typeof localStorage !=="undefined"){
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);

        
    }
    history.replace('/');
  };
  /**
    Delete tokens to logout.
    @function
  */
  static logout() {
    if(typeof localStorage !=="undefined"){
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('id_token');
	    localStorage.removeItem('expires_at');
    }
    // navigate to the home route
    history.replace('/');
  };
  /**
    Use token after sign in to query auth0 for user information. 
    Add functionality to query our database for more user information. If is does not exist then just add auth0 info.
    @function
  */
  static getProfile(cb) {
    if(typeof localStorage !=="undefined"){ //So we can render on the server
	    if(localStorage.getItem('access_token') !==null){
	        auth.client.userInfo(localStorage.getItem('access_token'), (err, profile) => {
                if(err){
                    console.log("Error: " + err);
                }
	            if (profile) {
                    Auth.userProfile = profile;
                    //Once we have the profile then add the name and email if it does not exist.
                    //if it does exist then return the products bought and looked at and add to profile information.
                    axios.post('/account',profile).then((res) => {
                        Auth.userProfile = Object.assign(profile,res.data); 
                        console.log("User profile: " + JSON.stringify(Auth.userProfile));
                        cb(err, profile);
                    }).catch((error)=>{
                        Auth.userProfile = profile;
                        cb(err,profile);
                    }); 
                }
	        });
	    }
    }
  };
    
  static isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    if(typeof localStorage !=="undefined"){
	    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	    return new Date().getTime() < expiresAt;
    }
  }

}
