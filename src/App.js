import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';
import Skills from "./skills";
import Profile from "./profile-react/src/App";
import Start from "./start";
import Auth from "./auth";
import Nav from "./nav";
import Home from "./home";
import Clouds from "./clouds";
import Work from "./work";  
import FadeBackground from "./fadeBackground"; 


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
    We need to reset the scroll position manually on each route enter.
*/
function handlePageChange(history){
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
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

    MUST STOP STATE CHANGE FROM RENDERING ROUTER AGAIN AND AGAIN SO CANCEL ALL CALLS TO RENDER. COMPONENTS UNDERNEATH SHOULD UPDATE THOUGH. 
    THEREFORE NO APP STATE!!!!
    @function
*/
export default function App(props) {
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
                    handlePageChange(history);
                    return <Start/>
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
							<FadeBackground >
		                        <Clouds>
                                <Switch key={location.key} location={location}>
		                            <Route exact path={"/services"} 
		                                render={(props)=>{
                                            handleAuthentication(props);
                                            handlePageChange(history);
		                                    return <Home />
		                                }
		                            }/>
	                                <Route exact path={"/about"} component={Profile}/>
                                    <Route exact path={"/work"} 
                                        render={()=>{
                                            handlePageChange(history);
                                            return <Work />
                                        }}
                                    />

	                                <Route exact path={"/skills"} 
	                                    render={()=>{
                                            handlePageChange(history);
                                            return (
	                                            <Skills />
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
};

