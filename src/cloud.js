import React, { Component } from 'react';
import './cloud.css';
import cloud from './assets/cloud.svg';
import cloudPartial from './assets/cloud_partial.svg';
import cloudFull from './assets/cloud_full.svg';
import cloudLightning from './assets/cloud_lightning.svg';
//import rain from './assets/rain.svg';

class Cloud extends Component {
  constructor(){
    super();
    let hide =[ "cloud--hide","cloud--hide","cloud--hide","cloud--hide" ] 
    this.state = { hide:hide }
  }
  componentDidMount(){
    for(let i=0; i< this.state.hide.length-1; i++){
	    setTimeout((i)=> {
            let update = this.state.hide;
            update[i] = ""
            this.setState({hide:update});
	    },2000*i + this.props.delay,i)
    } 

  }
 componentDidUpdate(){
    if(this.state.hide[this.state.hide.length -2] !== "cloud--hide" && this.state.hide[this.state.hide.length -1] !=="cloud--flash"){
        let update = this.state.hide;
        update[this.state.hide.length -1] = "cloud--flash"
        this.setState({hide:update});
    }
 } 
  render(){
    return (
        <div className="cloud">
            <img src={cloud} className={ this.state.hide[0] + " cloud--absolute cloud__bright"} alt="cloud bright" />
            <img src={cloudPartial} className={ this.state.hide[1] + " cloud--absolute cloud__partial"} alt="cloud partial" />
            <img src={cloudFull} className={ this.state.hide[2] + " cloud--absolute cloud__full"} alt="cloud full" />
            <img src={cloudLightning} className={ this.state.hide[3] + " cloud--absolute cloud__lightning"} alt="cloud lightning" />
        </div>
        
    )
  }
}

export default Cloud