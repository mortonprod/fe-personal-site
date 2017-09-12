import React, { Component } from 'react';
import "./squares.css";

/** 
    This component will contain all the square components
    @class
*/
class Squares extends Component {
    constructor(){
        super();
    }
    render(){
        let modifier = "";
        if(this.props.isShow){
            modifier = "";
        }else{
            if(this.props.isLeft){
                modifier = "squares--left";
            
            }else{
                modifier = "squares--right";
            }
        }

        return (
            <div className={"squares " + modifier}>
                <h1>{this.props.title}</h1>
                <div className={"squares__flex"}>
                    {this.props.children}
                </div>
            </div>

        )
    }
}

Squares.defaultProps = {
    isShow:false,
    isLeft:true
}

export default Squares;

