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
//import Nav from "./nav/dist/index";
//import  "./nav/dist/index.css";
import Nav from "@mortonprod/react-nav-component";
import "@mortonprod/react-nav-component/dist/index.css";
import Home from "./home";
import Clouds from "./clouds";
import Contact from "./contact";
import Work from "./work";  
import peak from "./assets/peak.jpg";
import Snow from "./snow";
import isIE from "./isIE";
import asyncComponent from "./asyncComponent";


import alignRight from "./assets/alignment-rightSide.png";
import alignBigger from "./assets/alignmentBigger.png";
import scatterDown from "./assets/scatterDownZProjection.png";
import scatterXYZ from "./assets/scatteringProjectionXYZ.png";


import beame3b1 from "./assets/beamE3B1-1.png";
import beame5b1 from "./assets/beamE5B1-1.png";
import chie5b1 from "./assets/chi2E5B1-1.png";
import drmean from "./assets/dr-mean-all-pT-GA-Log-1.png";

import certbot from "./assets/cerbot.png";
import code from "./assets/code.jpeg";

import network from "./assets/006-network.svg";
import like from "./assets/004-like.svg";
import star from "./assets/003-star.svg";

import timepix from "./assets/timepix.jpg";
import lhcb from "./assets/lhcb.jpg";

import vhstuff from "./assets/VHstuff.png";
import vhcutsstuff from "./assets/vhcutsstuff.png";

import mcsimulation from "./assets/moreImages/MC-simulation-truthEvent-1.jpg";
import xresidual from "./assets/moreImages/21XResidual-1.jpg";
import plane from "./assets/moreImages/241-plane2ExcludeXRes2D-1.jpg";
import doublet from "./assets/moreImages/DoubletCenDist-442-1.jpg"

import router from "./assets/moreImages/router.jpg"
import router2 from "./assets/moreImages/router2.jpg"

import blog from "./assets/moreImages/blog.jpg"
import blog2 from "./assets/moreImages/blog2.jpg"
import nginx from "./assets/moreImages/nginx.jpg"










import './App.css';
const AsyncGallery = asyncComponent(() => import('./gallery'));


let items=[
  {
      title:"Upgrade of the ATLAS Detector",
      information:"Track fitting and semiconductor physics",
      problem:"Characterise irradiated semi-conductor strip sensors for the upgrade of the ATLAS detector. These strip sensors must perform after being highly irradiated by the LHC beam. Therefore their performance over their lifetime must be determined.",
      solution: "First the irradiated sensors capacitance, induction and other electrical properties was determined using data analysis tools. Next GBL was integrated into EUTelescope, it aims to allow the same procedure to fit tracks from a plethora of different devices, geometric setups and environmental changes. This includes complex pixel arrangements, magnetic fields and arbitrary device orientations. ",
      skillSet:["C++","Linear Algebra","Bash","Solid State Physics"],
      pics:[xresidual,plane,doublet],
      link:"http://eprints.gla.ac.uk/120050/",
      linkTitle:"Read Paper"

   },
     {
      title:"Exotic Particle Physics",
      information:"Resolving high energy Higgs bosons.",
      problem:"Determine the resolvability of hadronic jets, decaying to bottom quarks, produced from high energy Higgs.",
      solution:"The highly boosted decay products of the Higgs will often be unresolved. Therefore, the use of variable-R jets is ideal to resolve the deposited energy from the bb decay products. This is compared to the anti-kt algoritm.",
      skillSet:["C++","Python","Statistics"],
      pics:[vhstuff,vhcutsstuff,mcsimulation],
      link:"https://cds.cern.ch/record/2048180?ln=en",
      linkTitle:"Read Paper"

   },
   {
    title:"Upgrade of the LHCb Detector",
    information:"Charge collection efficiency measurements.",
    problem:"Determine the amount of signal an irradiated radial strip sensor produces when a high energy particle passes through it.",
    solution:"Data was taken at testbeam and desktop studies. The timing between the device under test and the telescope must be insync. I developed software to amalgamation telescope and DUT hits. I also wrote C++ programs to analyses prototype sensors. ",
    skillSet:["C++","Bash","Solid State Physics"],
    pics:[timepix,lhcb],
    link:"https://cds.cern.ch/record/1543139?ln=en#",
    linkTitle:"Checkout the paper."

 },
     {
      title:"Hosting Setup",
      information:"Setup nginx proxy server with certbot.",
      problem:"Link a bunch of sites to a single IP address. Secure with HTTPS with domain ownership certs.",
      solution:"Implement a docker droplet with nginx as a proxy server. Attach certbot as node on network.",
      skillSet:["Docker","Certbot","Bash","DNS","Digital Ocean"],
      pics:[certbot,nginx],
      link:"https://github.com/mortonprod/nginx-certbot",
      linkTitle:"Checkout my github."

   },
    {
      title:"React Review Component",
      information:"Create a versatile react review component.",
      problem:"Need to produce a new react component which will fit with the clients needs",
      solution:"Created a react component accessible from npm. This will take in images and review object to keep the component as extensible as possible",
      skillSet:["React","Webpack","Typescript","Nodejs"],
      pics:[network,like,star],
      link:"https://github.com/mortonprod/react-reviews",
      linkTitle:"Checkout my github."

   },
    {
      title:"Custom React Router",
      information:"Setup Auth0 and a navigation component within a react router.",
      problem:"Create a fully functioning npm package with react routing, authentication and navigation.",
      solution:"A npm package was created and deployed.",
      skillSet:["React","Webpack","Babel","Auth0"],
      pics:[router,router2],
      link:"https://github.com/mortonprod/react-nav-component",
      linkTitle:"Checkout my github."

   },
   {
      title:"Simple Blog",
      information:"Create a blog site using react and node.",
      problem:"Requested to create a website to hold a series of blog posts",
      solution:"I created a single page in which client could see and update there posts.",
      skillSet:["React","Webpack","Typescript", "Nodejs","Mongodb"],
      pics:[blog,blog2],
      link:"https://github.com/mortonprod/blog",
      linkTitle:"Checkout my github."

   },
   {
      title:"Boutique Website",
      information:"Create a website to sell boutique clothing.",
      problem:"Need to advertise boutique in the Glasgow area.",
      solution:"Setup a progressive web app to get the best results for the client.",
      skillSet:["React","Webpack","Babel","Auth0", "PWA"],
      pics:[],
      link:"https://github.com/mortonprod/react-nav-component",
      linkTitle:"Checkout Github."

   },
   {
      title:"Knitting Website.",
      information:"Create a website to sell knitting goods.",
      problem:"Need to advertise knitting in the Glasgow area.",
      solution:"Create a .net core MVC website.",
      skillSet:["c#",".net core"],
      pics:[],
      link:"https://github.com/mortonprod/knitting-website",
      linkTitle:"Checkout Github."

   }
];




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
    console.log("user agent: "+ isIE());
    if(isIE() || (!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom"))) {
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
function App(props) {
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
                    {name:"Gallery",location:"/gallery"},
                    {name:"Contact Me",location:"/contact"}
	            ]}
	        />

            <Switch key={location.key} location={location}>
                <Route exact path={"/"} render={(props)=>{ return <Start {...props} Auth={Auth} />}} />
                <Route path={"/"} component={Main} />
            </Switch>
		    <footer className={"footer"}>
		        <h4> 2017 © Alexander Morton </h4> 
		        <strong>Software Developer</strong>
		        <a href={"mailto:alex@alexandermorton.co.uk"}> alex@alexandermorton.co.uk </a>
		    </footer>
        </div>

        
    )
}


let Main = ({ match, location, history }) => {
    return (
        <div className={"main"}>
            <img className={"main__peak"} src={peak} alt={"mountain peak"}/>
			        <Switch key={location.key} location={location}>
			            <Route exact path={"/services"} component={Home}/>
			            <Route exact path={"/work"} component={Work} />
			            <Route exact path={"/skills"} component={Skills} />
                        <Route exact path={"/contact"} render={(props)=>{ return <div> <Snow/> <Contact {...props} Auth={Auth} /> </div>}} />
                        <Route exact path={"/gallery"} render={()=>{return <AsyncGallery items={items} />}}/>
			         </Switch>
        </div>
    )
}

export default App;

