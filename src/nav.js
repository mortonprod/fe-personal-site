import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from "./auth";
import Share from "./share";
import Account from "./account";
import menu from "./assets/menu.svg";
import * as _ from "lodash";
import "./nav.css";

/** 
    Navigation component
    Contains links to all parts of app, social media and your account.
    @function
*/
export default class Nav extends Component {
    constructor(props){
        super(props);
        if(window.innerWidth > props.thresholdX){
            this.state = {isShow:true};
        }else{
            this.state = {isShow:false}
        }
        this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
        Auth.addSetState(this.setState.bind(this));
    }
    clickNav(){
        if(window.innerWidth < this.props.thresholdX){
            this.setState({isShow:!this.state.isShow});
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.resize.bind(this));
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
    render(){
	    let links = this.props.links.map((el,i)=>{
	        return (
	            <Link key={i} to={el.location}> {el.name} </Link>
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
		                <Account profile={this.props.profile}/>
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
