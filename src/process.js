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
            let para = el.info.map((el2,i)=>{
                return (
                    <p key={i}>
                        {el2}
                    </p>
                )
            });
            return (
                <div>
                    <article key={i} className={"process__item"}>
                        <div className={"process__left"}>
                            <img src={el.title} alt={"design"}/>
                        </div>
                        <div className={"process__right"}>
                            {para}
                        </div>

                    </article>

                    <hr className="process__line"/>
                </div>
            )
        });
        return (
            <section className={"process"}>
                <h1>
                    {this.props.titleInfo}
                </h1>
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
                "I start with producing a static wireframe of your site for you to approve. This includes designing you a logo for your business which can be used for business cards, stationary and other paraphernalia.",
                "I design every application to say something special about your business and since I never use templates the sky is the limit on what we can build together.",
                "I focus on making your brand memorable and professional looking on all devices. "
            ]
        },
        {
            title:developTitle,
            info:[
                "Most of my websites are single page applications so I can create complex user interfaces easily, currently I use react.",
                "I link most of my websites to custom made backend powered by node js. Which gives me the flexability in adding functionality to your site.",
                "However, I can move to other frontend and backend frameworks if you already have a site up and running.",
                "With my background in mathematics I can manage any complex data you have, I'm able to build applications which analyses your data and then displays it in an approachable way.",
                "I only build fully tested and documented software. This allows you to easily upgrade your site in the future."
            ]
        },
        {
            title:deployTitle,
            info:[
                "I take security seriously, this is why I include SSL certificates as standard on all my websites.",
                "Most of my websites are hosted on digital ocean on a docker droplet. This reduces your hosting cost by only paying for what you use.",
                "Every website I build is fast, content rich and designed to maximise your google rankings. I use a range of tools to achieve this and every website goes through checks to make sure your achieving your advertising goals.",
                "For your long term goals, I setup and teach you, or your employees, how to use a range of tools, such as google analytics, adwords, or any other tool you desire."
            ]
        }
    ]
}