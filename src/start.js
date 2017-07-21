import React, { Component } from 'react';
import Auth from "./auth";
import {Link} from 'react-router-dom';
import "./start.css";


/**
    Each route will be pre-rendered with react-snapshot and served to client.
    Lazy loading not implemented with SSR since we need sync code in server but async in client producing mismatch when js tries to attach event handlers.
    SSR rendering will mean information is available to users and SEO instantly. Lazy loading will only remove js download and scripting time.
    The starter page acts as the shell of the application along with the navigation. 
    @function

*/
export default function Start(props){
    console.log("profile start: " + props.profile);
    let installInfo = null;
    if(props.isLoaded){
        installInfo = (
            <div>
                <h2>
                    App Full Loaded
                </h2>
                <Link to={"/about"}>See About Me</Link>
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
    if(props.serviceWorker && props.serviceWorker.message){
        serviceComp = (
            <div>
                <span>{props.serviceWorker.message}</span>
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
    if(props.profile){
        wel = (
            <h1>
                Welcome {props.profile.name}
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