import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {serviceWorker} from "./workerService";
import worker from "./workerService";
import me from "./assets/myAvatar.svg"
import {Link} from 'react-router-dom';
import Auth from "./auth";
import "./start.css";


let auth = new Auth();
/**
    isloaded is for the first time loaded. hasloaded is stored even if we leave welcome page and come back.
*/
let hasLoaded = false;
/**
    Also store last service worker message to reset if we route away and then back to this route.
*/
let oldServiceWorker = null;


/**

    This component is a small info page for users to read while the app is loading.
    The app is connected to the serviceWorker and onLoad event. Note that we will always not be loaded when we mount this component FOR THE FIRST TIME.
    However, if we change route and come pack we will not call load again. Therefore we need to store a load variable which says we have loaded on rerouting.
    -----
    Each route will be pre-rendered with react-snapshot and served to client.
    Lazy loading not implemented with SSR since we need sync code in server but async in client producing mismatch when js tries to attach event handlers.
    SSR rendering will mean information is available to users and SEO instantly. Lazy loading will only remove js download and scripting time.
    The starter page acts as the shell of the application along with the navigation. 
    @function

*/
export default class Start extends Component{
    constructor(){
        super()
        if(hasLoaded){
            if(oldServiceWorker){
                this.state = {isLoaded:true,serviceWorker:oldServiceWorker,profile:null}
            }else{
                this.state = {isLoaded:true,serviceWorker:null,profile:null}
            }

        }else{
	        this.state = {isLoaded:false,serviceWorker:null,profile:null}
	        window.addEventListener('load',  ()=> {
	            this.setState({isLoaded:true});
	            serviceWorker.subscribe(this.setState.bind(this));
	            hasLoaded = true;
	        });
        }
    }
    /**
        Store the old message for when we route back. Don't want to start with state null again for service worker.
    */
    componentWillUpdate(nextProps, nextState){
        if(nextState.serviceWorker){
            oldServiceWorker = nextState.serviceWorker;
        }
    }

    /**
        Call Auth.getProfile for each mount. If we are not authenticated return error before querying server.
    */
    componentDidMount(){
        Auth.getProfile((err,profile)=>{
            if(!err){
                this.setState({profile:profile});
            }
            
        });
    }

    render(){
	    let wel = null
	    if(this.state.profile){
	        wel = (
                <div className={"start__welcome"}>
		            <h1>
		                Welcome {this.state.profile.name}
		            </h1>
		             <h2>
		                I'm Alexander Morton, a software developer based in Glasgow. 
		             </h2>
                 </div>
	        )
	    }else{
	        wel = (
                <div className={"start__welcome"}>
		            <h1>
		                Welcome Stranger
		            </h1>
		             <h2>
		                I'm Alexander Morton, a software developer based in Glasgow. 
		             </h2>
                 </div>
	        )
	    }
	    return (
	        <div className={"start"}>
	             <Helmet>
	                 <title>Freelance Web Designer | Alexander Morton</title>
	                <meta name="description" content="I'm a business focused freelance web designer and developer. I help businesses of all sizes to build a effective online solution." />
	            </Helmet>
                {wel}
		        <div className={"start__me"}>
		            <img src={me} alt={"Me"}/>
		            <p>
		                I’m Alexander Morton and my passion is designing all types of software, see my services for some of the highlights.
		            </p>
		            <p>
		                With a background in theoretical and experimental particle physics. I have deep understanding of mathematics, physics and computer science. This allows me to easily move between many different stacks and frameworks.
		            </p>
		            <p>
		                I went freelance in 2016 and haven't looked back. I love creating beautiful and fully functional web applications. I only produce the best the web can provide. Giving your business the best chance to succeed
		            </p>
		            <p>
		                I would describe myself as straight forward, professional and easy going.  However, I leave that up to you when you meet me.  If you would like to disagree contact me.
		            </p>
	            </div>
	        </div>
	    )
    }
}