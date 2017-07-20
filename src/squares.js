import React, { Component } from 'react';
import Square from "./square";
import star from "./assets/star.svg";
import "./squares.css";

/** 
    This component will contain all the square components
    @class
*/
export default class Squares extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div className={"squares "}>
                <Square title={design.title} pic={design.pic} part={design.parts}/>
                <Square title={seo.title} pic={seo.pic} part={seo.parts}/>
                <Square title={serviceWorker.title} pic={serviceWorker.pic} part={serviceWorker.parts}/>
                <Square title={api.title} pic={api.pic} part={api.parts}/>
                <Square title={spa.title} pic={spa.pic} part={spa.parts}/>
                <Square title={process.title} pic={process.pic} part={process.parts}/>
                <Square title={analysis.title} pic={process.pic} part={analysis.parts}/>
            </div>

        )
    }
}

Squares.defaultProps = {
    isShow:true,
    isLeft:true
}

let design = {
    title:"Design",
    pic:star,
    parts:[
        {
            title:"Custom Design",
            subTitle:"Every website is create with your business in mind",
            list:[
                "Design something memorable.",
                "Design something which says something special about your business.",
                "Responsive design which is optimised for mobile.",
                "Use the latest tools to impress your users" 
            ]
        },
        {
            title:"Mobile Optimised",
            subTitle:"Make sure every user gets the best experience possible.",
            list:[
                "Optimise all your websites assets.",
                "Responsive design allowing your users to clearly see your content on all devices ."
            ]
        }
    ]
};


let seo = {
    title:"Search Engine Optimisation",
    pic:star,
    parts:[
        {
            title:"Social Media",
            subTitle:"Allow the world to share your website",
            list:[
                "Include any platform you want from facebook to twitter.",
                "Bring greater traffic to your site through sharing",
            ]
        },
        {
            title:"Optimised for search engines",
            subTitle:"Give google what they want",
            list:[
                "Decide on what you want to sell, where you want to sell it and to whom and then add common keywords.",
                "Make your website fast and cacheable.",
                "Make adding content easy. So we have fresh content on a regular bases."
            ]
        }
    ]
};


let serviceWorker = {
    title:"Service Workers",
    pic:star,
    parts:[
        {
            title:"Cache your website",
            subTitle:"A majority of browsers allow you to cache your website",
            list:[
                "Allow your website to work offline",
                "If your user revisits your site then they are connected instantly",
            ]
        },
        {
            title:"Push Notification",
            subTitle:"Advertise directly to users",
            list:[
                "Let users know about your latest deals through mobile notifications.",
                "Notifications are more effective than users checking their email."
            ]
        }
    ]
};


let api = {
    title:"Connect to or create to any API",
    pic:star,
    parts:[
        {
            title:"Connect to other services",
            subTitle:"Many platforms have developed software which is beneficial to you business ",
            list:[
                "Get user picture and name to welcome them to your site ",
                "Add google maps or calender",
            ]
        },
        {
            title:"Create a service",
            subTitle:"Create, Read, Update and delete any information.",
            list:[
                "Store and manage information in a fast and predictable way.",
                "Create different user types to limit access to particular APIs"
            ]
        }
    ]
};


let spa = {
    title:"Single Page Applications",
    pic:star,
    parts:[
        {
            title:"An App for the web",
            subTitle:"",
            list:[
                "Seamless page transitons",
                "Describe complex user interface",
            ]
        }
    ]
};


let process = {
    title:"Development Process",
    pic:star,
    parts:[
        {
            title:"Documentation",
            subTitle:"Document your website",
            list:[
                "Every site comes with an additional website to describe how your website works",
                "Allow your next developer to start easily",
            ]
        },
        {
            title:"Testing",
            subTitle:"Test each component of your site.",
            list:[
                "Always know what works and what doesn't",
                "Keep an eye on development process",
            ]
        }

    ]
};

let security = {
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

let analysis = {
    title:"Data Analysis",
    pic:star,
    parts:[
        {
            title:"Display Data",
            subTitle:"",
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