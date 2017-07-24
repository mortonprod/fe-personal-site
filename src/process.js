import React, { Component } from 'react';
import processStar from "./assets/processStar.svg";
import processTitle from "./assets/titleProcess.svg";
import processDesign from "./assets/processDesign.svg";
import developTitle from "./assets/developTitle.svg";
import deployTitle from "./assets/deployTitle.svg";
import "./process.css";
/** 
    This component is basically produces a list. 
    @class
*/
export default class Process extends Component {
    constructor(){
        super();
    }
    render(){
        let list = this.props.list.map((el,i)=>{
            let num = i + 1;
            if(num === 1){
                num = num + "st";
            }else if(num === 2){
                num = num + "nd";
            }else if( num === 3){
                num = num + "rd"; 
            }else{
                num = num + "th"; 
            }
            let para = el.info.map((el2)=>{
                return (
                    <p>
                        {el2}
                    </p>
                )
            });
            return (
                <article className={"process__item"}>
                    <div className={"process__left"}>
                        <div className={"process__star"}>
                            <img src={processStar} alt={"star"}/>
                            <span>
                                {num}  
                            </span>
                        </div>
                        <img src={el.title} alt={"design"}/>
                    </div>
                    <div className={"process__right"}>
                        {para}
                    </div>
                </article>
            )
        });
        return (
            <section className={"process"}>
                <div className={"process__title"}>
                    <img src={this.props.title} alt={"title"}/>
                </div>
                <p>
                    {this.props.titleInfo}
                </p>
                {list}
            </section>
            
        )
    }
}

Process.defaultProps ={
    title:processTitle,
    titleInfo:"Creating your web application in three simple steps",
    list:[
        {
	        title:processDesign,
	        info:[
                "I start with designing you a logo for your business which can be used for business cards, stationary and other paraphernalia.",
                "I design every application to say something special about your business and since I never use templates the sky is the limit on what we can build together.",
                "I focus on making your brand memorable and professional looking on all devices. "
            ]
        },
        {
            title:developTitle,
            info:[
                "All my websites are single page applications so I can create complex user interfaces easily",
                "I link all my websites to custom made backend powered by node js. Giving me the flexability in adding functionality to your site.",
                "I only build fully tested and documented software."
            ]
        },
        {
            title:deployTitle,
            info:[
                "A take security seriously, this is why I include SSL certificates as standard on all my websites.",
                "All my websites are hosted with docker. This reduces your hosting cost by only paying for what you use.",
                "All websites I deploy come with a range tools setup for you, such as google analytics, adwords, or any other tool you desire."
            ]
        }
    ]
}