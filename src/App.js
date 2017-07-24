import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';
import * as _ from "lodash";
import Skills from "./skills";
import Profile from "./profile-react/src/App";
import Auth from "./auth";
import Start from "./start";
import Nav from "./nav";
import Home from "./home";
import Clouds from "./clouds";
import Work from "./work";  
import FadeBackground from "./fadeBackground"; 
import {serviceWorker} from "./workerService";

import './App.css';


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
    So check if running in jsdom and serve sync. Don't want to use webpack ignore so import removed. 
    MUST PASS LOADED AND SERVICE WORKER HERE LOAD AND SERVICE WORKER EVENT ONLY FIRED ONCE 
    DONT INCLUDE ASYNC ROUTE JUST NOW WITH SERVER SIDE RENDERING
    DO NOT SET OVERFLOW:HIDDEN HERE SINCE THIS WILL STOP SCROLL EVENT FIRING.
    MUST PASS LOCATION AND KEY TO ROUTE OBJECT SO WE FADE IN AND OUT CORRECTLY.
    WHY DOES LEXICAL SCOPE isStateAdded not keep the value set!!!!!!!!!????
    @class
*/
export default class App extends Component {
    /**
        Note isStateAdded will be called twice. Once before auth0 and once after auth0.
        Passing setState should only be done once. This is why it is placed in constructor.
        The app should deal with:
        1) Checking if we should show nav. 
        2) Checking if we have fully loaded. 
        3) Get service worker to update our state when it can.
        4) Get auth0 to udpate our state when it can. 
        @function.
    */
    constructor(props){
        super(props);
        if(window.innerWidth > this.props.thresholdX){
            this.state = {isShow:true,isLoaded:false,serviceWorker:null,profile:null,scrollTop:0}
        }else{
            this.state = {isShow:false,isLoaded:false,serviceWorker:null,profile:null,scrollTop:0}
        }
        window.addEventListener('load',  ()=> {
            this.setState({isLoaded:true});
        });
        this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
        this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
        serviceWorker.subscribe(this.setState.bind(this));
        Auth.addSetState(this.setState.bind(this));
    }
    resize(event){
        if(window.innerWidth > this.props.thresholdX){
            this.setState({isShow:true});
        }else{
            this.setState({isShow:false});
        }
    }
    /** 
        Scroll event updates y position of title and if squares should move in.
        Most scroll calculations done here. Cleaner code since we have once location for all scroll logic. 
        Reduces the impact on performance. No point in checking if state changed before updating state.
        Works out if squares should be exposed yet and passes scrollTop to other components for rerendering.
        ACCESS DOM HERE!
        ALWAYS SET SCROLLLEFT TO ZERO SO WE DO NOT SEE SCREEN WHERE TRANSFORM ELEMENT ENTER. OVERFLOW-X ONLY HIDES IT DOES NOT PREVENT SCROLL.
        @function
    */
    scroll(event){
        //if(document.body.scrollLeft !== 0 ){
            document.body.scrollLeft = 0;
        //}
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.setState({scrollTop:scrollTop});
    }
    /**
        Should only be able to click nav when below threshold
    */
    clickNav(){
        if(window.innerWidth < this.props.thresholdX){
            this.setState({isShow:!this.state.isShow});
        }
    }
    /**
        App mount called after child components mounted. But other installation scripts might be running so check if fully loaded as well.
        Ask about notification on startup. Also show at the beginning notification authorised.
    */
    componentDidMount(){
        window.addEventListener('resize',this.resize.bind(this));
        window.addEventListener('scroll', this.scroll.bind(this));
    }
    render(){
	    return (
            <div className={"app"}>
                <Router>
                  <div>
                    <Route render={({location, history, match}) => {
                    return (
                          <RouteTransition 
					        pathname={location.pathname}
					        atEnter={{ opacity: 0 }}
					        atLeave={{ opacity: 0 }}
					        atActive={{ opacity: 1 }}
					      >
                      <Switch key={location.key} location={location}>
                      <Route exact path={"/"} render={()=>{
                        return <Start isLoaded={this.state.isLoaded}  serviceWorker={this.state.serviceWorker} profile={this.state.profile}/>
                        }
                      }/>

                      <Route path={"/"} 
                        render={({location, history, match})=>{
                            return (
                              <RouteTransition 
	                            pathname={location.pathname}
	                            atEnter={{ opacity: 0}}
	                            atLeave={{ opacity: 0}}
	                            atActive={{ opacity: 1}}
	                          >
								<FadeBackground scrollTop={this.state.scrollTop}>
			                        <Clouds>
                                    <Switch key={location.key} location={location}>
			                            <Route exact path={"/services"} 
			                                render={(props)=>{
			                                    handleAuthentication(props);
			                                    return <Home scrollTop={this.state.scrollTop}/>
			                                }
			                            }/>
		                                <Route exact path={"/about"} component={Profile}/>
                                        <Route exact path={"/work"} 
                                            render={()=>{
                                                return <Work scrollTop={this.state.scrollTop}/>
                                            }}
                                        />

		                                <Route exact path={"/skills"} 
		                                    render={()=>{
		                                        return (
		                                            <Skills profile={this.state.profile} scrollTop={this.state.scrollTop}/>
		                                        )
		                                    }}
		                                />
                                     </Switch>
			                        </Clouds>
		                        </FadeBackground>
                            </RouteTransition>
                            )
                      }}/>
                      </Switch>
                    </RouteTransition>
                        )}
                    }/>
                      <Nav
                        profile={this.state.profile}
                        isShow={this.state.isShow}
                        click={this.clickNav.bind(this)}
                        links={[
                            {name:"Welcome",location:"/"},
	                        {name:"About Me",location:"/about"},
                            {name:"My Services",location:"/services"},
                            {name:"My Work",location:"/work"},
                            {name:"My Skills",location:"/skills"}
                        ]}
                        />
                        <footer className={"footer"}>
                            <h4> 2017 © Alexander Morton </h4> 
                            <strong> Freelance Web Designer and Developer</strong>
                            <a href={"hello@alexandermorton.co.uk"}> hello@alexandermorton.com </a>
                        </footer>
                  </div>
				</Router>
            </div>
	    )
    }
};

App.defaultProps = {
    thresholdX:800
}

