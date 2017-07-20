import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import Skills from "./skills";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AnimatedWrapper from "./transition";
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
const HomeAnimate = AnimatedWrapper(Home);
const StartAnimate = AnimatedWrapper(Start);
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
    MUST PASS LOCATION AND KEY TO ROUTE OBJECT SO WE FADE IN AND OUT CORRECTLY.
    @class
*/
export default class App extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth > this.props.thresholdX){
            this.state = {isShow:true,profile:null}
        }else{
            this.state = {isShow:false,profile:null}
        }
        this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
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
                      <Route exact path={"/"} component={Start}/>
                      <Route exact path={"/about"} component={Home}/>
                      <Route exact path={"/skills"} render={()=>{
                        return (
                         <Skills data={[5,10,1,3]} size={[500,500]} />
                        )
                      }}/>

                      </Switch>
                      <Nav
                        isShow={this.state.isShow}
                        click={this.clickNav.bind(this)}
                        links={[
                            {name:"Home",location:"/"},
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
//
// <Route render={({ location }) => {
//    return <Routes location={location}/>
//  }}/>


               //         <Route exact path="/" children={({ match, ...rest }) => (
              //              <TransitionGroup component={firstChild}>
              //              {match && <HomeAnimate {...rest} />}
              //              </TransitionGroup>
              //          )}/>
              //          <Route exact path="/about" children={({ match, ...rest }) => (
               //             <TransitionGroup component={firstChild}>
              //              {match && <StartAnimate {...rest} />}
              //              </TransitionGroup>
              //          )}/>


const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};






/**

    Home key undefined???

*/
function Routes(props){
    let key = props.location.key
    return (
		<CSSTransition
        key={props.location.key}
		classNames="fade"
        timeout={{ enter: 5000, exit: 5000 }}
		>
			<Route exact path="/" location={props.location} key={key} render={(props)=>{ 
			    handleAuthentication(props);
			    return <Start/>}
			}/>
			<Route path="/about" location={props.location} key={key} component={Home}/>
		</CSSTransition>
    )
}



/**
    Each route will be pre-rendered with react-snapshot and served to client.
    Lazy loading not implemented with SSR since we need sync code in server but async in client producing mismatch when js tries to attach event handlers.
    SSR rendering will mean information is available to users and SEO instantly. Lazy loading will only remove js download and scripting time.
    The starter page acts as the shell of the application along with the navigation. 
    This can be a simple welcome message with telling the user when the app is full loaded.

*/
class Start extends Component{
    constructor(){
        super();
        this.state = {isLoaded:false,profile:null,serviceWorker:null}
        window.addEventListener('load',  ()=> {
            this.setState({isLoaded:true});
            worker.setPermissions();
        });
        Auth.getProfile((err, profile) => {
            if(!err){
                this.setState({profile:profile});
            }
        });
        serviceWorker.subscribe(this.setState.bind(this));
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
                    <span>{serviceWorker.message}</span>
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