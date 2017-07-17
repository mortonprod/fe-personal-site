    import React, { Component } from 'react';
import Cloud from "./cloud";
import "./clouds.css";
/** 
    The clouds component is absolute positioned element relative to its children.
    It will place the clouds at positions specified as fractions of the whole.
    Generate random will place the clouds randomly. You control the range or generation.
    If you pass clouds then draw them, otherwise, draw random clouds. 
    Place children in container so we can move it above the absolutely positioned clouds.
    The clouds overflow should be hidden so we can't scroll off the page.
    @class
*/
export default class Clouds extends Component {
    randomInfo = [];
	constructor(){
        super();
        this.state= {clouds:null}
	}
    /**
        Must calculate random numbers here and not in render. So we do not change the values when the underlying child component updates.
        Render clouds here so we don't have to build the clouds on each render.
        @function
    */
    componentWillMount(){
        let topFrac = 100/this.props.random.number;
	    for(let i=0; i < this.props.random.number ; i++ ){
	        let moveInt =  getRandomInt(0, 5);
	        let width = getRandomArbitrary(this.props.random.widthRange[0], this.props.random.widthRange[1]);
	        let left = getRandomArbitrary(0, 100);
	        let period = getRandomArbitrary(1000, 3000);
	        let delay = getRandomArbitrary(1000, 5000);
	        let top = topFrac*i;
            this.randomInfo.push({moveInt,width,left,period,delay,top});
	    }
        if(this.props.clouds){
            this.state.clouds = this.props.clouds.map((el,i)=>{
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
                    <div key={i} className={"clouds__cloud "+classString} style={{position:'absolute',width:el.width,left:el.left,top:el.top}}>
                        <Cloud period={el.period} delay={el.delay}/>
                    </div>  
                )
            });
        }else{
            this.state.clouds = [];
            let moves = ["clouds__cloud--rightSlow","clouds__cloud--right","clouds__cloud--leftSlow","clouds__cloud--left"];
            for(let i=0; i < this.props.random.number ; i++ ){
                let cloud = (
                    <div key={i} className={"clouds__cloud "+moves[this.randomInfo[i].moveInt]} style={{position:'absolute',width:this.randomInfo[i].width+"%",left:this.randomInfo[i].left+"%",top:this.randomInfo[i].top+"%"}}>
                        <Cloud period={this.randomInfo[i].period} delay={this.randomInfo[i].delay}/>
                    </div>  
                )
                this.state.clouds.push(cloud);
            }
        }
    }
    /** 
        Will render clouds over child component passed via props.
        Position can be in pixels or percentages. The clouds will be placed behind the children
	    @function
    */
    render(){

        return (
            <div className={"clouds"}>
                <div className={"clouds__container"}>
                    {this.state.clouds}
                </div>
                <div className={"clouds__children"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Clouds.defaultProps = {
    random:{
        number:10,
	    widthRange:[10,40]
    }
}

/**
    Get random int between two values.
    The maximum is exclusive and the minimum is inclusive
    @function
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

/**
    Get random number between two values
    @function
*/

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}