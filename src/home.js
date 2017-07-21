import React, { Component } from 'react';
import * as _ from "lodash";
import ReactDOM from 'react-dom';
import Auth from "./auth";
import Square from "./square";
import star from "./assets/star.svg"; 
import Squares from "./squares";
import './home.css';


/** 
    This components' main function is to expose the the squares component when at the right scroll position.
    @class
*/
export default class Home extends Component {
    squares = [];
	constructor(props){
	  super(props)
	  this.state = {isShow:[]};
	}
    /** 
		Update isShow array so we have the right length. Must be called here so we get the refs.
		@function
	*/
	componentDidMount(){
		let isShow= [];
		for(let i=0; i < this.squares.length ; i++){
		    isShow.push(false);
		}
        Auth.getProfile(()=>{});
		this.setState({isShow:isShow});
	}
    /**
        Take the scroll position and check each time the location of the squares.
        Only update state if there has been a change.
        @function
    */
    componentWillUpdate(){
        let scrollTop = this.props.scrollTop;
        this.squares.map((ref,i)=>{
            if(ref){
	            let pos = ref.getBoundingClientRect();
		        if(pos.top < window.innerHeight*(1/2)){
		            let isShow = this.state.isShow;
	                if(isShow[i] === false){
			            isShow[i] = true;
			            this.setState({isShow:isShow});
	                }
		        }else{
		            let isShow = this.state.isShow;
	                if(isShow[i] === true){
			            isShow[i] = false;
			            this.setState({isShow:isShow});
	                }
		        }
            }
        });
    }
    /**
        If you ref a React component you need to use findDomNode to get the correct methods of DOM on ref.
    */
    render(){
        let tran = -1*this.props.scrollTop*0.5;
        console.log("show: " + this.state.isShow[0]);
        return (
            <div className="home">
	            <div style={{transform:'translateY(' + tran + 'px)'}} className={"home__header"} >
	                <h1>My Services</h1>
	            </div>
	            <div className={"home__gap"}/>
	            <section className={"home__info"}>
	                <p>
	                    I have a experience with a range of different languages, frameworks and libraries.
	                </p>
	                <p>
	                    Below is a list of my service related to web development
	                </p>
	            </section>
	            <Squares title={"Web Development"} isShow={this.state.isShow[0]} isLeft={true} ref={(ref)=>{this.squares.push(ReactDOM.findDOMNode(ref))}}>
	                <Square title={design.title} pic={design.pic} parts={design.parts}/>
			        <Square title={seo.title} pic={seo.pic} parts={seo.parts}/>
			        <Square title={serviceWorker.title} pic={serviceWorker.pic} parts={serviceWorker.parts}/>
			        <Square title={api.title} pic={api.pic} parts={api.parts}/>
			        <Square title={spa.title} pic={spa.pic} parts={spa.parts}/>
			        <Square title={process.title} pic={process.pic} parts={process.parts}/>
			        <Square title={analysis.title} pic={process.pic} parts={analysis.parts}/>
	            </Squares>
                <section className={"home__info"}>
                    <p>
                        Below is a list of my services related to more general software development, mathematics and physics. 
                    </p>
                </section>
                <Squares title={"General Services"} isShow={this.state.isShow[1]} isLeft={false} ref={(ref)=>{this.squares.push(ReactDOM.findDOMNode(ref))}}>
                    <Square title={design.title} pic={design.pic} parts={design.parts}/>
                    <Square title={seo.title} pic={seo.pic} parts={seo.parts}/>
                    <Square title={serviceWorker.title} pic={serviceWorker.pic} parts={serviceWorker.parts}/>
                    <Square title={api.title} pic={api.pic} parts={api.parts}/>
                    <Square title={spa.title} pic={spa.pic} parts={spa.parts}/>
                    <Square title={process.title} pic={process.pic} parts={process.parts}/>
                    <Square title={analysis.title} pic={process.pic} parts={analysis.parts}/>
                </Squares>
            </div>
      )
    }
}

Home.defaultProps = {
    title:"Alexander Morton",
    subTitle:"Web Developer",
    titleFont:"Lobster"
}


/**
    Example of layout of information.
    mainTitle:Topic
    titleInTitle:sections in that topic
    subtitle: The business case for this.
    list:How this is done.
    @object
*/
let design = {
    title:"Design",
    pic:star,
    parts:[
        {
            title:"Custom Design",
            subTitle:"Stun your users with something brand new.",
            list:[
                "Only build website which are unique and memorable",
                "All website are dynamic and interactive",
                "Use the latest technologies"
            ]
        },
        {
            title:"Mobile Optimised",
            subTitle:"Make sure every user gets the best experience possible.",
            list:[
                "Serve different assets for different devices",
                "Responsive design allowing your users to clearly see your content on all devices.",
                "Download content when needed and not all at once"
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
                "Allow your users to login easily",
                "Allow your users to share on the leading social networks",
                "Setup paid adverts on any platform you desire"
            ]
        },
        {
            title:"Search Engine Crawlers",
            subTitle:"Get the highest ranking possible",
            list:[
                "Develop a marketing strategy for the people you want to sell to.",
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
            title:"Load Once View Anywhere",
            subTitle:"Allow your users to work with your site offline",
            list:[
                "Cache your website on most browsers",
                "For repeat visits prompt the user to install your site",
            ]
        },
        {
            title:"Push Notification",
            subTitle:"Advertise directly to users",
            list:[
                "Let users know about your latest deals through mobile notifications.",
                "No longer send ineffective spam emails."
            ]
        }
    ]
};


let api = {
    title:"APIs",
    pic:star,
    parts:[
        {
            title:"Existing Services",
            subTitle:"Save yourself time and money and don't reinvent the wheel",
            list:[
                "Integrate existing tools into your web application",
                "Link multiple tools through a single user interface",
            ]
        },
        {
            title:"Create a service",
            subTitle:"Create, Read, Update and delete any information.",
            list:[
                "Store and manage information in a fast and predictable way.",
                "Link your service to existing services",
                "Build microservices to reduce the hosting costs"
            ]
        }
    ]
};


let spa = {
    title:"Single Page Applications",
    pic:star,
    parts:[
        {
            title:"No more loading",
            subTitle:"Once your app has downloaded your ready to go",
            list:[
                "Build seamless page transitions",
                "Download assets without blocking the user",
            ]
        },
        {
            title:"Stateful",
            subTitle:"No limit on how complex your site can be",
            list:[
                "Only update what needs to change.",
                "Break your site into individual components.",
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
            subTitle:"Make future development easy",
            list:[
                "Every site comes with an additional website to describe how your website works",
                "The most complex parts come with detailed explanations.",
            ]
        },
        {
            title:"Testing",
            subTitle:"Develop quickly and effectively",
            list:[
                "Always know what works and what doesn't",
                "Keep an eye on development process",
                "Build with test driven development"
            ]
        },
        {
            title:"Version Control",
            subTitle:"Keep up to date version of your website which works with anyone",
            list:[
                "Use github or svn to log every change",
                "Keep simple and informed commits so any future developer can start work instantly",
            ]
        }

    ]
};

let security = {
    title:"Security",
    pic:star,
    parts:[
        {
            title:"Encryption",
            subTitle:"Keep all your users information safe",
            list:[
                "Every Web Application comes with encryption as standard.", 
                "Use HTTPs to communicate between server and browser.",
                "Users first impression is of trust and professionalism.",
                "Higher google rankings."
            ]
        },
        {
            title:"Accounts",
            subTitle:"Interact with your app securely anyway you want.",
            list:[
                "Use google facebook or any other service to login",
                "Store passwords safely with hashes."
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