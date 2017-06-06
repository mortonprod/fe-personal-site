import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './canvas.css';


class Canvas extends Component {
  canvas = null;
  constructor(){
    super();
    this.state = { width:'1000px', height:'1000px'}
  }
  componentDidMount(){

    let width = ReactDOM.findDOMNode(this.canvas).parentElement.clientWidth;
    let height = ReactDOM.findDOMNode(this.canvas).parentElement.clientHeight;
    if(Number(this.state.width.substring(0, width.length - 2)) !== width || Number(this.state.height.substring(0, height.length - 2)) !== height){
        this.setState({ width:width, height:height});
    }
   }
   componentDidUpdate(){ 
    let dashLen = 220, dashOffset = dashLen, x = 1, i = 0, fontSize = 20;
    let ctx = null;
    if(this.canvas !== null){
        ctx = this.canvas.getContext("2d")
    }else{
        console.log("Canvas is null");
    }
    if(ctx !== null){
        ctx.font = fontSize + "px " + this.props.font;
        ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 1;
        ctx.strokeStyle = "#1f2f90";
        ctx.fillStyle = "white"
    }else{
        console.log("Context is null");
    }
    let textWidth = ctx.measureText(this.props.txt).width;
    var numberPattern = /\d+/g;
    while (this.canvas.width - this.props.maxSize > textWidth) {
        fontSize = fontSize + 1;
        let numberOfDigits = ctx.font.match( numberPattern )[0].split("").length 
        ctx.font = fontSize + ctx.font.slice(numberOfDigits);
        textWidth = ctx.measureText(this.props.txt).width;
    }
    function draw() {
      //ctx.clearRect(x, 0, 0, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - this.props.speed]);
      dashOffset -= this.props.speed;
      ctx.strokeText(this.props.txt[i], x, this.canvas.height -this.canvas.height/5);
      if (dashOffset > 0){
        requestAnimationFrame(draw.bind(this));
      }else{
        ctx.fillText(this.props.txt[i], x, this.canvas.height -this.canvas.height/5);
        dashOffset = dashLen;
        x += ctx.measureText(this.props.txt[i++]).width + 10;
        if (i < this.props.txt.length) {
          requestAnimationFrame(draw.bind(this));
        }
      }
    }
    draw.bind(this)();
  }

  render() {
    return (
            <canvas width={this.state.width}
             height={this.state.height} 
             alt={this.props.txt} 
             id="canvas" 
             ref={(canvas) => { this.canvas = canvas; }} >
            </canvas>
    );
  }
}

export default Canvas;

