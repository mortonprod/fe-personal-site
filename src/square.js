import React, { Component } from 'react';
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";
import star from "./assets/star.svg";
import "./square.css";

/** 
    Render all to begin with for SEO considerations for server side rendering.
    Only 1 layer should be exposed at a time. It works as a flip notebook.

    When you click for to move an element you:
    1. Bring element below to z-index 1. 
    1. Add transition to element show(z-index 2) to move it up
    2. Change z-index of element below to z-index 2 and and the one above z-index 0. 
    2. Remove transition to move element back into stack.

    @class
*/
export default class Squares extends Component {
    /**
        Create state to manage flip notebook class states.
    */
    constructor(props){
        super(props);
        this.state = {modifier:defaultModifier(props.parts),elements:null,listModifier:""};
    };

    /**
        Different function used to deal with different number of layers. 
        This function deals with setting state and the external function deal with working out what is should be.
        @function
    */
    clickForwards(index){
        let obj = null
        if(this.state.modifier.length === 2){
            obj = forwardsTwo(index,this.state.modifier);

        }else{
            obj = forwardsThreeOrMore(index,this.state.modifier)
        }
        this.setState({modifier:obj.initial});
        setTimeout(()=>{
            this.setState({modifier:obj.final}); 
        },500);
    };
    /**
        When we click we want to move in a list.
        Create list offscreen then move in. Must check another element does not have control. If so then remove.
        Since we use transform css on parent which create local coordinate system. This means that fixed will act as absolute positioned element. 
        Therefore we can't used fixed.
        @function
    */
    clickShow(el,e){
	    let elements = el.list.map((item,j)=>{
	        return (
	            <li key={j}>
	                {item}
	            </li>
	        )
	    });

        this.setState({elements:elements});
        setTimeout(()=>{
            this.setState({listModifier:"square__list--show"});
        },500);
    }
    /**
        Move list offscreen and then remove.
        @function
    */
    clickHide(){
        this.setState({listModifier:""});
        setTimeout(()=>{
            this.setState({elements:null});
        },500);
    }
    /**
        Render everything here so we can update the class state for each click.
        Each article will pass a list to clickShow Which will render on click. 
        @function.
    */
    render(){
        let list = (
            <div className={"square__list " + this.state.listModifier}>
                <h1>How to achieve this</h1>
                <ul>
                    {this.state.elements}
                </ul>
                <button onClick={this.clickHide.bind(this)}>Show less</button>
            </div>
        )
        let articles = this.props.parts.map((el,i)=>{
            return (
               <article key={i} className={"square__layer " + this.state.modifier[i+1]} onClick={this.clickForwards.bind(this,i+1)}>
                    <h3>{el.title}</h3>
                    <h4>{el.subTitle}</h4>
                    <button onClick={(event)=>{event.stopPropagation();this.clickShow.bind(this,el)()}}> Show More </button>
                </article> 
            )
        });
        let section = ()=>{ 
            return (
	            <section className={"square"}>
	                {articles}
	                <article className={"square__layer " + this.state.modifier[0]} onClick={this.clickForwards.bind(this,0)}>
	                    <img src={this.props.pic} alt={this.props.title}/>
	                    <h1>{this.props.title}</h1>
	                </article>
	                {list}
	            </section>
            )
        }
        return (
            section()
        )
    };
};


Squares.defaultProps = {
    title:"Security",
    pic:star,
    parts:[
        {
            title:"HTTPS",
            subTitle:"Every Web Application comes with encryption as standard.",
            list:[
                "Keeps your users data safe.",
                "Users first impression is of trust and professionalism.",
                "Higher google rankings." 
            ]
        },
        {
            title:"Accounts",
            subTitle:"Interact with your app securely anyway you want.",
            list:[
                "Use google facebook or any other service to login",
                "Create any administration accounts so you can easily and safely edit your application."
            ]
        }
    ]
};


export function defaultModifier(parts){
    let modifier = [];
    modifier.push("square__layer--zIndex2");
    for(let i=0 ; i < parts.length ; i++){
        if(i===0){
            modifier.push("square__layer--zIndex1");
        }else{
            modifier.push("");
        }
    }
    return modifier;
};
/**
    On the condition of updating only two layers pass to this function. 
    It will only work out what state you need to apply. Need to use settimeout to do this in the right order.
    @function
*/
export function forwardsTwo(index,modifier){
    let initial = JSON.parse(JSON.stringify(modifier));;
    initial[index] = "square__layer--zIndex2 square__layer--moveUp";
    let final = JSON.parse(JSON.stringify(initial));

    if(index === 0){
        final[index] = "";
        final[index+1] = "square__layer--zIndex2";
    }else{
        final[index] = "";
        final[0] = "square__layer--zIndex2";
    }
    return {initial,final}
}

/**
    Use this function to deal with three layers or more.
    Need to change behaviour so we return back to the start when flipped to the end.
    Only the state is worked out here and passed to the set timeout function to set the state.
    @function
*/
export function forwardsThreeOrMore(index,modifier){
    let initial = JSON.parse(JSON.stringify(modifier));;
    initial[index] = "square__layer--zIndex2 square__layer--moveUp";
    let final = JSON.parse(JSON.stringify(initial));
    if(index +2 <= modifier.length -1 ){//Still at least two at the end.
        final[index] = "";
        final[index+1] = "square__layer--zIndex2";
        final[index+2] = "square__layer--zIndex1";
        return {initial,final};
    }else if(index +1 === modifier.length -1){//Two from end.
        final[index] = "";
        final[index+1] = "square__layer--zIndex2";
        final[0] = "square__layer--zIndex1";
        return {initial,final};
    }else{///The very end
        final[index] = "";
        final[0] = "square__layer--zIndex2";
        final[1] = "square__layer--zIndex1";
        return {initial,final};
    }
}