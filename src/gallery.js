import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SliderDiagram from "./sliderDiagram";
import "./gallery.css";
/**
  This is will be a series of pictures with title and text explaining the project.
  The pictures should fade in and out behind the text, and when you hover the image disappears so people can read the text.  
  When you click on the square it will expose: problem,solution,slider images, more information button.
  @class
*/
class Gallery extends Component {
    constructor(props){
      super(props);
      this.state={idFocus:null,yPos:0}
      this.click = this.click.bind(this);
      this.boxes = getItems(props.items,this.click);
      this.details = getDetails(props.items,5000); 
    }
    lastFocus = 0;
    click(id){
      if(this.state.idFocus !==null){
        this.setState({idFocus:null});
        setTimeout(()=>{
          this.setState({idFocus:id});
        },2000)
      }else{
         this.setState({idFocus:id});
      }
      this.lastFocus = id;
    };
    clickOff(){
      this.setState({idFocus:null});
    }
    render(){
      let details = null;
      if(this.state.idFocus !== null){
        details = (<div className={"gallery__detail gallery__detail--show"} onClick={()=>{this.clickOff()}}>{this.details[this.state.idFocus]}</div>)
      }else{
        details = (<div className={"gallery__detail"} onClick={()=>{this.clickOff()}}>{this.details[this.lastFocus]}</div>)
      }
      return (
        <section className={"gallery"}>
          {this.boxes}
          {details}
        </section>
      )
    }

}
/**
 This function will get the boxes containing things you have done.
 It will attack a single event handler to each article.
 @function
*/
function getItems(items,click){
  let boxes = items.map((el,i)=>{
    return (
      <Item click={()=>{click(i)}} title={el.title} information={el.information} frequency={5000} pics={el.pics} counter={i} key={i}/>
    )
  });
  return boxes;
}
/**
 This function will get the boxes containing things you have done. 
 @function
*/
function getDetails(items,frequency){
  let boxes = items.map((el,i)=>{
    let labels = null;
    if(el.skillSet && el.skillSet.length !== 0){
      labels = el.skillSet.map((elj,j)=>{
        return (
          <label key={j}> {elj} </label>
        )
       });
    }
    return (
      <article className={"gallery__detail__blocks"}>
        <div className={"gallery__detail__block1"}>
          <h1>Problem</h1>
          <p>{el.problem}</p>
          <h1>Solution</h1>
          <p>{el.solution}</p>
          {labels}
        </div>
        <div className={"gallery__detail__block2"}>
          <Pics pics={el.pics} frequency={frequency}/>
          <a href={el.link}>{el.linkTitle}</a>
        </div>
      </article>
    )
  });
  return boxes;
}

Gallery.defaultProps = {
   items:[],
   settings:{
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay:true
    }
}

export default Gallery;

/**
  This function will create the individual items. 
  The changing of the pics is dealt with it's own class.
  The item will always be 300px by 300px
*/
function Item(props) {

    return(
       <article className={"gallery__item"} onClick={()=>{props.click(props.counter)}}>
        <div className={"gallery__item__pics"}>
          <Pics pics={props.pics} frequency={props.frequency}/>
        </div>
        <h1>{props.title}</h1>
        <p>{props.information}</p>
      </article>
    )
}
/**
  This class will return a new pics which will show and then hide. 
*/
class Pics extends Component{
   constructor(props){
      super(props);
      this.state= {class:"gallery__item__pic--show",src:props.pics[0]};
      this.onHover = this.onHover.bind(this);
      this.startCycle = this.startCycle.bind(this);
   }
   interval = null;
   timeout = null;
   onHover(isOver){
    if(isOver){
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.setState({class:"gallery__item__pic--hide",src:this.props.pics[0]});
    }else{
      this.startCycle();
    }
   }
   /**
     This function will start to run through each image. 
     Just before mounting you will set the state to show and the first pic. 
     Next you will pass the same picture with hide. 
     Finally you will return the new pic with show.    
   */
   startCycle(){
     let counter = 0;
     this.interval = setInterval(()=>{
       this.setState({class:"gallery__item__pic--hide",src:this.props.pics[counter]});
       this.timeout = setTimeout(()=>{
         this.setState({class:"gallery__item__pic--show",src:this.props.pics[counter]});   
       },this.props.frequency/2)
       if(counter >= this.props.pics.length -1){
         counter = 0;
       }else{
         counter++;
       }  
     },this.props.frequency);
   }
   componentWillMount(){
      this.startCycle();
   }
   render(){
     return(
        <img onMouseEnter={()=>{this.onHover(true)}} onMouseLeave={()=>{this.onHover(false)}} className={"gallery__item__pic " +this.state.class}  src={this.state.src} alt={"My Work"}/>
     )
   }
}


