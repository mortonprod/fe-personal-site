import React, { Component } from 'react';
import logo from "./assets/logo.svg";
import './splash.css'



class App extends Component {
  header = null;
  constructor(){
      super()
      this.state = {isDraw:false,classHeader:""};
  }

  render() {
    return (
      <div className="splash">
            <img className="splash__logo" src={logo} alt="logo"/>
      </div>
    );
  }
}

export default App;

