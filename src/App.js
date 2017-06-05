import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Canvas from "./canvas.js";
import './App.css';
import background from './assets/peak.jpg';
import header from './assets/text.png';
import who from './assets/who.png';
import how from './assets/how.png';
import what from './assets/what.png';

import Splash from './splash';
require('smoothscroll-polyfill').polyfill();


class App extends Component {
  header = null;
  footer=null;
  constructor(){
      super()
      this.state = {isDraw:false,classHeader:"",isLoading:true};
  }
  click(){
      this.setState({
        isDraw:this.state.isDraw,
        classHeader:"app__header--invisible",
        isLoading:this.state.isLoading
      })
      if(header !==null){
        setTimeout(function(){
            let bool = null;
            if(this.state.isDraw){
              bool=false
            }else{
              bool=true;
            }
            this.setState({
              isDraw:bool,
              classHeader:"",
              isLoading:this.state.isLoading
            })
        }.bind(this),2000);
      }else{
          console.log("Header was null")
      }
  }
    componentDidMount(){
        setTimeout(() =>{
            this.setState({
                isDraw:this.state.isDraw,
                classHeader:this.state.classHeader,
                isLoading:true
            })
        },2000)
        //var rect = window.getBoundingClientRect();
      //  window.scrollTo({
      //                  top: 10000,
      //                  left: 0,
      //                  behavior: 'smooth'
      //  });
        //window.scrollTo(0, document.documentElement.scrollHeight)
        //this.footer.scrollIntoView();
        //this.footer.scrollTop = 0;
        ReactDOM.findDOMNode(this).scrollTop = 100;
    }
  render() {
      let title = null;
      let howCloud,whoCloud,whatCloud = null;
      if(this.state.isDraw){
          title = (
                   <Canvas translateY={50} txt="Questions?" speed={10} font={"pacifico"}/>
          )
          howCloud = (
            <img src={how} className="app__cloud app__cloud--how" alt="How cloud" />
          )
          whatCloud = (
            <img src={what} className="app__cloud app__cloud--what" alt="What cloud" />
                      )
          whoCloud = (
            <img src={who} className="app__cloud app__cloud--who" alt="Who cloud" />
          )

      }else{
        title = (
          <img src={header} className="app__header" alt="Zeith Solutions" />

        )
      }
    return (
            <div className="app">

            <img src={background} className="app__background" alt="mountain background" />
            <div ref={(header) => { this.header = header; }} className={"app__header " + this.state.classHeader} >
            {title}
            </div>
            {whoCloud}
            {whatCloud}
            {howCloud}
            <button onClick={this.click.bind(this)}>
            Click me
            </button>
            <Splash isLoading={this.state.isLoading}/>
            <footer ref ={ (footer) =>{this.footer =footer} } > Zenith Software </footer>
            </div>
    );
  }
}

export default App;

