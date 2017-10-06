import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import SliderDiagram from "./sliderDiagram";
import "./gallery.css";

const frequency = 5000;

/**
 *  Use this function to start the timer immediately.
 */
function setIntervalImmediate(fn, t) {
  fn();
  return(setInterval(fn, t));
}

/**
  This is will be a series of pictures with title and text explaining the project.
  The pictures should fade in and out behind the text, and when you hover the image disappears so people can read the text.  
  When you click on the square it will expose: problem,solution,slider images, more information button.
  @class
*/
class Gallery extends Component {
    constructor(props){
      super(props);
      this.state={idFocus:null,scrollTop:0}
      this.click = this.click.bind(this);
      this.boxes = getItems(props.items,this.click);
      this.details = getDetails(props.items,frequency); 
      this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
    }
    componentDidMount(){
      window.addEventListener('scroll', this.scroll.bind(this));
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
    scroll(event){
      //if(document.body.scrollLeft !== 0 ){
          document.body.scrollLeft = 0;
      //}
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.setState({scrollTop:scrollTop});
  }
    render(){
      let tran = -1*this.state.scrollTop*0.2;
      let details = null;
      if(this.state.idFocus !== null){
        details = (<div className={"gallery__detail gallery__detail--show"} onClick={()=>{this.clickOff()}}>{this.details[this.state.idFocus]}</div>)
      }else{
        details = (<div className={"gallery__detail"} onClick={()=>{this.clickOff()}}>{this.details[this.lastFocus]}</div>)
      }
      return (
        <div>
        <div style={{transform:'translateY(' + tran + 'px)', textAlign:"center"}} className={"home__header"} >
          <h1>My Gallery</h1>
          <h2>A small list of papers, projects and repositories</h2>
        </div>
        <div className={"home__gap"}/>
        <section className={"gallery"}>
          {this.boxes}
          {details}
        </section>
        </div>
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
    let spans = null;
    if(el.skillSet && el.skillSet.length !== 0){
      spans = el.skillSet.map((elj,j)=>{
        return (
          <span key={j}> {elj} </span>
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
          {spans}
        </div>
        <div className={"gallery__detail__block2"}>
          <Pics pics={el.pics} frequency={frequency} class={"gallery__item__pic gallery__item__pic--smaller gallery__item__pic--margin"} showOnHover={false} hideOnHover={false}/>
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
          <Pics pics={props.pics} frequency={props.frequency} class={"gallery__item__pic "} showOnHover={true} hideOnHover={false} />
        </div>
        <h1>{props.title}</h1>
        <p>{props.information}</p>
      </article>
    )
}
/**
  This class will return a new pics which will show and then hide.
  If show on hover only show when over. 
  If hide on hover then hide when hover. 
  If neither then hover does nothing. 
*/
class Pics extends Component{
   constructor(props){
    super(props);
    if(props.showOnHover && props.hideOnHover){
      throw(Error("Input to pics about hover is contradictory."));
    }
    this.onHover = this.onHover.bind(this);
    this.startCycle = this.startCycle.bind(this);
    if(props.showOnHover){
      this.state= {class:"gallery__item__pic--hide",src:props.pics[0]};
    }else if(props.hideOnHover){
      this.state= {class:"gallery__item__pic--show",src:props.pics[0]};
    }else{
      this.state= {class:"gallery__item__pic--show",src:props.pics[0]};      
      this.startCycle();      
    }
   }
   interval = null;
   timeout = null;
   /**
    * This function will fire when mouse is enters and leaves 
    * It decides when to start the cycle. 
    */
   onHover(isOver){
    if(this.props.hideOnHover){
      if(isOver){
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.setState({class:"gallery__item__pic--hide",src:this.props.pics[0]});
      }else{
        this.startCycle();
      }
    }
    if(this.props.showOnHover){
      if(isOver){
        this.startCycle();
      }else{
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.setState({class:"gallery__item__pic--hide",src:this.props.pics[0]});
      }
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
     this.interval = setIntervalImmediate(()=>{
       this.setState({class:"gallery__item__pic--hide",src:this.props.pics[counter]});
       this.timeout = setTimeout(()=>{
         this.setState({class:"gallery__item__pic--show",src:this.props.pics[counter]});   
       },this.props.frequency/10)
       if(counter >= this.props.pics.length -1){
         counter = 0;
       }else{
         counter++;
       }  
     },this.props.frequency);
   }
   render(){
     return(
        <img style={{textIndent:"-9999px"}} onMouseEnter={()=>{this.onHover(true)}} onMouseLeave={()=>{this.onHover(false)}} className={this.props.class+ " " +this.state.class}  src={this.state.src} alt={"My Work"}/>
     )
   }
}


