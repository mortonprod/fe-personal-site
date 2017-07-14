import React, { Component } from 'react';
import Rx from "rx";
import './cloud.css';
import cloud from './assets/cloud.svg';
import cloudPartial from './assets/cloud_partial.svg';
import cloudFull from './assets/cloud_full.svg';
import cloudLightning from './assets/cloud_lightning.svg';

/** 
    This component will fill the width of a container with cloud animation. 
    @class
*/

class Cloud extends Component {
  constructor(){
    super();
    let hide =[ "cloud__layer--hide","cloud__layer--hide","cloud__layer--hide","cloud__layer--hide" ] 
    this.state = { hide:hide }
  }
  /**
    Once mounted expose each cloud layer one by one.
    @function
  */
  componentDidMount(){
    removeAllHide(this.props.period,this.props.delay,this.state,this.setState.bind(this));
  }
  /**
    Check on each update if we need to start the lightning.
    @function
  */
 componentDidUpdate(){
    if(this.state.hide[this.state.hide.length -2] !== "cloud__layer--hide" && this.state.hide[this.state.hide.length -1] !=="cloud__layer--flash"){
        let update = this.state.hide;
        update[this.state.hide.length -1] = "cloud__layer--flash"
        this.setState({hide:update});
    }
 } 
  render(){
    return (
        <div className="cloud">
            <img src={cloud} className={ this.state.hide[0] + " cloud__layer"} alt="cloud bright" />
            <img src={cloudPartial} className={ this.state.hide[1] + " cloud__layer"} alt="cloud partial" />
            <img src={cloudFull} className={ this.state.hide[2] + " cloud__layer"} alt="cloud full" />
            <img src={cloudLightning} className={ this.state.hide[3] + " cloud__layer"} alt="cloud lightning" />
        </div>
        
    )
  }
}

export default Cloud


Cloud.defaultProps = {
    period:1000,
    delay:1000,
    removeHide
}


/**
    Copy react state since state reference is passed by value. 
    Therefore, we must clone the state object to prevent changing immutible state object. 
    @function 
*/

function copy(state){
    return JSON.parse(JSON.stringify(state));
}


/**
    Removes hide element of state state for input index. 
    @function 
*/

export function removeHide(i,stateTemp){
    let state = copy(stateTemp);
	state.hide[i] = ""
    return state;
}

/**
    setState in timeout sequence. Do not remove the last layer. 
    @function 
*/

export function removeAllHide(period,delay,state,cb){
    
    let stateTemp = state;
    for(let i=0; i< state.hide.length-1; i++){
        setTimeout((i)=> {
            stateTemp = removeHide(i,stateTemp);
            cb(removeHide(i,stateTemp));
        },period*i + delay,i);
    } 
}