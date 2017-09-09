import React, { Component } from 'react';
import * as _ from "lodash";
import './snow.css';

export default class Snow extends Component {
  constructor(props){
    super(props);
    this.state = {width:window.innerWidth,height:window.innerHeight};
    this.resize = _.debounce(this.resize.bind(this),500,{trailing:true,leading:false});
    this.draw = this.draw.bind(this);
    this.drawSnowFlakes = this.drawSnowFlakes.bind(this);
    if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
        this.worker = new Worker('./snow-work.js');
    }
  }
  worker = null;
  canvas = null;
  resize(){
    this.setState({width:window.innerWidth,height:window.innerHeight});
    this.run();
  }
  /**
    This function is called once at the start and then is rerun if we resize.
    Must remove old flakes when we resize the screen so they gave the correct position.
    @function
  */
  run(){
    if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
        this.worker.postMessage({
            name:"setParameters",
            max:this.props.max,
            createNum:this.props.createNum,
            randZ:this.props.randZ,
            randV:this.props.randV,
            randR:this.props.randR,
            zMin:this.props.zMin,
            timeDelta:this.props.timeDelta,
            airFricAcc:this.props.airFricAcc,
            width:this.state.width,
            height:this.state.height
        });
    }
    if(this.canvas !== null){
        let ctx = this.canvas.getContext("2d")
        requestAnimationFrame(()=>{this.draw(ctx)});
    }else{
        console.log("Canvas is null");
    }
  }
  /**
    On each iteration, check if we need to remove flakes, then create flakes if under the maximum, then move forward, then draw.
    Make sure z is placed far away from 0 so we don't have a negative radius.
    @function
  */
  draw(ctx){
    if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
      let prom = new Promise((resolve,reject)=>{
          this.worker.postMessage({name:"updateFlakes"});
          this.worker.onmessage = (m) => {
              resolve(m.data.flakes);
          }
      });
      prom.then((flakes)=>{
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.drawSnowFlakes(ctx,flakes);
        requestAnimationFrame(()=>{this.draw(ctx)});
      })
    }
  }
  /**
    When we resize we need to start the snow again. 
    @function
  */
  componentDidMount(){
    window.addEventListener('resize',()=>{this.resize.bind(this)()});
    this.run();
  }
  /**
    Draw the snow flakes. 
    The further away the flake is the smaller and slower it will appear to move.
    @function
  */
  drawSnowFlakes(ctx,flakes){
    flakes.forEach((el,index)=>{
        ctx.beginPath();
        ctx.arc(el.x/el.z, el.y/el.z, el.r/el.z, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.closePath();
    })
  }
  render(){
    return (
        <canvas id="snow" width={this.state.width} height={this.state.height} ref={(canvas) => { this.canvas = canvas;}} >
        </canvas>
        
    )
  }
}

Snow.defaultProps = {
    randV:0.001,
    randR:5,
    randZ:0.01,
    zMin:1,
    airFricAcc:9.95,
    timeDelta:1,
    max:500,
    createNum:1
}