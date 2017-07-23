import React from 'react';
import vistSite from "./assets/vistSite.svg";
import Helmet from 'react-helmet';
import "./work.css";
export default function Work(props){
    let tran = -1*props.scrollTop*0.5;
    return (
        <div className={"work"}>
             <Helmet>
                 <title>Freelance Web Designer | Alexander Morton</title>
                <meta name="description" content="A hand-picked selection of my designs and websites I have developed." />
            </Helmet>
		    <div style={{transform:'translateY(' + tran + 'px)'}} className={"work__header"} >
		        <h1>My Work</h1>
		        <h2>The Highlights</h2>
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
		                </p>
                    </article>
                    <article className={"work__solution"}>
	                    <h3>
	                        Solution
	                    </h3>
	                    <p>
	                        A small business needed a online store which they could sell their boutique products.
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