import React, { Component } from 'react';
import logo from "./assets/logo.svg";
import './splash.css';
import windLeft from './assets/wind_left.svg';
import windRight from './assets/wind_right.svg';

import cloud from './assets/cloud.svg';



class App extends Component {
  header = null;
  constructor(){
      super()
      this.state = {};
  }
  componentWillReceiveProps(){
    if(!this.props.isloading){
        setTimeout(()=>{
            this.props.cbAnimation(); 
        },1000)
    }
    this.props.cbAnimation(); 
  }

  render() {
    let hide = null;
    if(this.props.isLoading){
        hide = ""
    }else{
        hide = "splash--hidden"
    }

    return (
        <div className={"splash " + hide} >   
            <div className={"splash__container"}>
                <div className={"splash__container__animation"}>
                    <img className={"splash__container__animation__element splash__container__animation__element--left "} src={windRight} alt="wind"/>
                    <img className={"splash__container__animation__element splash__container__animation__element--center" } src={cloud} alt="cloud"/>
                    <img className={"splash__container__animation__element splash__container__animation__element--right"} src={windLeft} alt="wind"/>
                </div>
                <img className={"splash__container__logo"} src={logo} alt="logo"/>
            </div>
      </div>
    );
  }
}

App.defaultProps = {
    isloading:true,
    cbAnimation: function(){
        console.log("Default cbAnimation call")
    }
}

export default App;

