import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {serviceWorker} from "./workerService";
import worker from "./workerService";
import me from "./assets/me.png"
import {Link} from 'react-router-dom';
import Auth from "./auth";
import "./start.css";


/**
    Each route will be pre-rendered with react-snapshot and served to client.
    Lazy loading not implemented with SSR since we need sync code in server but async in client producing mismatch when js tries to attach event handlers.
    SSR rendering will mean information is available to users and SEO instantly. Lazy loading will only remove js download and scripting time.
    The starter page acts as the shell of the application along with the navigation. 
    @function

*/
export default class Start extends Component{
    constructor(){
        super()
        this.state = {isLoaded:false,serviceWorker:null,profile:null}
        window.addEventListener('load',  ()=> {
            this.setState({isLoaded:true});
            serviceWorker.subscribe(this.setState.bind(this));
            Auth.addSetState(this.setState.bind(this));
        });
    }
    render(){
	    console.log("profile start: " + this.state.profile);
	    let installInfo = null;
	    if(this.state.isLoaded){
	        installInfo = (
	            <div>
	                <h2>
	                    App Full Loaded
	                </h2>
	                <button onClick={worker.setPermissions.bind(this)}> Notify Me </button>
	            </div>
	        )
	    }else{
	        installInfo = (
	            <h2>
	                Loading...
	            </h2>
	        )
	    }
	    let serviceComp = null;
	    if(this.state.serviceWorker && this.state.serviceWorker.message){
	        serviceComp = (
	            <div>
	                <span>{this.state.serviceWorker.message}</span>
	            </div>
	        )
	        
	    }else{
	        serviceComp = (
	            <div>
	                <span>No reply from service worker</span>
	            </div>
	        )
	    }
	    let wel = null
	    if(this.state.profile){
	        wel = (
	            <h1>
	                Welcome {this.state.profile.name}
	            </h1>
	        )
	    }else{
	        wel = (
	            <h1>
	                Welcome Stranger
	            </h1>
	        )
	    }
	    let about = (
	    <div className={"start__me"}>
	        <img src={me} alt={"Me"}/>
		     <h2>
		        I'm a software developer based in Glasgow. 
		     </h2>
		     <Link to={"/about"}>
	            Learn more about me.
	        </Link>
	         <Link to={"/services"}>
	            Find out more about my services.
	        </Link>
	         <Link to={"/skills"}>
	            Learn about the tools I use.
	        </Link>
	         <Link to={"/work"}>
	            See what I've been working on recently. 
	        </Link>
	     </div>
	    ) 
	    return (
	        <div className={"start"}>
	             <Helmet>
	                 <title>Freelance Web Designer | Alexander Morton</title>
	                <meta name="description" content="I'm a business focused freelance web designer and developer. I help businesses of all sizes to build a effective online solution." />
	            </Helmet>
	            <div>
	                {wel}
	                {about}
	                <div className={"start__status"}>
	                    <h1>
	                        App Status
	                    </h1>
	                {installInfo}
	                {serviceComp}
	                </div>
	            </div>
	        </div>
	    )
    }
}