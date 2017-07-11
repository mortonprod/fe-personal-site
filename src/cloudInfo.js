import React, { Component } from 'react';
import * as _ from "lodash";
import cloud from './assets/cloud.svg';
import cloudPartial from './assets/cloud_partial.svg';
import cloudFull from './assets/cloud_full.svg';
import cloudLightning from './assets/cloud_lightning.svg';
import user from './assets/user.svg';
import "./cloudInfo.css";

export default class CloudInfo extends Component {
  ref = null;
  constructor(){
    super();
    let hide =[ "cloudInfo--hide","cloudInfo--hide","cloudInfo--hide","cloudInfo--hide" ] 
    let hideText = "cloudInfo--hide"
    this.state = { hide:hide, isShow:false,hideText:hideText }
    this.scroll = _.throttle(this.scroll.bind(this),100);
  }
  scroll(event){
    if(this.ref){
        let pos = this.ref.getBoundingClientRect(); 
        console.log("top pos: " + pos.top);
        if(pos.top < window.innerHeight/2){//If below middle of screen
            if(!this.state.isShow){//If not shown yet then expose.
                this.setState({isShow: true});
                let update = this.state.hide;
                update[0] = "";
                update[1] = "";
                update[2] = "";
                update[3] = "cloudInfo--flash"
                this.setState({hide:update});
                //The show the final white cloud after delay
                let i = 3;
                while(i >-1){ //Show last cloud and then text.
                    if(i === 0){
	                    setTimeout(()=> {
                            this.setState({hideText:""});
	                    },1000*3 + this.props.delay);
                    }else{
	                    setTimeout((index)=> {
	                        let update = this.state.hide;
	                        update[index] = "cloudInfo--hide"
	                        this.setState({hide:update});
	                    },1000*(3-i) + this.props.delay, i);
                    }
                    i--;
                } 
            }
        }else{
            if(this.state.isShow){//If below and set to true then move to side and reset
                this.setState({isShow: false});
                setTimeout(()=> {               
	                let update = this.state.hide.map(()=>{return "cloudInfo--hide"});
	                this.setState({hide:update,hideText:"cloudInfo--hide"});    
                },1000);
            }
        }
    }
    let scrollTop = event.srcElement.body.scrollTop;
    let windowHeight = window.innerHeight;
    this.setState({opacity:scrollTop/windowHeight});
    console.log("top/window cloudInfo: " + scrollTop + " " + windowHeight);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.scroll.bind(this));
  }
 componentDidUpdate(){
 } 
  render(){
    let showClass = "";
    if(!this.state.isShow){
        if(this.props.isLeftDirection){
            showClass = " cloudInfo--left ";
        }else{
            showClass = " cloudInfo--right ";
        }
    }
    return (
        <div className={"cloudInfo " +showClass} ref={(ref)=>{this.ref = ref}}>
            <img src={cloud} className={ this.state.hide[0] + " cloudInfo cloudInfo__bright"} alt="cloud bright" />
            <img src={cloudPartial} className={ this.state.hide[1] + " cloudInfo--absolute cloudInfo__partial"} alt="cloud partial" />
            <img src={cloudFull} className={ this.state.hide[2] + " cloudInfo--absolute cloudInfo__full"} alt="cloud full" />
            <img src={cloudLightning} className={ this.state.hide[3] + " cloudInfo--absolute cloudInfo__lightning"} alt="cloud lightning" />
            <div className={"cloudInfo__text " + this.state.hideText}>
                <img src={this.props.picture} alt={this.props.picture}/>
                <div className="cloudInfo__table">
                    <h1>{this.props.title}</h1>
                    <p> {this.props.description} </p>
                    <button> Learn More </button>
                </div>
            </div>
        </div>
        
    )
  }
}

CloudInfo.defaultProps = {
    title:"User Experience",
    description:"Give your clients the feeling of a professional business with best the web has to offer.",
    picture:user,
    info:[
        {
	        title:"HTTPS",
	        description:"Secure by default"
        }
    ],
    isLeftDirection:true
}