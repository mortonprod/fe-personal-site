import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import Scrollchor from 'react-scrollchor';
import Auth from "./auth";
import * as _ from "lodash";
import Square from "./square";
import star from "./assets/star.svg"; 
import layers from "./assets/layers.svg";
import googlePlus from "./assets/google-plus.svg";
import worker from "./assets/worker.svg";
import mindmap from "./assets/mindmap.svg";
import spaIcon from "./assets/spaIcon.svg";
import clock from "./assets/anti-clockwise.svg";
import locked from "./assets/locked.svg";
import problem from "./assets/problem.svg";
import solution from "./assets/solution.svg";
import mail from "./assets/mail.png";
import Squares from "./squares";
import Process from "./process";
import TitlePicInfo from "./titlePicInfo/titlePicInfo";
import understand from "./assets/Understand.svg";
import iterate from "./assets/Iterate.svg";
import guarantee from "./assets/Guarantee.svg";
import help from "./assets/help.svg";
import idea from "./assets/idea.svg";
import './home.css';



let processProps = {
    title:null,
    titleInfo:"Designing Software in Three steps",
    list:[
        {
            title:understand,
            info:[
                "First I need to get a handle on the problem you currently have. You need to give me a quick explanation of what you want with a link to the current code base you are working with.",
                "This might be single page of details and a link to your current github repository and require me to synergize with member of your current team.",
                "Once I have a grasp of what you require we can decide on a set of goals to achieve in an allotted time scale."
            ]
        },
        {
            title:iterate,
            info:[
                "I will begin to complete the task set. Current progress can be constantly tracked on github or any other platform you use for code management and issue tracking.",
                "I allow for goals to change as the project progresses but this must be in keeping with previous goals and can't be additional requests",
                "Additionally, I document all my work as a standard and will even put this documentation online for you if requested. This makes your life and the life of your future developers easier."
            ]
        },
        {
            title:guarantee,
            info:[
                "It is mutually beneficial to me and my clients for my work to perform well over the time scale you require it",
                "Therefore, I guarantee all my clients that I will not ignore any future concerns my code base my cause.",
                "This includes follow up meeting if you need me to pass on my work to any future developers you may have."
            ]
        }
    ]
}




/** 
    This components' main function is to expose the the squares component when at the right scroll position.
    @class
*/
class Home extends Component {
    squares = [];
    squ = null;
	constructor(props){
	  super(props)
	  this.state = {isShow:[],scrollPos:[],scrollTop:0};
      this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
	}
    /** 
		Update isShow array so we have the right length. Must be called here so we get the refs.
        
		@function
	*/
	componentDidMount(){
        window.addEventListener('scroll', this.scroll.bind(this));
		let isShow= [];
		for(let i=0; i < this.squares.length ; i++){
		    isShow.push(false);
		}

		this.setState({isShow:isShow});
        this.squares.forEach((ref)=>{
            this.state.scrollPos.push(ref.getBoundingClientRect().top);
        });
	}
    componentWillUnmount(){
        window.removeEventListener('scroll', this.scroll.bind(this));
    }
    /** 
        THIS CAN'T BE IN APP MAIN SINCE THIS WILL UPDATE STATE AN CAUSE THE FULL ROUTER TO RELOAD.
        CAN PUT IN UTILITY FUNCTION???
        ALWAYS SET SCROLLLEFT TO ZERO SO WE DO NOT SEE SCREEN WHERE TRANSFORM ELEMENT ENTER. OVERFLOW-X ONLY HIDES IT DOES NOT PREVENT SCROLL.
        @function
    */
    scroll(event){
        //if(document.body.scrollLeft !== 0 ){
            document.body.scrollLeft = 0;
        //}
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.setState({scrollTop:scrollTop});
    }
    /**
        Take the scroll position and check each time the location of the squares.
        Only update state if there has been a change.
        @function
    */
    componentWillUpdate(){
        this.squares.forEach((ref,i)=>{
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
        let tran = -1*this.state.scrollTop*0.2;
        console.log("show: " + this.state.isShow[0]);
        return (
            <div className="home">
	             <Helmet>
	                 <title>Software Developer | Alexander Morton</title>
	                <meta name="description" content="An introduction to the services I provide." />
	            </Helmet>
	            <div style={{transform:'translateY(' + tran + 'px)'}} className={"home__header"} >
	                <h1>My Services</h1>
                    <h2>Developing At the Zenith</h2>
	            </div>
                <div className={"home__gap"}/>
                <TitlePicInfo info={startInfo}>
                    <div className="titlePicInfo__scroll">
                        <Scrollchor animate={{offset: -50, duration: 1000}} to={"details"}>Skip to the Details</Scrollchor>
                    </div>
                </TitlePicInfo>
                <article className={"home__problems"}>
                    <div className={"home__problem"}>
                        
                        <h1>
                            Web Development
                        </h1>
                        <p>
                            I develop react and node web applications. 
                        </p>
                        <p>
                            Using react allows me to produce fast, highly interactive user interfaces for a variety of different purposes.
                        </p>
                        <p style={{paddingBottom:"0px"}}>
                            I am not a designer by trade but my development skills allow me to get the most out of modern browsers to impress your users.
                        </p>
                        <div className="titlePicInfo__scroll">
                            <Scrollchor animate={{offset: -50, duration: 1000}} to={"web"}>Learn More</Scrollchor>
                        </div>
                    </div>
                    <div className={"home__problem"}>
                        
                        <h1>
                            Data Analysis
                        </h1>
                        <p>
                            I can understand most advanced mathematics and physical systems to quickly solve any problem you currently have. 
                        </p>
                        <p>
                            This may be implementing numerical methods to solve differential equations or perform CPU intensive data analysis.
                        </p>
                        <p>
                            Additionally, if you need a piece of code debugging then I am always happy to help.
                        </p>
                        <div className="titlePicInfo__scroll">
                            <Scrollchor animate={{offset: -50, duration: 1000}} to={"analysis"}>Learn More</Scrollchor>
                        </div>
                    </div>
                </article>



                <div className={"home__gap home__gap--small"}/>
                <div id={"web"}>
                    <Process/>
                </div>
                <div className={"home__gap home__gap--small"}/>
                <div id={"analysis"}>
                    <Process {...processProps}/>
                </div> 
                <div id={"details"}>
		            <Squares  title={"More Details"} isShow={this.state.isShow[0]} isLeft={true} ref={(ref)=>{this.squares.push(ReactDOM.findDOMNode(ref))}}>
		                <Square title={design.title} pic={design.pic} parts={design.parts}/>
				        <Square title={seo.title} pic={seo.pic} parts={seo.parts}/>
				        <Square title={serviceWorker.title} pic={serviceWorker.pic} parts={serviceWorker.parts}/>
				        <Square title={api.title} pic={api.pic} parts={api.parts}/>
				        <Square title={spa.title} pic={spa.pic} parts={spa.parts}/>
				        <Square title={process.title} pic={process.pic} parts={process.parts}/>
				        <Square title={security.title} pic={security.pic} parts={security.parts}/>
		            </Squares>
                </div>
                <TitlePicInfo info={solutionInfo}/>
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
    pic:layers,
    parts:[
        {
            title:"Custom Design",
            subTitle:"It's important to design your site to be memorable and professional",
            list:[
                "Only build websites which reflect your business and not just another template.",
                "All website are dynamic and interactive.",
                "Use dynamics svg or HTML5 canvas to produce animations.",
                "Use the latest frontend frameworks to produce the smoothest journey for your users."
            ]
        },
        {
            title:"Mobile Optimised",
            subTitle:"Make sure every user gets the best experience possible",
            list:[
                "Consider bandwidth when serving network intensive content.",
                "Responsive design allowing your users to clearly see your content on all devices.",
                "Serve content only when it's needed."
            ]
        }
    ]
};


let seo = {
    title:"Search Engine Optimisation",
    pic:googlePlus,
    parts:[
        {
            title:"Social Media",
            subTitle:"Allow the world to share your website",
            list:[
                "Allow your users to login easily.",
                "Allow your users to share on the leading social networks.",
                "Setup paid adverts on any platform you desire."
            ]
        },
        {
            title:"Search Engine Crawlers",
            subTitle:"Get the highest ranking possible",
            list:[
                "Develop a marketing strategy for the people you want to sell to.",
                "Make your website fast and cacheable.",
                "Make adding content easy."
            ]
        }
    ]
};


let serviceWorker = {
    title:"Service Workers",
    pic:worker,
    parts:[
        {
            title:"Load Once View Anywhere",
            subTitle:"Allow your users to work with your site offline",
            list:[
                "Cache your website on most browsers.",
                "For repeat visits prompt the user to install your site.",
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
    pic:mindmap,
    parts:[
        {
            title:"Existing Services",
            subTitle:"Save yourself time and money and don't reinvent the wheel",
            list:[
                "Integrate existing tools into your web application.",
                "Link multiple tools through a single user interface."
            ]
        },
        {
            title:"Create a Service",
            subTitle:"Create, Read, Update and delete any information.",
            list:[
                "Store and manage information in a fast and predictable way.",
                "Link your service to existing services.",
                "Build microservices to reduce your hosting costs."
            ]
        }
    ]
};


let spa = {
    title:"Single Page Applications",
    pic:spaIcon,
    parts:[
        {
            title:"No More Loading",
            subTitle:"Once your app has downloaded your ready to go",
            list:[
                "Build seamless page transitions.",
                "Download assets without blocking the user.",
            ]
        },
        {
            title:"Manage Complex State",
            subTitle:"No limit on how complex your site can be",
            list:[
                "Only update what needs to change.",
                "Break your site into individual components.",
                "Build a fully functioning application."
            ]
        }
    ]
};


let process = {
    title:"Development Process",
    pic:clock,
    parts:[
        {
            title:"Documentation",
            subTitle:"Make future development easy",
            list:[
                "Every site comes with an additional website to describe how your website works.",
                "Explain your site line by line.",
                "The most complex parts come with detailed explanations."
            ]
        },
        {
            title:"Testing",
            subTitle:"Develop quickly and effectively",
            list:[
                "Always know what works and what doesn't.",
                "Keep an eye on development process.",
                "Build with test driven development."
            ]
        },
        {
            title:"Version Control",
            subTitle:"Keep up to date version of your website which works with anyone",
            list:[
                "Use github or svn to log every change.",
                "Keep simple and informed commits so any future developer can start work instantly.",
            ]
        }

    ]
};

let security = {
    title:"Security",
    pic:locked,
    parts:[
        {
            title:"Encryption",
            subTitle:"Keep all your users information safe to build a professional and high ranking site.",
            list:[
                "Every web application comes with HTTPS encryption as standard.", 
            ]
        },
        {
            title:"Accounts",
            subTitle:"Interact with your app securely anyway you want.",
            list:[
                "Use google facebook or any other service to login.",
                "Only store user information if needed and defer to external providers.",
                "Send and store passwords safely on your server."
            ]
        }
    ]
};

let startInfo = {
    title:"So you have a problem...",
    pic:help,
    paragraphs:[
        "You may need a simple website or a full-fledged web application. You many need software to produce, analyse or model data. You may even need both. In any case, I would love to hear from you.",
        "I have experience in a variety of different fields, programming languages and frameworks. So I may be able to solve your current issues and save you hiring a team of people to do a job.",
        "If this sound like you then continue reading or skip to the details of my services."
    ]
}


let solutionInfo = {
    title:"The Solution.",
    pic:idea,
    paragraphs:[
        "If you would like to learn more or think you would benefit from my services then send me an email"
    ]
}

export default Home;