import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Share from "./share";
import Auth from "./auth";
import Account from "./account";
import menu from "./assets/menu.svg";
import * as _ from "lodash";
import "./nav.css";


/**
    Initialise static member to call authentication. 
    Once authentication complete redirect called with all components remounted. 
    Auth object will be updated with static member userProfile.
*/
//let auth = new Auth();


/** 
    Navigation component
    Contains links to all parts of app, social media and your account.
    Get profile when we mount.
    Initialise static member to call authentication. 
    Once authentication complete redirect called with all components remounted. 
    Auth object will be updated with static member userProfile.
    WE CAN'T SEEM TO GET THIS FROM THE STATIC MEMBER. RACE CONDITION MAYBE???
    @function
*/
export default class Nav extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth > props.thresholdX){
            this.state = {isShow:true,profile:null};
        }else{
            this.state = {isShow:false,profile:null}
        }
        this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
    }
    clickNav(){
        if(window.innerWidth < this.props.thresholdX){
            this.setState({isShow:!this.state.isShow});
        }
    }
    /**
        Auth getProfile called for each mount. Auth will check if we have the credentials before querying auth0. Save them bandwidth I suppose :-). 
    */
    componentDidMount(){
        window.addEventListener('resize',this.resize.bind(this));
        Auth.getProfile((err,profile)=>{
            if(!err){
                this.setState({profile:profile});
            }
            
        });
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resize.bind(this));
    }
    resize(event){
        if(window.innerWidth > this.props.thresholdX){
            this.setState({isShow:true});
        }else{
            this.setState({isShow:false});
        }
    }
    /**
        Activeclass name on navlinks does not seem to work with the router v4. Need to check, but use inline styles at the moment.
    */
    render(){
	    let links = this.props.links.map((el,i)=>{
	        return (
	            <NavLink activeStyle={{color: 'lightblue'}}  key={i} to={el.location}> {el.name} </NavLink>
	        )
	    })
	    if(this.state.isShow){ 
		    return (
		        <nav onClick={this.clickNav.bind(this)}  className={"nav"}>
		            <header className={"nav__header"}>
		                <h1>{this.props.title}</h1>
		            </header>
		            <div className={"nav__links"}>
		                {links}
		            </div>
		            <div className={"nav__share"}>
		                <Share/>
		            </div>
		            <div className={"nav__account"}>
		                <Account profile={this.state.profile} auth={Auth}/>
		            </div>
		        </nav>
		    )
	    }else{
	        return (
	            <img onClick={this.clickNav.bind(this)} src={menu} className={"nav__button"} alt="Menu Button"/>
	        )
	    }
    }
}

Nav.defaultProps ={
    title:"Alexander Morton",
    links:[
        {name:"about",location:"/about"}
    ],
    thresholdX:800
}
