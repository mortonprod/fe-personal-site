import React, { Component } from 'react';
import './canvas.css';


class Canvas extends Component {
  canvas = null;
  componentDidMount(){
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
    while (this.canvas.width - 100 > textWidth) {
        fontSize = fontSize + 1;
        ctx.font = fontSize + ctx.font.slice(2)
        textWidth = ctx.measureText(this.props.txt).width;
    }
    function draw() {
      //ctx.clearRect(x, 0, 0, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - this.props.speed]);
      dashOffset -= this.props.speed;
      ctx.strokeText(this.props.txt[i], x, this.props.translateY);
      if (dashOffset > 0){
        requestAnimationFrame(draw.bind(this));
      }else{
        ctx.fillText(this.props.txt[i], x, this.props.translateY);
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
            <canvas alt={this.props.txt} id="canvas" ref={(canvas) => { this.canvas = canvas; }} ></canvas>
    );
  }
}

export default Canvas;

