import React, { Component } from 'react';
import * as _ from "lodash";
import './snow.css';

/**
    This stores all the information about the flake.
    The radius us the actual radius of the flake and not how it is observer from a distance.
    @function
*/
function flake(x,y,z,vx,vy,vz,r){
    this.x=x,
    this.y=y,
    this.z=z
    this.vx=vx,
    this.vy=vy,
    this.vz=vz,
    this.r=r
   // console.log("Flake " + JSON.stringify(this));
}

export default class Snow extends Component {
  constructor(){
    super();
    this.state = {width:window.innerWidth,height:window.innerHeight};
    this.resize = _.debounce(this.resize.bind(this),500,{trailing:true,leading:false});
    this.draw = this.draw.bind(this);
    this.moveFlakes = this.moveFlakes.bind(this);
    this.addFlake = this.addFlake.bind(this);
    this.drawSnowFlakes = this.drawSnowFlakes.bind(this);
    this.worker = new Worker('./snow-work.js');
    this.worker.postMessage({name:"test",counter:0});
    this.worker.onmessage = (m) => {console.log("message back " + JSON.stringify(m.data))}
  }
  worker = null;
  canvas = null;
  flakes=[];
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
    this.flakes = [];
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
  draw(ctx,height){
    this.removeFlakes();
    if(this.flakes.length < this.props.max){
      for(let i=0;i<this.props.createNum;i++){
        let z = Math.random()*this.props.randZ+this.props.zMin;
        this.addFlake(z);
      }
    }
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.moveFlakes();
    this.drawSnowFlakes(ctx);
    requestAnimationFrame(()=>{this.draw(ctx)});
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
  drawSnowFlakes(ctx){
    this.flakes.forEach((el,index)=>{
        ctx.beginPath();
        ctx.arc(el.x/el.z, el.y/el.z, el.r/el.z, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.closePath();
    })
  }
  /**
    Create snow flake. 
    This function will add a new flake to the array of flakes.
    The z position of the flake(The distance from the observer) must be specified by you on creation.
    @function
  */
  addFlake(z){
    let x = Math.random()*this.state.width;
    let v = Math.random()*this.props.randV -this.props.randV/2;
    let r = Math.random()*this.props.randR;
    this.flakes.push(new flake(x,0,z,v,v,v,r));
  }
  /**
    This function will check the z-position of every flake and remove the flakes which have left the screen.
    @function
  */
  removeFlakes(){
    this.flakes.forEach((el,index)=>{
        if(el.y > this.state.height){
            this.flakes.splice(index, 1);
        }
    });
  }
  /**
    Move the flake down with basic kinematics.
    Must take into account air friction.
    Parallax will be taken into account when we draw the flake.
    Make sure that z position is never 0.
  */
  moveFlakes(){
    this.flakes.forEach((el,index)=>{
      //  console.log("move " + JSON.stringify(el));
        el.vz = el.vz + Math.random()*this.props.randV -this.props.randV/2;
        if(el.z + el.vz*this.props.timeDelta > 0){
            el.z = el.z + el.vz*this.props.timeDelta;
        }else{
            el.z=0.001
        }

        el.vx = el.vx + Math.random()*this.props.randV -this.props.randV/2;
        el.x = el.x + el.vx*this.props.timeDelta;

        el.vy = el.vy + (10-this.props.airFricAcc)*this.props.timeDelta + Math.random()*this.props.randV -this.props.randV/2;
        el.y = el.y + el.vy*this.props.timeDelta;
    });
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