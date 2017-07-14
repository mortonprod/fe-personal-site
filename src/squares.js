import React, { Component } from 'react';
import "./squares.css";

/** 
    The component will take child components and put them in square grid.
    Component will be fitted with maximum width and auto height.MUST PASS WIDTH>HEIGHT COMPONENT.
    Component will take a prop of when to bring in into view. It also take a prop about what direction to enter.
    If component is not shown then give left/right modifier, otherwise, remove class and bring into view.
    @class
*/
export default class Squares extends Component {
    constructor(){
        super();
    }
    render(){
        let children = React.Children.toArray(this.props.children);
        let squares = children.map((item,i)=>{
            return (
                <div key={i} className={"square"}>
                    {item}
                </div>
            )
        });
        let modifer = "";
        if(!this.props.isShow){
	        if(this.props.isLeft){
	            modifer = "squares--left";
	        }else{
	            modifer = "squares--right";
	        }
        }else{
            modifer = "";
        }
        return (
            <div className={"squares " + modifer}>
                {squares}
            </div>

        )
    }
}

Squares.defaultProps = {
    isShow:true,
    isLeft:true
}