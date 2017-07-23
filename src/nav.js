import React from 'react';
import {Link} from 'react-router-dom';
import Share from "./share";
import Account from "./account";
import menu from "./assets/menu.svg";
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
    if(props.isShow){ 
	    return (
	        <nav onClick={props.click}  className={"nav"}>
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
	                <Account profile={props.profile}/>
	            </div>
	        </nav>
	    )
    }else{
        return (
            <img onClick={props.click} src={menu} className={"nav__button"} alt="Menu Button"/>
        )
    }
}

Nav.defaultProps ={
    title:"Alexander Morton",
    links:[
        {name:"about",location:"/about"}
    ]
}