import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Share from "./share";
import Account from "./account";
import "./nav.css";

/** 
    Navigation component
    Contains links to all parts of app, social media and your account.
    @function
*/
export default function Nav(props) {
    let links = props.links.map((el,i)=>{
        return (
            <Link key={i} to={el.location}> {el.name} </Link>
        )
    }) 
    return (
        <nav className={"nav"}>
            <header className={"nav__header"}>
                <h1>{props.title}</h1>
            </header>
            <div className={"nav__links"}>
                {links}
            </div>
            <div className={"nav__share"}>
                <Share/>
            </div>
            <div className={"nav__account"}>
                <Account/>
            </div>
        </nav>
    )
}

Nav.defaultProps ={
    title:"Alexander Morton",
    links:[
        {name:"about",location:"/about"}
    ]
}