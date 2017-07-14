import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import './canvas.css';

class Canvas extends Component {
  canvas = null;
  lineJoin = "round";
  strokeStyle = "#1f2f90";
  fillStyle = "white";
  lineWidth = 5;
  globalAlpha = 1;
  startFont = 5;
  xBetweenLetters = 5;
  isResized=false;
  error = 50;
  constructor(){
    super();
    this.state = { width:'1000px', height:'1000px'}
    this.resize = _.debounce(this.resize.bind(this),500,{trailing:true,leading:false});
  }
  resize(){
    this.run(true);
  }
  setSizeFromText(){
    return new Promise((resolve,reject)=>{
	    let ctx = null;
	    if(this.canvas !== null){
	        ctx = this.canvas.getContext("2d")
	    }else{
	        console.log("Canvas is null");
	    }
	    let width = ReactDOM.findDOMNode(this.canvas).parentElement.clientWidth;
	    if(ctx !== null){
	        ctx.font = this.startFont + "px " + this.props.font;
	        let textWidth = ctx.measureText(this.props.txt).width;
	        var numberPattern = /\d+/g;
	        //console.log("width/textWidth: " + width + "  " + textWidth);
	        let fontSize = this.startFont;
            let tempFont = null;
	        while (width - this.error > textWidth + this.props.txt.length*this.xBetweenLetters ) { //Must take into account the space between letters.
	            fontSize = fontSize + 1;
	            let numberOfDigits = ctx.font.match( numberPattern )[0].split("").length 
	            ctx.font = fontSize + ctx.font.slice(numberOfDigits);
                tempFont = ctx.font;
	            textWidth = ctx.measureText(this.props.txt).width;
	            //console.log("FontSize/text width/canvas width/text: " + fontSize + "  " + ctx.font + " " + textWidth + " " + width + "  " + this.props.txt)
	        }
            //MUST SET FONT SIZE AFTER CHANGING CANVAS FONT SO PASS TO RESOLVE.
            this.setState({width:width,height:1.5*parseInt(ctx.font)});
            resolve({ctx,tempFont});
	    }else{
	        console.log("Context is null");
	    }

    })
  }
  run(isClear){
    let i = 0;
    let dashLen = 220;
    let dashOffset = dashLen;
    let x = 1;

    this.setSizeFromText().then((obj)=>{
        console.log("Pass " + obj.tempFont);
        if(isClear){
            console.log("Is clear : " + this.state.width + "  " + this.state.height);
            //obj.ctx.clearRect(0, 0, this.state.width, this.state.height);
            obj.ctx.clearRect(0, 0, 10000, 10000);
        }
        obj.ctx.font = obj.tempFont;
        obj.ctx.fillStyle = this.fillStyle;
        obj.ctx.lineWidth = this.lineWidth; 
        obj.ctx.lineJoin = this.lineJoin; 
        obj.ctx.globalAlpha = this.globalAlpha;
        obj.ctx.strokeStyle = this.strokeStyle;
        obj.ctx.fillStyle = this.fillStyle
        this.isResized = false;
        draw.bind(this)(obj.ctx);
    });
    function draw(ctx) {
      if(!this.isResized){
	      ctx.setLineDash([dashLen - dashOffset, dashOffset - this.props.speed]);
	      dashOffset -= this.props.speed;
	      ctx.strokeText(this.props.txt[i], x, parseInt(ctx.font));
	      if (dashOffset > 0){
	        requestAnimationFrame(()=>{draw.bind(this)(ctx)});
	      }else{
	        //console.log("FILL");
	        ctx.fillText(this.props.txt[i], x, parseInt(ctx.font));
	        dashOffset = dashLen;
	        x += ctx.measureText(this.props.txt[i++]).width + this.xBetweenLetters;
	        if (i < this.props.txt.length) {
	          requestAnimationFrame(()=>{draw.bind(this)(ctx)});
	        }
	      }
       }else{
        console.log("Resizing");
       }
    }
   }
   componentDidMount(){
    this.run(false);
    window.addEventListener('resize',()=>{ this.isResized = true; this.resize.bind(this)()});
   }
   ///Don't rerender with the parent div rerenders and passes new props in.
   shouldComponentUpdate(nextProps, nextState){
        if(Object.is(nextState,this.state) && nextProps.title === this.props.title ){
            return false;
        }else{
            return true;
        }
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

