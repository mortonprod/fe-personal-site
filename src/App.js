import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    This class contains the full app. It will only render the initial shell of the app which is composed of navigation. 
    The content of the page is lazy loaded.
    Nav must be placed in router since it Links must be inside router component.
    Must render full content for SEO. Therefore, you must change async import to sync.
    react-snapshot will use a client(JSDOM) to browse your code served from its own server. Window object will be defined. 
    So check if running in jsdom and serve sync. Don't want to use webpack ignore so import removed 
    DONT INCLUDE ASYNC ROUTE JUST NOW WITH SERVER SIDE RENDERING
    DO NOT SET OVERFLOW:HIDDEN HERE SINCE THIS WILL STOP SCROLL EVENT FIRING.
    @class
*/
export default class App extends Component {
    constructor(){
        super();
        this.state = {isLoaded:false,serviceWorker:null}
        serviceWorker.subscribe(this.setState.bind(this));
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
    }
    render(){
        console.log("Service worker: " + JSON.stringify(this.state.serviceWorker));
	    return (
            <div>
                <Router>
                  <div>
                      <Switch>
                        <Route path="/" render={()=>{ return <Start isLoaded={this.state.isLoaded} serviceWorker={this.state.serviceWorker}/>}}/>
                        <Route path="/about" component={Home}/>
                      </Switch>
                      <Nav/>
                  </div>
				</Router>
            </div>
	    )
    }
};
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
	                Loaded
	            </h2>
	        )
	    }else{
	        installInfo = (
	            <h2>
	                Loading
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
	    return (
	        <div className={"start"}>
	            <div>
			        <h1>
			            Welcome 
			        </h1>
	                {installInfo}
                    {serviceComp}
	            </div>
	        </div>
	    )
    }
}