import React, { Component } from 'react';
import * as _ from "lodash";
import Vivus from 'vivus';
import cloud from './assets/cloud.svg';
import cloudPartial from './assets/cloud_partial.svg';
import cloudFull from './assets/cloud_full.svg';
import cloudLightning from './assets/cloud_lightning.svg';
import user from './assets/user.svg';
import cloudLines from "./assets/cloudLines.svg";
import "./cloudInfo.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export default class CloudInfo extends Component {
  isRun = true;
  ref = null;
  constructor(){
    super();
    let hide =[ "cloudInfo--hide","cloudInfo--hide","cloudInfo--hide","cloudInfo--hide" ] 
    let hideText = "cloudInfo--hide"
    this.state = { hide:hide, isShow:false,hideText:hideText,isList:false }
    //this.scroll = _.throttle(this.scroll.bind(this),100);
  }
  scroll(event){
    if(this.ref){
        let pos = this.ref.getBoundingClientRect(); 

        if(pos.top < window.innerHeight*(4/5)){//If below middle of screen
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
	                    },250*3 + this.props.delay);
                    }else{
	                    setTimeout((index)=> {
	                        let update = this.state.hide;
	                        update[index] = "cloudInfo--hide"
	                        this.setState({hide:update});
	                    },250*(3-i) + this.props.delay, i);
                    }
                    i--;
                } 
            }
        }else{
            if(this.state.isShow){//If below and set to true then move to side and reset
                this.setState({isShow: false});
                let update = this.state.hide.map(()=>{return "cloudInfo--hide"});
                this.setState({isShow:false,hide:update,hideText:"cloudInfo--hide"}); 
                //setTimeout(()=> {               
	            //    let update = this.state.hide.map(()=>{return "cloudInfo--hide"});
	            //    this.setState({hide:update,hideText:"cloudInfo--hide"});    
                //},1000);
            }
        }
    }
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;;
    let windowHeight = window.innerHeight;
    this.setState({opacity:scrollTop/windowHeight});

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
    let text = null;
    if(!this.state.isList){
        let para = this.props.description.map((el)=>{
            return <p>{el}</p>
        })
	    text = (
		    <div key={1} className="cloudInfo__table">
		        <h1>{this.props.title}</h1>
                {para}
		        <button onClick={()=>{this.setState({isList:true})}}> See what we do </button>
		    </div>
	    )
    }else{
        text = (
            <div key={2} className="cloudInfo__table">
                Hello
                <button onClick={()=>{this.setState({isList:false})}}> See why we do this </button>
            </div>
        )
    }
    let cloudLines = (
            <object
                className={"cloudInfo--absolute"}
                src={cloudLines} 
                ref={() => {
                    if(this.isRun){
                        new Vivus("cloudLines",{duration:"2000",start:"autostart",file:cloudLines}); 
                    }
                    this.isRun=false;
                }} 
                id="cloudLines">
            </object>
    )
    return (
    <div className={"cloudInfo " +showClass} ref={(ref)=>{this.ref = ref}}>
    {cloudLines}
    </div>
    )
    return (
        <div className={"cloudInfo " +showClass} ref={(ref)=>{this.ref = ref}}>
            <img src={cloud} className={ this.state.hide[0] + " cloudInfo cloudInfo__bright"} alt="cloud bright" />
            {cloudLines}
            <img src={cloudPartial} className={ this.state.hide[1] + " cloudInfo--absolute cloudInfo__partial"} alt="cloud partial" />
            <img src={cloudFull} className={ this.state.hide[2] + " cloudInfo--absolute cloudInfo__full"} alt="cloud full" />
            <img src={cloudLightning} className={ this.state.hide[3] + " cloudInfo--absolute cloudInfo__lightning"} alt="cloud lightning" />
                <ReactCSSTransitionGroup className={"cloudInfo__text " + this.state.hideText}
                    transitionName="expand"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                {text}
                </ReactCSSTransitionGroup>

        </div>
        
    )
  }
}

CloudInfo.defaultProps = {
    title:"Web Design",
    description:[
        "Your clients expect a website which is memorable. I produce custom designs which says something personal about your business.",
        "Your clients also expect your website to be functional on all devices. All my websites are responsive by default "
    ],
    picture:user,
    info:[
        {
	        title:"HTTPS",
	        description:"Secure by default"
        }
    ],
    isLeftDirection:true
}