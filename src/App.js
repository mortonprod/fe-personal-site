import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import CloudInfo from "./cloudInfo";
import Clouds from "./clouds";  
import FadeBackground from "./fadeBackground";  
import Squares from "./squares";
import './App.css';


/** 
    App for welcome page of portfolio.
    Contains fade in background/clouds/squares components.
    @class
*/

class App extends Component {

  squares = [];
  constructor(props){
      super(props)
      this.state = {yCanvas:0,isShow:[]};
      this.scroll = _.throttle(this.scroll.bind(this),10,{trailing:true,leading:false});
  }
  /** 
    Scroll event updates y position of title and if squares should move in.
    @function
    */
  scroll(event){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.setState({yCanvas:-scrollTop*0.5});
    ///
    this.squares.map((ref,i)=>{
        let pos = ref.getBoundingClientRect();
        if(pos.top < window.innerHeight*(4/5)){
            let isShow = this.state.isShow;
            isShow[i] = true;
            this.setState({isShow:isShow});
        }else{
            let isShow = this.state.isShow;
            isShow[i] = false;
            this.setState({isShow:isShow});
        }

    });
  }
  /** 
    Update isShow array so we have the right length. Must be called here so we get the refs.
    @function
  */
  componentDidMount(){
    window.addEventListener('scroll', this.scroll.bind(this));
    let isShow= [];
    for(let i=0; i < this.refs.length ; i++){
        isShow.push(false);
    }
    this.setState({isShow:isShow});
  }
  /** 
	Don't update state here or repeated call to render.
	@function
  */
  addRef(ref){
    //console.log("refs: " + this.squares);
    this.squares.push(ref);
  }
  render() {
      return (
            <div className="app">
                <span style={{color:"white"}}>Hello</span>
            </div>
    );
    return (
            <div className="app">
                <FadeBackground>
	                <Clouds>
	                    <div style={{transform:'translateY(' + this.state.yCanvas + 'px)'}} className={"app__header"} >
	                        <h1>Alexander Morton</h1>
	                        <h2>Web Developer</h2>
	                    </div>
                        <Squares isShow={this.state.isShow[0]} ref={(ref)=>{this.addRef.bind(this)(ref)}}>
                        </Squares>
                        <Squares isShow={this.state.isShow[1]} ref={(ref)=>{this.addRef.bind(this)(ref)}}>
                        </Squares>
                        <Squares isShow={this.state.isShow[1]} ref={(ref)=>{this.addRef.bind(this)(ref)}}>
                        </Squares>
	                    <footer> {this.props.title} </footer>
	                </Clouds>
                </FadeBackground>
            </div>
    );
  }
}

App.defaultProps = {
    title:"Alexander Morton",
    subTitle:"Web Developer",
    titleFont:"Lobster"
}

export default App;

