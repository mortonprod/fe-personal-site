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
    @class

*/
export default class FadeBackground extends Component {
  background = null;
  constructor(props){
    super()
    this.state = {height:null,opacity:0};
    this.scroll = _.throttle(this.scroll.bind(this),10,{trailing:true,leading:false});
    this.resize = _.debounce(this.resize.bind(this),300,{trailing:true,leading:false});
  }
  /**
    Scroll will use window offset and full height of image to fade out before we reach the end of the image.
    Must deduct innerHeight so we get to 1 opacity by end of image.
    @function
  */
  scroll(event){
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scrollTop/this.state.height <= 1){
        this.setState({opacity:scrollTop/(this.state.height-window.innerHeight)});
    }
  }
  /**
    When resize called make sure update opacity value through height and calling scroll.
    @function
  */
  resize(event){
    this.setState({height:ReactDOM.findDOMNode(this.background).getBoundingClientRect().height});
    this.scroll.bind(this)(event);
  }
  /**
    The height of the background is used to determine the opacity of the fade out.
    Attach resize to change opacity with change in background image height.
    CAN'T GET HEIGHT HERE BUT MUST CALL RESIZE???
    @function
  */
  componentDidMount(){
    window.addEventListener('scroll', this.scroll.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
    this.resize.bind(this)();

  }
  render(){
    return (
        <div className={"fadeBackground"}>
		    <img ref={(ref)=>{ this.background = ref}} src={background} className="fadeBackground__background" alt="mountain" />
		    <div style={{opacity:this.state.opacity}} className={"fadeBackground__blackBackground"}/>
            {this.props.children}
        </div>
    )

  }
}