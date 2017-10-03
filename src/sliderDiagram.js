import React, {Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderDiagram.css";

/**
    This function will return a images passed on to a slider
    @function
*/

function sliderDiagram(props){
    let imgs = props.imgs.map((img)=>{
      return (  
        <div>
          <img className={"diagram"} src={img} alt={"Diagram."}/>
        </div>
      )
    })
    return(
        <Slider {...props.settings}>
          {imgs}
        </Slider>
    )
}

export default sliderDiagram;