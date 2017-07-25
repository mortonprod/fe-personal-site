import React,{Component} from 'react';
import vistSite from "./assets/vistSite.svg";
import Helmet from 'react-helmet';
import "./work.css";
export default class Work extends Component{
    constructor(){
        super();
        this.state = {scrollTop:0}
    }
    componentDidMount(){
        window.addEventListener('scroll', this.scroll.bind(this));
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
    render(){
    let tran = -1*this.state.scrollTop*0.5;
	    return (
	        <div className={"work"}>
	             <Helmet>
	                 <title>Freelance Web Designer | Alexander Morton</title>
	                <meta name="description" content="A hand-picked selection of my designs and websites I have developed." />
	            </Helmet>
			    <div style={{transform:'translateY(' + tran + 'px)'}} className={"work__header"} >
			        <h1>My Work</h1>
			        <h2>My Most Recent Projects...</h2>
			    </div>
		        <div className={"work__gap"}/>
	            <section className={"work__websites"}>
	                <h1>
	                    Websites
	                </h1>
	                <article className={"work__site"}>
		                <h2>
		                    Boutique Store
		                </h2>
	                    <article className={"work__problem"}>
		                    <h3>
		                        Problem
		                    </h3>
			                <p>
			                    A small business needed a online store which they could sell their boutique products. 
                                They wanted a small web application to not only sell there products, but also simplify product procurement, stock checks and billing.
                                The website should make it as easy as possible for someone to go from visiting the site to buying a product.
			                </p>
	                    </article>
	                    <article className={"work__solution"}>
		                    <h3>
		                        Solution
		                    </h3>
		                    <p>
		                        The website was designed....
		                    </p>
	                    </article>
	                    <a href={"https://github.com"}><img src={vistSite} alt="Visit site button"/></a>
	                </article>
	            </section>
	            <section className={"work__websites"}>
	                <h1>
	                    Designs
	                </h1>
	            </section>
	        </div>
	        
	    )
    }
}