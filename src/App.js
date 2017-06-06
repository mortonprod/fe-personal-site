import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Canvas from "./canvas.js";
import './App.css';
import background from './assets/peak.jpg';
import header from './assets/text.png';
import who from './assets/who.png';
import how from './assets/how.png';
import what from './assets/what.png';

import Cloud from './cloud';

import Splash from './splash';
require('smoothscroll-polyfill').polyfill();


class App extends Component {
  constructor(){
      super()
      this.state = {isLoading:true,isShowTitle:false};
  }
  componentDidMount(){
    setTimeout(() => {
        this.setState({
            isLoading:false,
            isShowTitle:this.state.isShowTitle
        });
    },1000);
  }
  complete(){
     this.setState({
        isLoading:this.state.isLoading,
        isShowTitle:true
    });
  }
  render() {
    let content = null;
    if(this.state.isShowTitle){
        content = (
            <div>
                <img src={background} className="app__background" alt="mountain background" />
                <div className={"app__header"} >
                    <Canvas maxSize={200}txt={this.props.title} speed={this.props.titleSpeed} font={this.props.titleFont}/>
                </div>
                <div className={"app__cloud--right--slow"} style={{position:'absolute',width:'10%',left:'10%',top:'10%'}}>
                    <Cloud delay={500}/>
                </div>
                <div className={"app__cloud--left--slow"} style={{position:'absolute',width:'20%',left:'70%',top:'20%'}}>
                    <Cloud delay={1000}/>
                </div>
                <div className={"app__cloud--right"} style={{position:'absolute',width:'30%',left:'30%',top:'25%'}}>
                    <Cloud delay={1500}/>
                </div>
                <div className={"app__cloud--left"} style={{position:'absolute',width:'30%',left:'80%',top:'30%'}}>
                    <Cloud delay={2000}/>
                </div>
                <footer> this.props.title </footer>
            </div>
                
        )
    }else{
        content = (
            <div>
                <Splash isLoading={this.state.isLoading} cbAnimation={this.complete.bind(this)}/>
            </div>
        )
    }
    return (
            <div className="app">
                {content}
            </div>
    );
  }
}

App.defaultProps = {
    title:" Zenith Software",
    titleFont:"Lobster",
    titleSpeed:10
}

export default App;

