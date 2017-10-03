import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {serviceWorker} from "./workerService";
import worker from "./workerService";
import me from "./assets/myAvatar.png"
import {Link} from 'react-router-dom';
import "./start.css";


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
class Start extends Component{
    constructor(){
        super()
        if(hasLoaded){
            if(oldServiceWorker){
                this.state = {isLoaded:true,serviceWorker:oldServiceWorker,profile:null,isShowInfo:true}
            }else{
                this.state = {isLoaded:true,serviceWorker:null,profile:null,isShowInfo:true}
            }

        }else{
	        this.state = {isLoaded:false,serviceWorker:null,profile:null,isShowInfo:true}
	        window.addEventListener('load',  ()=> {
	            this.setState({isLoaded:true});
	            serviceWorker.subscribe(this.setState.bind(this));
	            hasLoaded = true;
	        });
        }
    }
    _removeInfo(){
        this.setState({isShowInfo:false})
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
        this.props.Auth.getProfile((err,profile)=>{
            if(!err){
                this.setState({profile:profile});
            }
            
        });
    }

    render(){
        let installInfo = null;
        if(this.state.isLoaded){
            installInfo = (
	            <h2>
	                App Full Loaded
	            </h2>
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
        let infoModifer
        if(this.state.isShowInfo){
            infoModifer= ""
        }else{
            infoModifer="start__info--remove"
        }

	    return (
	        <div className={"start"}>
	             <Helmet>
	                 <title>Software Developer | Alexander Morton</title>
	                <meta name="description" content="A software developer helping businesses and individuals solve problems by developing a range of software solutions." />
	            </Helmet>
                {wel}
                <img className={"start__pic"} src={me} alt={"Me"}/>
                <div className={"start__me"}>
                    <p>
                        I specialise in building <strong className={"start__strong"}>web applications</strong> and <strong className={"start__strong"}>data analysis</strong> tools.
                        I am well-versed in <strong className={"start__strong"}>C++</strong> and <strong className={"start__strong"}>Javascript</strong> but I know a variety of other languages and frameworks, see my <Link to={"/skills"}>skills</Link> for some of the highlights.
                        With a 1st class masters in theoretical physics. I have deep understanding of <strong className={"start__strong"}>mathematics</strong>, <strong className={"start__strong"}>physics</strong> and <strong className={"start__strong"}>numerical methods</strong>.
		            </p>
		            <p>
		                I would describe myself as <strong className={"start__strong"}>straight forward</strong>, <strong className={"start__strong"}>professional</strong> and <strong className={"start__strong"}>easy going</strong>.  However, I leave that up to you when you meet me.  If you would like to disagree <Link to={"/contact"}>contact me</Link>.
                        If you would like to quickly learn about me then check out my <a style={{color: '#42a5f5'}}  href={"/__cv"}>CV</a> or visit my <Link to={"/gallery"}>gallery</Link>.
		            </p>
	            </div>
                <div onClick={this._removeInfo.bind(this)} className={"start__info " + infoModifer}>
                    {installInfo}
                    {serviceComp}
                    <button onClick={worker.setPermissions.bind(this)}> Click for Notifications </button>
                </div>
	        </div>
	    )
    }
}

export default Start;