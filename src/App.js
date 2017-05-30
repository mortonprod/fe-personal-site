import React, { Component } from 'react';
import Canvas from "./canvas.js";
import './App.css';
import background from './assets/mountain.jpg';
import header from './assets/text.png';
import who from './assets/who.png';
import how from './assets/how.png';
import what from './assets/what.png';


class App extends Component {
  header = null;
  constructor(){
      super()
      this.state = {isDraw:false,classHeader:""};
  }
  click(){
      this.setState({
        isDraw:this.state.isDraw,
        classHeader:"app__header--invisible"
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
              classHeader:""
            })
        }.bind(this),2000);
      }else{
          console.log("Header was null")
      }
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
      </div>
    );
  }
}

export default App;

