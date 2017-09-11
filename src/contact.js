import React,{Component} from "react";
import axios from "axios";
import Helmet from 'react-helmet';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "./contact.css"
const store = window.store;

/**
    We don't want to import indexDB for server side rendering in js dom. Therefore use require and a conditional.
*/
const idb = window.idb;
/**
    We need a flag to indicate that our name has come from profile and should not be updated.
*/
class Contact extends Component{
    hasProfile = false;
    /**
        Can't initialise state with null since this is used as value for input.
    */
    constructor(){
        super();
        this._submit = this._submit.bind(this);
        this._onChangeName = this._onChangeName.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangemessage = this._onChangemessage.bind(this);
        this.state = {name:"",message:"",email:""};
    }
    /**
        When the component mounts check for name and add to contact name if we have it.
    */
    componentDidMount(){
        this.props.Auth.getProfile((err,profile)=>{
            if(!err){
                this.hasProfile = true;
                this.setState({name:profile.name,email:profile.email});
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
        Transaction will store the message and return a promise when complete. Then it will call(register) a sync event with the tag outbox.
        The sync event in the service worker will then run. If something goes wrong then just send the message. 

    */
    _submit(event){
        if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
            let message = {name:this.state.name,email:this.state.email,message:this.state.message};
            navigator.serviceWorker.ready.then(function(reg) {
                if ('sync' in reg) {
		            store.outbox('readwrite').then(function(outbox) {
		                return outbox.put(message);
		            }).then(function() {
			            return reg.sync.register('outbox');
		            }).catch(function(messages){
			            axios.post("/contact",message).then((res) => {
			                console.log("Contact recieved?: " + JSON.stringify(res.data));
			            });
		            })
                }else{
                }
            }).catch(()=>{
                    axios.post("/contact",message).then((res) => {
                        console.log("Contact recieved?: " + JSON.stringify(res.data));
                    });
            });
        }
    }
    /**
        Email might not be included from auth so don't include
    */
    render(){
        let nameComp = null;
        if(this.hasProfile){
            nameComp = (
                <div>
	                <h4 className={"contact__name"} >{this.state.name}</h4>
                    <input required type="text" placeholder={"Your email..."} value={this.state.email} onChange={this._onChangeEmail}/>
                </div>
            );
        }else{
            nameComp = (
                <div>
	                <input required email type="text" placeholder={"Your name..."} value={this.state.name} onChange={this._onChangeName}/>
	                 <input required type="text" placeholder={"Your email..."} value={this.state.email} onChange={this._onChangeEmail}/>
                 </div>
            );
            
        }
        return(
            <section className={"contact"}>
                 <Helmet>
                     <title>Software Developer | Alexander Morton</title>
                    <meta name="description" content="Contact page." />
                </Helmet>
                <div className={"contact__container"}>
	                <h1>
	                    Send Me an Email
	                </h1>
	                <form className={"contact__form"} onSubmit={this._submit}>
	                    {nameComp}
	                    <textarea required rows="15" cols="30" type="text" value={this.state.message} placeholder={"Describe what you need..."} onChange={this._onChangemessage}/>
	                    <button type="submit">Send</button>
	                </form>
                </div>
            </section>
        )
    }
}

export default Contact;