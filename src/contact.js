import React,{Component} from "react";
import axios from "axios";
import Auth from "./auth";
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "./contact.css"
//require("./store.js");

/**
    We don't want to import indexDB for server side rendering in js dom. Therefore use require and a conditional.
*/
let idb = null;
if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
    idb = require("idb");
}
export default class Contact extends Component{
    constructor(){
        super();
        this._submit = this._submit.bind(this);
        this._onChangeName = this._onChangeName.bind(this);
        this._onChangemessage = this._onChangemessage.bind(this);
        this.state = {name:null,message:null,email:null};
    }
    /**
        When the component mounts check for name and add to contact name if we have it.
    */
    componentDidMount(){
        Auth.getProfile((err,profile)=>{
            if(!err){
                this.setState({name:profile.name});
            }
        });
    }
    _onChangeName(e){
        this.setState({name:e.target.value})
    }
    _onChangeEmail(e){
        this.setState({email:e.target.value})
    }
    _onChangemessage(e){
        this.setState({message:e.target.value})
    }
    /**
        Implement indexDB storage so we can send out message offline. Use idb to implement indexDB with promises.
        Messages is the name of the store. Outbox is an object inside the store. 
        Transaction will store the message and return a promise when complete.
        Note we include a fallback if we can't connect to the service worker.
    */
    _submit(event){
        if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
			let formData = new FormData();
			formData.append('name', this.state.name);
            formData.append('message', this.state.message);
            formData.append('email', this.state.email);
            axios.post("/contact",formData).then((res) => {
                console.log("Contact recieved?: " + JSON.stringify(res.data));
            });
        }
    }
    render(){
        let nameComp = null;
        if(this.state.name){
            nameComp = (
                <h4>this.state.name</h4>
            );
        }else{
            nameComp = (
                <div>
	                <input required type="text" placeholder={"Your name..."} value={this.state.name} onChange={this.onChangeName}/>
	                 <input required type="text" placeholder={"Your email..."} value={this.state.email} onChange={this.onChangeEmail}/>
                 </div>
            );
            
        }
        return(
            <section className={"contact"}>
                <div className={"contact__gap"}/>
                <div className={"contact__container"}>
	                <h1>
	                    Send Me an Email
	                </h1>
	                <form className={"contact__form"} onSubmit={this._submit}>
	                    {nameComp}
	                    <textarea required rows="15" cols="100" type="text" value={this.state.message} placeholder={"Describe what you need..."} onChange={this._onChangemessage}/>
	                    <button type="submit">Send</button>
	                </form>
                </div>
            </section>
        )
    }
}