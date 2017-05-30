import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import background from './assets/mountain.png';
import header from './assets/text.png';


class App extends Component {
  render() {
    return (
      <div className="app">
        <img src={background} className="app__background" alt="mountain background image" />
        <img src={header} className="app__header" alt="Zeith Solutions" />
      </div>
    );
  }
}

export default App;
