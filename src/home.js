import React, { Component } from 'react';
import * as _ from "lodash";
import ReactDOM from 'react-dom';
import Clouds from "./clouds";  
import FadeBackground from "./fadeBackground";  
import Squares from "./squares";
import './home.css';


/** 
    Contains fade in background/clouds/squares components.
    @class
*/
export default class Home extends Component {
    squares = [null,null,null];
	constructor(props){
	  super(props)
	  this.state = {scrollTop:0,isShow:[]};
      //this.scroll = _.throttle(this.scroll.bind(this),100,{trailing:true,leading:false});
      window.addEventListener('scroll', this.scroll.bind(this));
	}
    /** 
	    Scroll event updates y position of title and if squares should move in.
        Most scroll calculations done here. Cleaner code since we have once location for all scroll logic. 
        Reduces the impact on performance. No point in checking if state changed before updating state.
        Works out if squares should be exposed yet and passes scrollTop to other components for rerendering.
        ACCESS DOM HERE!
	    @function
    */
	scroll(event){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		///
		this.squares.map((ref,i)=>{
            if(ref){
			    let pos = ref.getBoundingClientRect();
			    if(pos.top < window.innerHeight*(4/5)){
			        let isShow = this.state.isShow;
			        isShow[i] = true;
			        this.setState({isShow:isShow,scrollTop:scrollTop});
			    }else{
			        let isShow = this.state.isShow;
			        isShow[i] = false;
			        this.setState({isShow:isShow,scrollTop:scrollTop});
			    }
            }
		});
    }
    /** 
		Update isShow array so we have the right length. Must be called here so we get the refs.
		@function
	*/
	componentDidMount(){
		let isShow= [];
		for(let i=0; i < this.refs.length ; i++){
		    isShow.push(false);
		}
		this.setState({isShow:isShow});
	}
    /**
        If you ref a React component you need to use findDomNode to get the correct methods of DOM on ref.
    */
    render(){
        let tran = -1*this.state.scrollTop*0.5;
        return (
            <div className="home">
                <FadeBackground scrollTop={this.state.scrollTop}>
                    <Clouds>
                        <div style={{transform:'translateY(' + tran + 'px)'}} className={"home__header"} >
                            <h1>Alexander Morton</h1>
                            <h2>Web Developer</h2>
                        </div>
                        <div className={"home__gap"}/>
                        <Squares isShow={this.state.isShow[0]} ref={(ref)=>{this.squares[0] = ReactDOM.findDOMNode(ref)}}>
                        </Squares>
                        <Squares isShow={this.state.isShow[1]} ref={(ref)=>{this.squares[1] = ReactDOM.findDOMNode(ref)}}>
                        </Squares>
                        <Squares isShow={this.state.isShow[1]} ref={(ref)=>{this.squares[2] = ReactDOM.findDOMNode(ref)}}>
                        </Squares>
                    </Clouds>
                </FadeBackground>
            </div>
      )
    }
}

Home.defaultProps = {
    title:"Alexander Morton",
    subTitle:"Web Developer",
    titleFont:"Lobster"
}