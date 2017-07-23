import React, { Component } from 'react'; 
import Helmet from 'react-helmet';
import PieChart from "./pieChart";
import google from "./assets/google.svg";
import youtube from "./assets/youtube.svg";
import boy from "./assets/boy.svg";
import portfolioLogo from "./assets/portfolioLogo.svg";
import branding from "./assets/branding.svg";
import Account from "./account";
import "./skills.css";
export default class Skills extends Component {
   constructor(props){
    super();

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
        const opts = {
	      height: '300',
	      width: '300',
	      playerVars: {
	        autoplay: 1
	      }
        }
		let wel = null
		if(this.props.profile){
			wel = (
                <div className={"skills__account"}>
				    <h1>
				        Welcome back {this.props.profile.name}
				    </h1>
	                <img src={this.props.profile.picture} alt="profile link" />
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
            <article className={"skills__skill"}>
                <div className={"skills__info"}>
                    <img src={google} alt={"google maps"}/>
	                <h2>
                        Tools
	                </h2>
                    <p>
                        Integrate google maps, analytics and adwords to your web application. 
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
                        Integrate any media into your website. Using the latest HTML5 canvas for individual pixel manipulation.
                    </p>
                    <p>
                        Using the latest HTML5 canvas for individual pixel manipulation.
                    </p>
                </div>
                <div className={"skills__centreMedia"}>
                    <YouTube video="i0aBEmzRE_U" autoplay="0" rel="0" modest="1" />,
                </div>
            </article>
            <article className={"skills__skill"}>
                <div className={"skills__info"}>
                    <img src={boy} alt={"individual"}/>
                    <h2>
                        User Centric.
                    </h2>
                    <p>
                        Make your website a personal experience and safely store your users information.
                    </p>
                </div>
                <div className={"skills__centreMedia"}>
                    {wel}
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
        <iframe id="player" type="text/html" width="100%" height="100%"
  src={videoSrc}
  frameBorder="0"/>
      </div>
    );
  }
});