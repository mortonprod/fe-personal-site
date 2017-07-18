import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import Auth from "./auth";
import Nav from "./nav";
import asyncComponent from "./asyncComponent";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './App.css';
import "./start.css";
import Home from "./home";
import worker,{serviceWorker} from "./workerService";
const AsyncHome = asyncComponent(() => import('./home'));

let isJSDOM = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")

console.log("Is js dom: " + isJSDOM );
let routes = null;
if(isJSDOM){
    routes = (
        <Route path="/" component={Home}/>
    )
}else{
    routes = (
        <Route path="/" component={AsyncHome}/>
    )
}

/**
    If url matches test then we must be logged in so store token and get user information.
    @function
*/
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    Auth.handleAuthentication();
  }
}

/** 
    This class contains the full app. It will only render the initial shell of the app which is composed of navigation. 
    The content of the page is lazy loaded.
    Nav must be placed in router since it Links must be inside router component.
    Must render full content for SEO. Therefore, you must change async import to sync.
    react-snapshot will use a client(JSDOM) to browse your code served from its own server. Window object will be defined. 
    Store resize event here so we can pass it down to the other components.
    So check if running in jsdom and serve sync. Don't want to use webpack ignore so import removed 
    DONT INCLUDE ASYNC ROUTE JUST NOW WITH SERVER SIDE RENDERING
    DO NOT SET OVERFLOW:HIDDEN HERE SINCE THIS WILL STOP SCROLL EVENT FIRING.
    @class
*/
export default class App extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth > this.props.thresholdX){
            this.state = {isLoaded:false,serviceWorker:null,isShow:true,profile:null}
        }else{
            this.state = {isLoaded:false,serviceWorker:null,isShow:false,profile:null}
        }
        this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
        serviceWorker.subscribe(this.setState.bind(this));
    }
    resize(event){
        if(window.innerWidth > this.props.thresholdX){
            this.setState({isShow:true});
        }else{
            this.setState({isShow:false});
        }
    }
    clickNav(){
        this.setState({isShow:!this.state.isShow});
    }
    /**
        App mount called after child components mounted. But other installation scripts might be running so check if fully loaded as well.
        Ask about notification on startup. Also show at the beginning notification authorised.
    */
    componentDidMount(){
	    window.addEventListener('load',  ()=> {
            this.setState({isLoaded:true});
            worker.setPermissions();
	    });
        window.addEventListener('resize',this.resize.bind(this));
        Auth.getProfile((err, profile) => {
            if(!err){
                this.setState({profile:profile});
            }
        });
    }
    render(){
        console.log("Service worker: " + JSON.stringify(this.state.serviceWorker));
	    return (
            <div className={"app"}>
                <Router>
                  <div>
                      <Switch>
                        <Route path="/" render={(props)=>{ 
                            handleAuthentication(props);
                            return <Start profile={this.state.profile} isLoaded={this.state.isLoaded} serviceWorker={this.state.serviceWorker}/>}
                        }/>
                        <Route path="/about" component={Home}/>
                      </Switch>
                      <Nav
                        isShow={this.state.isShow}
                        click={this.clickNav.bind(this)}
                        links={[
	                        {name:"About Me",location:"/about"},
	                        {name:"My Work",location:"/work"},
	                        {name:"My Designs",location:"/design"},
	                        {name:"My Services",location:"/services"}]}
                        />
                  </div>
				</Router>
            </div>
	    )
    }
};

App.defaultProps = {
    thresholdX:800
}

/**
    Each route will be pre-rendered with react-snapshot and served to client.
    Lazy loading not implemented with SSR since we need sync code in server but async in client producing mismatch when js tries to attach event handlers.
    SSR rendering will mean information is available to users and SEO instantly. Lazy loading will only remove js download and scripting time.
    The starter page acts as the shell of the application along with the navigation. 
    This can be a simple welcome message with telling the user when the app is full loaded.

*/
class  Start extends Component{
    constructor(){
        super();
    }
    render(){
	    let installInfo = null;
	    if(this.props.isLoaded){
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
        if(this.props.serviceWorker && this.props.serviceWorker.message){
            serviceComp = (
                <div>
                    <span>{this.props.serviceWorker.message}</span>
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
        if(this.props.profile){
            wel = (
	            <h1>
	                Welcome {this.props.profile.name}
	            </h1>
            )
        }else{
            wel = (
                <h1>
                    Welcome Stranger
                </h1>
            )
        }
	    return (
	        <div className={"start"}>
	            <div>
                    {wel}
	                {installInfo}
                    {serviceComp}
	            </div>
	        </div>
	    )
    }
}