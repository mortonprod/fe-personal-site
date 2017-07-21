import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import background from './assets/peak.jpg';
import "./fadeBackground.css";

/**
    This component will place background behind children.
    The fade in should complete before the bottom of background image is at the botton of viewport.
    The background image size is determined from the size of the viewport. It uses width to centre and changes with media queries to get the correct height.
    The background fill covers all the children.
    Child should not rerender since props/state internal have not changed. 
    Furthermore, the virtual dom will mitigate any perf impact.
    Overflow should be hidden so we can't scroll oto side. Must not attach to main div so we can scroll app passed as child.
    MUST SPECIFY POSITION TO USE OVER-FLOW WITH ABSOLUTE AND RELATIVE ELEMENTS
    @class

*/
export default class FadeBackground extends Component {
  background = null;
  constructor(props){
    super()
    this.state = {height:null};
    this.resize = _.debounce(this.resize.bind(this),300,{trailing:true,leading:false});
  }
  /**
    When resize called make sure update opacity value through height.
    @function
  */
  resize(event){
    let node = ReactDOM.findDOMNode(this.background)
    if(node){
        this.setState({height:node.getBoundingClientRect().height});
    }
  }
  /**
    The height of the background is used to determine the opacity of the fade out.
    Attach resize to change opacity with change in background image height.
    CAN'T GET HEIGHT HERE BUT MUST CALL RESIZE???
    @function
  */
  componentDidMount(){
    window.addEventListener('resize', this.resize.bind(this));
    this.resize.bind(this)();

  }
  render(){
    let opacity = null;
    if(this.props.scrollTop/this.state.height <= 1){
        opacity = this.props.scrollTop/(this.state.height-window.innerHeight);
    }else{
        opacity = 1;
    }
    return (
        <div className={"fadeBackground"}>
            <div className="fadeBackground__background">
		        <img ref={(ref)=>{ this.background = ref}} src={background}  alt="mountain" />
            </div>
		    <div style={{opacity:opacity}} className={"fadeBackground__blackBackground"}/>
            {this.props.children}
        </div>
    )

  }
}