import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import asyncComponent from "./asyncComponent";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './App.css';

const AsyncHome = asyncComponent(() => import('./home'));
/** 
    This class contains the full app. It will only render the initial shell of the app which is composed of navigation. 
    The content of the page is lazy loaded.
    @class
*/
export default class App extends Component {
    constructor(){
        super();
    }
    render(){
	    return (
            <div>
	            <nav>nav</nav>
	            <Router>
	              <Switch>
                    <Route path="/" component={AsyncHome}/>
				  </Switch>
				</Router>
            </div>
	    )
    }
};

