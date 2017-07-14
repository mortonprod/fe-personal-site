import React, { Component } from 'react';
import Cloud from "./cloud";
import "./clouds.css";
/** 
    The clouds component is absolute positioned element relative to its children.
    It will place the clouds at positions specified as fractions of the whole.
    @class
*/
export default class Clouds extends Component {
	constructor(){
        super();
	}
    /** 
        Will render clouds over child component passed via props.
        Position can be in pixels or percentages. The clouds will be placed behind the children
	    @function
    */
    render(){
        let clouds = this.props.clouds.map((el,i)=>{
            let classString = "";
            if(el.isRight){
                if(el.isSlow){
                    classString = "clouds__cloud--rightSlow";
                }else{
                    classString = "clouds__cloud--right";
                }
            }else{
                if(el.isSlow){
                    classString = "clouds__cloud--leftSlow";
                }else{
                    classString = "clouds__cloud--left";
                }
            }
            return(
                <div key={i} className={classString} style={{position:'absolute',width:el.width,left:el.left,top:el.top}}>
                    <Cloud period={el.period} delay={el.delay}/>
                </div>  
            )
        });
        return (
            <div className={"clouds"}>
                {clouds}
                {this.props.children}
            </div>
        )
    }
}

Clouds.defaultProps = {
    clouds:[
        {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:true,isSlow:true},
        {top:"20%",left:"10%",width:"10%",period:1000,delay:1000,isRight:true,isSlow:false},
        {top:"80%",left:"50%",width:"20%",period:1000,delay:1000,isRight:false,isSlow:false}
    ]
}