import React,{Component} from "react";
import axios from "axios";
import Auth from "./auth";
import "./contact.css"

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
        this.state = {name:null,message:null};
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
		    idb.open('messages', 1, function(upgradeDb) {
		      upgradeDb.createObjectStore('outbox', { autoIncrement : true, keyPath: 'id' });
		    }).then(function(db) {
		      let transaction = db.transaction('outbox', 'readwrite');
		      return transaction.objectStore('outbox').put(this.message);
		    }).then(() => {
	            //this.setState({name:null,message:null});    
	            //return reg.sync.register('outbox');
		    }).catch(function(err) {
		      console.error(err); 
	          let formData = new FormData();
	          formData.append('name', this.state.name);
	          formData.append('message', this.state.message);
	          axios.post('/__contact',formData).then((res) => {
	            console.log("Message from post: " + JSON.stringify(res.data));
	          });
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
                <input required type="text" placeholder={"Your name..."} value={this.state.name} onChange={this.onChangeName}/>
            );
            
        }
        return(
            <section className={"contact"}>
                <form onSubmit={this._submit}>
                    {nameComp}
                    <textarea required rows="4" cols="50" type="text" value={this.state.message} placeholder={"Describe what you need..."} onChange={this._onChangemessage}/>
                    <button type="submit">Upload Edit To Product</button>
                </form>
            </section>
        )
    }
}