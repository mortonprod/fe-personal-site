import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import Vivus from "vivus";
import Helmet from 'react-helmet';
import Auth from "./auth";
import * as _ from "lodash";
import google from "./assets/google.svg";
import youtube from "./assets/youtube.svg";
import boy from "./assets/boy.svg";
import portfolioLogo from "./assets/portfolioLogo.png";
import branding from "./assets/branding.svg";
import reactIcon from "./assets/reactIcon.svg";
import nodeIcon from "./assets/nodejs-icon.svg";
import storeSvg from "./assets/store.svg";
import format from "./assets/formats.svg";
import cms from "./assets/cms.svg";
import services from "./assets/services.svg";
import docs from "./assets/docs.svg";

import alignRight from "./assets/alignment-rightSide.png";
import alignBigger from "./assets/alignmentBigger.png";
import scatterDown from "./assets/scatterDownZProjection.png";
import scatterXYZ from "./assets/scatteringProjectionXYZ.png";

import beame3b1 from "./assets/beamE3B1-1.png";
import beame5b1 from "./assets/beamE5B1-1.png";
import chie5b1 from "./assets/chi2E5B1-1.png";
import drmean from "./assets/dr-mean-all-pT-GA-Log-1.png";


import asyncComponent from "./asyncComponent";


import "./skills.css";

const AsyncStock = asyncComponent(() => import('./stocks'));
const AsyncPieChart = asyncComponent(() => import('./pieChart'));
const AsyncDiagram = asyncComponent(() => import('./sliderDiagram'));


/**
    Settings of Slider.
*/
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true
};




let pieChartBig = {
    width:500,
    height:500,
    innerRadius: 50,
    outerRadius: 150,
    labelRadius: 160
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
        left:100
    }
}
/**
  This is the full component for the skills page.
  @class
*/

class Skills extends Component {
   isRun=true;
   writeElement = null;
   stockElement = null;
   pieElement = null;

   constructor(props){
    super();
    if(window.innerWidth < 500){
        this.state = {scrollTop:0,profile:null,pieChartInfo:pieChartSmall,stocksChartInfo:stocksSmall,isShowStock:false,isShowPieChart:false,isShowDiagram1:false,isShowDiagram2:false};
    }else{
        this.state = {scrollTop:0,profile:null,pieChartInfo:pieChartBig,stocksChartInfo:stocksBig,isShowStock:false,isShowPieChart:false,isShowDiagram1:false,isShowDiagram2:false};
    }
    this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
    //Auth.addSetState(this.setState.bind(this));
    this.resize = _.debounce(this.resize,500,{leading:false,trailing:true});
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
        if(this.stockElement){
            let pos = this.stockElement.getBoundingClientRect();
            if(pos.top < window.innerHeight*(1/2)){
                this.setState({isShowStock:true});
            }
        }
        if(this.pieElement){
            let pos = this.pieElement.getBoundingClientRect();
            if(pos.top < window.innerHeight*(1/2)){
                this.setState({isShowPieChart:true});
            }
        }
        if(this.diagramElement1){
            let pos = this.diagramElement1.getBoundingClientRect();
            if(pos.top < window.innerHeight*(1/2)){
                this.setState({isShowDiagram1:true});
            }
        }
        if(this.diagramElement2){
            let pos = this.diagramElement2.getBoundingClientRect();
            if(pos.top < window.innerHeight*(1/2)){
                this.setState({isShowDiagram2:true});
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
      let tran = -1*this.state.scrollTop*0.2;
      return (
        <div className={"skills"}>
             <Helmet>
                 <title>Software Developer | Alexander Morton</title>
                <meta name="description" content="Highlights of my skills and expertise." />
            </Helmet>
	        <div style={{transform:'translateY(' + tran + 'px)'}} className={"skills__header"} >
	            <h1>My Skills</h1>
                <h2>
                    The Highlights
                </h2>
            </div>
            <div className={"skills__gap"}/>
            <section className={"skills__overview"}>
                <h1>
                    Overview 
                </h1>
                <p>
                    How my average day breaks down if you integrated over my lifetime. 
                </p>
                <div ref={(ref)=>{this.pieElement = ReactDOM.findDOMNode(ref)}}>
                    <AsyncPieChart isShow={this.state.isShowPieChart} width={this.state.pieChartInfo.width}
                        height={this.state.pieChartInfo.height}
                        innerRadius={this.state.pieChartInfo.innerRadius}
                        outerRadius={this.state.pieChartInfo.outerRadius}
                        labelRadius={this.state.pieChartInfo.labelRadius}
                    />
                </div>
            </section>
            <div className={"skills__gap skills__gap--small"}/>
            <section className={"skills__overview"}>
                <h1>
                    Algebra and Geometry 
                </h1>
                <p>
                    Using linear algebra and geometry I can derive equations which can describe a wide range of physical systems. 
                    I can then implement numerical methods to solve more complex equations which defy analytical methods.  
                </p>
                <i className={"skills__picDescription"}>
                  Below you can see some geometric representations of linear algebra used in charged particle tracking. If you would like to learn more contact me.  
                </i>
                <div ref={(ref)=>{this.diagramElement1 = ReactDOM.findDOMNode(ref)}}>
                  <AsyncDiagram isShow={this.state.isShowDiagram1} settings={settings} imgs={[alignRight,alignBigger,scatterXYZ,scatterDown]}/>
                </div>
            </section>
            <section className={"skills__overview"}>
                <h1>
                    Statistics 
                </h1>
                <p>
                  I have experience applying different statistical models to a myriad of different datasets.
                  This can be used, among other things, to determine the statistical significance of a deviation between a prediction and an observed dataset
                  or it can be used to determine the most likely values of a set of parameters and their errors.       
                </p>
                <i className={"skills__picDescription"}>
                   Below you can see the fitting of charge particles and modeling of exotic particles.   
                </i>
                <div ref={(ref)=>{this.diagramElement2 = ReactDOM.findDOMNode(ref)}}>
                  <AsyncDiagram isShow={this.state.isShowDiagram2} settings={settings} imgs={[beame3b1,beame5b1,chie5b1,drmean]}/>
                </div>
            </section>
            <div className={"skills__gap skills__gap--small"}/>
            <section>
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={reactIcon} alt={"react"}/>
                        <h1>
                            React
                        </h1>
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
                        <h1>
                            Node
                        </h1>
                        <p>
                            Node lets me use Javascript in creating your server, breaking down the boundary between browser and server.
                        </p>
                        <p>
                            A fast, versatile server which can easily scale up as you expand your business.
                        </p>
                        <p>
                          I have experience in setting up safe and reliable server code which can serve a range of different assets. 
                        </p>
                    </div>
                </article>
	            <article className={"skills__skill"}>
	                <div className={"skills__info"}>
	                    <img style={{marginTop:"40px",marginLeft:"20px"}} src={google} alt={"google maps"}/>
		                <h1>
	                        Tools
		                </h1>
	                    <p>
	                        I can integrate Google maps, analytics and Adwords into your web application. 
	                    </p>
                        <p>
                            I also use a series of other SEO and webmaster tools to make sure all my websites are functioning correctly. 
                        </p>
                        <i className={"skills__picDescription"}>
                            Check out Loch Lomond!   
                        </i>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <div id="map"></div>
	                </div>
	            </article>
	            <article className={"skills__skill"}>
	                <div className={"skills__info"}>
	                    <img style={{marginTop:"20px"}} src={cms} alt={"media"}/>
	                    <h1>
	                        Content Management
	                    </h1>
                        <p>
                            Videos, photos, blog posts... the list is endless... I'm comfortable working with any form your content takes. 
                            The demand for content from your server is constant. 
                            I can manage concurrent demands on your server, to deliver content quickly and efficiently.
                        </p>
	                    <p>
	                        You need to upload content before people can see it. I make uploading anything a breeze, 
                            designing you a single user interface, to your specification, which links to every aspect of maintaining your website.
	                    </p>
                        <i className={"skills__picDescription"}>
                            Check out cool thing about VR!   
                        </i>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <YouTube video="i0aBEmzRE_U" autoplay="0" rel="0" modest="1" />,
	                </div>
	            </article>
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={services} alt={"media"}/>
                        <h1>
                            Services
                        </h1>
                        <p> 
                            You can integrate external services into your websites user interface. 
                            With almost unlimited tools to make your life easier this freedom is essential.   
                        </p>
                        <p>
                            Furthermore, you can specify exact how you want to visualise your data. Invaluable for complex data analysis.
                        </p>
                        <i className={"skills__picDescription"}>
                            Do you need to display the latest Microsoft shares every 30s? Why not!   
                        </i>
                    </div>
                    <div ref={(ref)=>{this.stockElement = ReactDOM.findDOMNode(ref)}} className={"skills__centreMedia"}>
                        <AsyncStock isShow={this.state.isShowStock} width={this.state.stocksChartInfo.width}
                            height={this.state.stocksChartInfo.height}
                            margin={this.state.stocksChartInfo.margin}
                        />
                    </div>
                </article>
                <div className={"skills__gap skills__gap--small"}/> 
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={docs} alt={"media"}/>
                        <h1>
                            Documentation
                        </h1>
                        <p>
                            I produce all my documentation using jsdocs. 
                            This allows me to keep a guide of my progress and explain my reasoning to future developers working on my project.
                        </p>
                        <p>
                            Check out the documentation for this site as an example.
                        </p>
                        <a style={{color: 'lightblue'}} className={"skills__info__doc"} href={"/__documentation/frontend/"}> See How This Site Works </a>
                    </div>
                </article>
                <div className={"skills__gap skills__gap--small"}/> 
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={format} alt={"media"}/>
                        <h1>
                            Styles
                        </h1>
                        <p>
                            I go beyond basic template styling in making your store front stand out.
                        </p>
                        <p>
                            I wireframe all my websites before production so my clients can see what we're building.
                            I then export the appropriate resources for each component of the user interface. 
                        </p>
                        <p>
                            I employ Javascript frameworks and libraries to interact with each component. 
                            This includes svg components using libraries like d3 and vivus. Useful for creating charts or even simulated drawing on the screen.
                        </p>
                        <p>
                            I can also use the browsers canvas to render pixel by pixel images. 
                            This is particularly useful for CPU intensive applications like Javascript games.  
                        </p>
                        <i className={"skills__picDescription"}>
                            Check out drawing a svg image line by line.   
                        </i>
                    </div>
                    <div ref={(ref)=>{this.writeElement = ReactDOM.findDOMNode(ref)}} className={"skills__centreMedia"}>
                        {writeMe}
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


export default Skills;