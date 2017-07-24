import React, { Component } from 'react'; 
import ReactDOM from 'react-dom';
import Vivus from "vivus";
import Helmet from 'react-helmet';
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
import Account from "./account";
import Stocks from "./stocks";
import "./skills.css";
export default class Skills extends Component {
   isRun=true;
   writeElement = null;
   constructor(props){
    super();

   }
   componentWillReceiveProps(nextProps){
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
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB47UL58deXimo5mq7v3xNO0GdWlexqnAc&callback=initMap";
        script.async = true;
        document.body.appendChild(script);
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
		if(this.props.profile){
            let nickname = "";
            if(this.props.profile.nickname){
                nickname= " AKA " + this.props.profile.nickname
            }
			wel = (
                <div className={"skills__account"}>
				    <h3>
				        Welcome back
				    </h3>
                    <h3>
                        {this.props.profile.name}
                    </h3>
                    <h4>
                        {nickname}
                    </h4>
	                <img src={this.props.profile.picture} alt="profile" />
                </div>
			)
			}else{
			wel = (
                <div className={"skills__account"}>
                    <h3>
                        Sign to Learn More
                    </h3>
                    <div className={"skills__button"}>
                        <Account profile={this.props.profile}/>
                    </div>
                </div>
			)
		}
      let tran = -1*this.props.scrollTop*0.5;
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
                    <PieChart/>
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
                            React gives me the ability to create fast, modular components.
                        </p>
                        <p>
                            Implementing server side rendering gives you the benefits of a single page application and a static website.
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
                            Node lets you use javascript in creating your server, breaking down the boundary between browser and server.
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
	                        Integrate google maps, analytics and adwords into your web application. 
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
	                    <img src={youtube} alt={"media"}/>
	                    <h2>
	                        Media
	                    </h2>
	                    <p>
	                        Integrate any media into your website or use your website to upload content.
	                    </p>
	                </div>
	                <div className={"skills__centreMedia"}>
	                    <YouTube video="i0aBEmzRE_U" autoplay="0" rel="0" modest="1" />,
	                </div>
	            </article>
                <article className={"skills__skill"}>
                    <div className={"skills__info"}>
                        <img src={youtube} alt={"media"}/>
                        <h2>
                            Services
                        </h2>
                        <p>
                            Connect to existing services
                        </p>
                    </div>
                    <div className={"skills__centreMedia"}>
                        <Stocks/>
                    </div>
                </article>


                <article className={"skills__skill"} ref={(ref)=>{this.writeElement = ReactDOM.findDOMNode(ref)}}>
                    <div className={"skills__info"}>
                        <img src={format} alt={"media"}/>
                        <h2>
                            Styles
                        </h2>
                        <p>
                            Use different digital format for different situations, so your store front is eye catching.
                        </p>
                        <p>
                            Manipulate svg paths to produce engrossing animations.
                        </p>
                        <p>
                            Level up, manipulate pixel by pixel with HTML5 canvas.
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
	                        Create a Logos, posters and stationary.
	                    </p>
	                    <p>
	                        Everything you need to start a business
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
