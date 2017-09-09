import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';
import Skills from "./skills";
import Start from "./start";
import Auth from "./auth";
import Nav from "./nav/nav";
import Home from "./home";
import Clouds from "./clouds";
import Contact from "./contact";
import Work from "./work";  
import peak from "./assets/peak.jpg";
import Snow from "./snow";
//import Contact from "./contact"; 


import './App.css';


/**
    If url matches test then we must be logged in so store token and get user information.
    @function
*/
const handleAuthentication = (location) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    Auth.handleAuthentication();
  }
}


/**
    We need to reset the scroll position manually on each route enter.
    This should be called when each main route mounts.
    History scroll restoration tells browser to set scroll position when using back and forward button.
    ------------
    Restore scroll will not work on some browsers. There is a polyfill if needed.
*/
function handlePageChange(history){
    if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
     window.scrollTo(0, 0);
     history.scrollRestoration = "auto";
    }
}


/** 
    This class contains the full app. It will only render the initial shell of the app which is composed of navigation. 
    Routing is dynamic with router v4. Therefore it is done during rendering. This is useful for things like variable screen sizes with multiple layouts.




    -----------------------------------------
    The content of the page is lazy loaded.(Not yet)
    Nav must be placed in router since it Links must be inside router component.
    Must render full content for SEO. Therefore, you must change async import to sync.
    react-snapshot will use a client(JSDOM) to browse your code served from its own server. Window object will be defined.(Not yet) 
    Store resize event here so we can pass it down to the other components.(Attach on each page so we do not re-render full app on state change)
    So check if running in jsdom and serve sync. Don't want to use webpack ignore so import removed. (Don't do this since checksum will not match on client and server rendering)
    MUST PASS LOADED AND SERVICE WORKER HERE LOAD AND SERVICE WORKER EVENT ONLY FIRED ONCE. (Don't do this since no state in top level app. Just attach to global namespace in start component)
    DONT INCLUDE ASYNC ROUTE JUST NOW WITH SERVER SIDE RENDERING
    DO NOT SET OVERFLOW:HIDDEN HERE SINCE THIS WILL STOP SCROLL EVENT FIRING.
    MUST PASS LOCATION AND KEY TO ROUTE OBJECT SO WE FADE IN AND OUT CORRECTLY.

    MUST STOP STATE CHANGE FROM RENDERING ROUTER AGAIN AND AGAIN SO CANCEL ALL CALLS TO RENDER. COMPONENTS UNDERNEATH SHOULD UPDATE THOUGH. 
    THEREFORE NO APP STATE!!!!
    CAN'T NAME ROOT DIRECTORY "/" SINCE WELCOME PAGE IS ALWAYS AN ACTIVE LINK?  
    @function
*/
export default function App(props) {
    return (
        <div className={"app"}>
            <Router>
                <Route component={Content}/>
			</Router>
        </div>
    )
};


/**
    Select start if root url. Otherwise render the main app.

    -----
    DO NOT PLACE ROUTE TRANSITION HERE SINCE IT WILL CALL ON ALL ROUTE CHANGES AND DISMOUNT BACKGROUND IMAGE AND CLOUDS.
    Idea:
    Use dynamic routing to only show nav when we have the app fully loaded. 
    Static routing would usually not allow this since routing is a constant throughout the rendering process.
    Authentication will cause page refresh so handle function will always be called.
    Issue:
    This could take up extra CPU cycles as we call loaded state variable to expose the new routes.
*/
let Content = ({ match, location, history })=>{
    handlePageChange(history);
    handleAuthentication(location);
    return(
        <div>
	        <Nav 
                Auth={Auth}
	            links={[
	                {name:"Welcome",location:"/"},
	                {name:"My Services",location:"/services"},
                    {name:"My Skills",location:"/skills"},
                    {name:"Contact Me",location:"/contact"},
	            ]}
	        />

            <Switch key={location.key} location={location}>
                <Route exact path={"/"} render={(props)=>{ return <Start {...props} Auth={Auth} />}} />
                <Route path={"/"} component={Main} />
            </Switch>
		    <footer className={"footer"}>
		        <h4> 2017 © Alexander Morton </h4> 
		        <strong> Freelance Web Designer and Developer</strong>
		        <a href={"alex@alexandermorton.co.uk"}> alex@alexandermorton.co.uk </a>
		    </footer>
        </div>

        
    )
}


let Main = ({ match, location, history }) => {
    return (
        <div className={"main"}>
            <Snow/>
            <img className={"main__peak"} src={peak} alt={"mountain peak"}/>
				<RouteTransition 
					pathname={location.pathname}
					atEnter={{ opacity: 0}}
					atLeave={{ opacity: 0}}
					atActive={{ opacity: 1}}
			    >
			        <Switch key={location.key} location={location}>
			            <Route exact path={"/services"} component={Home}/>
			            <Route exact path={"/work"} component={Work} />
			            <Route exact path={"/skills"} component={Skills} />
                        <Route exact path={"/contact"} render={(props)=>{ return <Contact {...props} Auth={Auth} />}} />
			         </Switch>
		        </RouteTransition>
        </div>
    )
}

