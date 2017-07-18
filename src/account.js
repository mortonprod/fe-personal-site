import React,{Component} from "react";
import {Link} from 'react-router-dom';
import Auth from "./auth";
import googleC from './assets/Google_Color.svg';
import facebookC from './assets/Facebook_Color.svg';
import twitterC from './assets/Twitter_Color.svg';
import accountBox from './assets/accountBox.svg';
import "./account.css";

/**
    Will simply render account login or welcome and link to account page depending if auth has been authenticated..
    Check if profile available everytime we mount.
    Pass in as default props so we can add test for account sign in.
    MUST CALL PROFILE HERE. SEEMS YOU NEED TO LET THE JS ENGINE TICK OVER A FULL STACK BEFORE ACCESSING THIS INFORMATION
    @function
*/
export default class Account extends Component{
    constructor(){
        super();
        this.state = {profile:null};
    }
    componentWillMount(){
	    Auth.getProfile((err, profile) => {
            if(!err){
	            this.setState({profile:profile});
            }
	    });
    }

    render(){
        let Acc = null;
	    if(!this.state.profile){
	        Acc =  () => {
	            return (
	                <div className={"account"}>
	                  <div onClick={Auth.login} className="account__button">
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
	                      <div>
	                          <h3> Welcome </h3>
	                          <h4>{this.state.profile.name} </h4>
	                      </div>
	                      <Link to={"/account"}>
	                        <img src={this.state.profile.picture} alt="profile link" />
	                      </Link>
	                      <button onClick={Auth.logout}> logout </button>
	                    </article>
	                )
	        }
	    }
	    return (    
	        <Acc/>
	    )
    }
}
