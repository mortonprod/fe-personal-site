import React from "react";
import {Link} from 'react-router-dom';
import Auth from "./auth";
import googleC from './assets/Google_Color.svg';
import facebookC from './assets/Facebook_Color.svg';
import twitterC from './assets/Twitter_Color.svg';
import accountBox from './assets/accountBox.svg';
import "./account.css";


let auth = new Auth();

/**
    Will simply render account login or welcome and link to account page depending if auth has been authenticated..
    You will redirect on authentication so no need for additional state.
    Pass in as default props so we can add test for account sign in.
    @function
*/
const Account = function(props){
    let Acc = null;
    if(!props.auth.userProfile){
        Acc =  () => {
            return (
                <div className={"account"}>
                  <div onClick={props.auth.login} className="account__button">
                    <img src={accountBox} className="" alt="Account login button" />
                    <img src={facebookC} className="" alt="Facebook login button" />
                    <img src={googleC} className="" alt="google login button" />
                  </div>
                </div>
            )
        }
    }else{
        Acc =  () => {
            return (
                    <article className="account">
                      <div className={"account__welcome"}>
	                      <h3> Welcome </h3>
	                      <h4>{props.auth.userProfile.name} </h4>
                      </div>
                      <Link to={"/account"}>
                        <img src={props.auth.userProfile.picture} alt="profile link" />
                      </Link>
                      <button onClick={props.auth.logout}> logout </button>
                    </article>
                )
        }
    }
    return (    
        <Acc/>
    )


}

Account.defaultProps = {
    auth: new Auth()
}

export default Account;