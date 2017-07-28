import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import Vivus from "vivus";
import Helmet from 'react-helmet';
import Auth from "./auth";
import * as _ from "lodash";
import PieChart from "./pieChart";
import google from "./assets/google.svg";
import youtube from "./assets/youtube.svg";
import boy from "./assets/boy.svg";
import portfolioLogo from "./assets/portfolioLogo.svg";
import branding from "./assets/branding.svg";
import reactIcon from "./assets/reactIcon.svg";
import nodeIcon from "./assets/nodejs-icon.svg";
import storeSvg from "./assets/store.svg";
import format from "./assets/formats.svg";
import cms from "./assets/cms.svg";
import services from "./assets/services.svg";
import docs from "./assets/docs.svg";
import Account from "./account";
import Stocks from "./stocks";
import "./skills.css";


let pieChartBig = {
    width:500,
    height:500,
    innerRadius: 50,
    outerRadius: 150,
    labelRadius: 175
}

let factor = 0.5;
let pieChartSmall = {
    width:500*factor +50,
    height:500*factor + 50,
    innerRadius: 50*factor,
    outerRadius: 150*factor,
    labelRadius: 175*factor
}


let stocksSmall = {
    width:200,
    height:200,
    timeDomain:20, // Only take 20 minutes of data.
    isChase:true,
    isGetAll:true,
    margin: {
        top:50,
        left:50
    }
}



let stocksBig = {
    width:400,
    height:400,
    timeDomain:20, // Only take 20 minutes of data.
    isChase:true,
    isGetAll:true,
    margin: {
        top:50,
        left:50
    }
}


export default class Skills extends Component {
   isRun=true;
   writeElement = null;
   /**
    Calling set state through resize in constructor not working. REMOVED!
   */
   constructor(props){
    super();
    if(window.innerWidth < 500){
        this.state = {scrollTop:0,profile:null,pieChartInfo:pieChartSmall,stocksChartInfo:stocksSmall};
    }else{
        this.state = {scrollTop:0,profile:null,pieChartInfo:pieChartBig,stocksChartInfo:stocksBig};
    }
    this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
    //Auth.addSetState(this.setState.bind(this));
    this.resize = _.debounce(this.resize,200,{leading:false,trailing:true});
   }
   scroll(event){
        //if(document.body.scrollLeft !== 0 ){
            document.body.scrollLeft = 0;
        //}
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.setState({scrollTop:scrollTop});
        if(this.writeElement){
	        let pos = this.writeElement.getBoundingClientRect();
	        if(pos.top < window.innerHeight*(1/2)){
	            if(this.isRun){
	                new Vivus("store",{duration:"2000",start:"autostart",file:storeSvg}); 
	            }
	            this.isRun = false;
	            
	        }
        }
    }
   componentDidMount(){
        window.addEventListener('scroll', this.scroll.bind(this));
        window.addEventListener('resize',this.resize.bind(this));
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB47UL58deXimo5mq7v3xNO0GdWlexqnAc&callback=initMap";
        script.async = true;
        document.body.appendChild(script);
   }
   resize(event){
        if(window.innerWidth < 500){
            this.setState({pieChartInfo:pieChartSmall,stocksChartInfo:stocksSmall});
        }else{
            this.setState({pieChartInfo:pieChartBig,stocksChartInfo:stocksBig});
        }
    }
   componentWillUnmount(){
        window.removeEventListener('scroll', this.scroll.bind(this));
        window.removeEventListener('resize', this.resize.bind(this));
   }
	 _onReady(event) {
	    // access to player in all event handlers via event.target 
	    event.target.pauseVideo();
	  }
    render() {
        let writeMe =(
	        <object
	            src={storeSvg} 
	            className="store__title" id="store">
	        </object>
        )
		let wel = null
		if(this.state.profile){
            let nickname = "";
            if(this.state.profile.nickname){
                nickname= " AKA " + this.state.profile.nickname
            }
			wel = (
                <div className={"skills__account"}>
				    <h3>
				        Welcome back
				    </h3>
                    <h3>
                        {this.state.profile.name}
                    </h3>
                    <h4>
                        {nickname}
                    </h4>
	                <img src={this.state.profile.picture} alt="profile" />
                </div>
			)
			}else{
			wel = (
                <div className={"skills__account"}>
                    <h3>
                        Sign to Learn More
                    </h3>
                    <div className={"skills__button"}>
                        <Account profile={this.state.profile}/>
                    </div>
                </div>
			)
		}
      let tran = -1*this.state.scrollTop*0.5;
      return (
        <div className={"skills"}>
             <Helmet>
                 <title>Freelance Web Designer | Alexander Morton</title>
                <meta name="description" content="Highlights of my skills and expertise." />
            </Helmet>
	        <div style={{transform:'translateY(' + tran + 'px)'}} className={"skills__header"} >
	            <h1>My Skill</h1>
                <h2>
                    The Highlights...
                </h2>
            </div>
            <div className={"skills__gap"}/>
            <section className={"skills__overview"}>
                <h1>
                    Overview 
                </h1>
                <div>
                    <PieChart width={this.state.pieChartInfo.width}
                        height={this.state.pieChartInfo.height}
                        innerRadius={this.state.pieChartInfo.innerRadius}
                        outerRadius={this.state.pieChartInfo.outerRadius}
                        labelRadius={this.state.pieChartInfo.labelRadius}
                    />
                </div>
            </section>
            <section>
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={reactIcon} alt={"react"}/>
                        <h2>
                            React
                        </h2>
                        <p>
                            I use react to produce the majority of my sites.
                            React gives me the ability to create fast, modular components.
                        </p>
                        <p>
                            By implementing server side rendering with each build, I gain the benefits of a single page application and a static website.
                        </p>
                        <p>
                            React also allows you to easily port your code to develop native mobile apps or even desktop apps.
                        </p>
                    </div>
                    <div className={"skills__info"}>
                        <img src={nodeIcon} alt={"react"}/>
                        <h2>
                            Node
                        </h2>
                        <p>
                            Node lets me use javascript in creating your server, breaking down the boundary between browser and server.
                        </p>
                        <p>
                            A fast, versatile server which can easily scale up as you expand your business.
                        </p>
                    </div>
                </article>



	            <article className={"skills__skill"}>
	                <div className={"skills__info"}>
	                    <img src={google} alt={"google maps"}/>
		                <h2>
	                        Tools
		                </h2>
	                    <p>
	                        I can integrate google maps, analytics and adwords into your web application. 
	                    </p>
                        <p>
                            I also use a series of other SEO and webmaster tools to make sure all my websites are functioning correctly. 
                        </p>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <div id="map"></div>
	                </div>
	            </article>
	            <article className={"skills__skill"}>
	                <div className={"skills__info"}>
	                    <img src={cms} alt={"media"}/>
	                    <h2>
	                        Content Management
	                    </h2>
                        <p>
                            Videos, photos, blog posts... the list is endless... I'm comfortable working with any form your content takes. 
                            The demand for content from your server is constant. 
                            I can manage concurrent demands on your server, to deliver content quickly and efficiently.
                        </p>
	                    <p>
	                        You need to upload content before people can see it. I make uploading anything a breeze, 
                            designing you a single user interface, to your specification, which links to every aspect of maintaining your website.
	                    </p>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <YouTube video="i0aBEmzRE_U" autoplay="0" rel="0" modest="1" />,
	                </div>
	            </article>
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={services} alt={"media"}/>
                        <h2>
                            Services
                        </h2>
                        <p> 
                            You can integrate external services into your websites user interface. 
                            With almost unlimited tools to make your life easier this freedom is essential.   
                        </p>
                        <p>
                            Furthermore, you can specify exact how you want to visualise your data. Invaluable for complex data analysis.
                        </p>
                    </div>
                    <div className={"skills__centreMedia"}>
                        <Stocks width={this.state.stocksChartInfo.width}
                            height={this.state.stocksChartInfo.height}
                            margin={this.state.stocksChartInfo.margin}
                        />
                    </div>
                </article> 


                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={docs} alt={"media"}/>
                        <h2>
                            Documentation
                        </h2>
                        <p>
                            I produce all my documentation using jsdocs. 
                            This allows me to keep a guide of my progress and explain my reasoning to future developers working on my project.
                        </p>
                        <p>
                            Check out the documentation for this site as an example.
                        </p>
                        <a href={"/__documentation/frontend/"}> See Documentation </a>
                    </div>
                </article> 


                <article className={"skills__skill"} ref={(ref)=>{this.writeElement = ReactDOM.findDOMNode(ref)}}>
                    <div className={"skills__info"}>
                        <img src={format} alt={"media"}/>
                        <h2>
                            Styles
                        </h2>
                        <p>
                            I go beyond basic template styling in making your store front stand out.
                        </p>
                        <p>
                            I wireframe all my websites before production so my clients can see what we're building.
                            I then export the appropriate resources for each component of the user interface. 
                        </p>
                        <p>
                            I employ javascript frameworks and libraries to interact with each component. 
                            This includes svg components using libraries like d3 and vivus. Useful for creating charts or even simulated drawing on the screen.
                        </p>
                        <p>
                            I can also use the browsers canvas to render pixel by pixel images. 
                            This is particularly useful for CPU intensive applications like javascript games.  
                        </p>
                    </div>
                    <div className={"skills__centreMedia"}>
                        {writeMe}
                    </div>
                </article>


	            <article className={"skills__skill"}>
	                <div className={"skills__info"}>
	                    <img src={branding} alt={"individual"}/>
	                    <h2>
	                        Creating a brand
	                    </h2>
	                    <p>
	                        Create Logos, posters and stationary, 
                            giving you the freedom to design your own store front. 
                            So you can convey to your customers that your business is special and not just another template.
	                    </p>
	                    <p>
                            Basically, the skys the limit, if you can draw it then I should be able to render it on a website for you. This is not always true, but it usually is. 
	                    </p>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <img src={portfolioLogo} alt={"portfolio logo"}/>
	                </div>
	            </article>
            </section>
        </div>
      )
   }
}


var YouTube = React.createClass({
  render: function() {
    var videoSrc = "https://www.youtube.com/embed/" + 
        this.props.video + "?autoplay=" + 
        this.props.autoplay + "&rel=" + 
        this.props.rel + "&modestbranding=" +
        this.props.modest;
    return (
      <div className="container">
        <iframe title="Youtube video" id="player" type="text/html" width="100%" height="100%"
  src={videoSrc}
  frameBorder="0"/>
      </div>
    );
  }
});
