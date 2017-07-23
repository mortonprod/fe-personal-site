import React, { Component } from 'react';
import * as d3 from "d3";
import "./pieChart.css";

/**
    D3 Works in a vary simple way. Use data to create html or svg. This means you can iteratively change styles.
*/
export default class PieChart extends Component {
    node = null;
    change =null;
    arc= null;
    current = null;
    constructor(){
        super();
    }
    /**
        What is done here:
        1. Work out the splice angles for this chart
        2. Set radius or pie chart and colours
        3. Select the svg dom element, then create a line element moved to somewhere near the centre.
        4. Create the pie chart. Note "path.splice" is just like div.class see how it's created with append and attr class.
        5. Create the legend.
    */
    createChartOld(){
        //1
        let pie = d3.pie().value(function(d) { return d.count });
        let slices = pie(this.props.sections);
        //2
        let arc = d3.arc().innerRadius(0).outerRadius(50);
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        //3
        let svg = d3.select(this.node);
		let g = svg.append('g').attr('transform', 'translate(200, 50)');
        //4
		g.selectAll('path.slice').data(slices).enter().append('path').attr('class', 'slice').attr('d', arc)
        .attr('fill', function(d) {
            return color(d.data.name);
        });
        //5
		svg.append('g').attr('class', 'legend').selectAll('text').data(slices).enter().append('text')
		.text(function(d) { return '• ' + d.data.name; })
		.attr('fill', function(d) { return color(d.data.name); })
        .attr('y', function(d, i) { return 20 * (i + 1); })

    }
    /**
        Must selectAll paths to append path to data.
    */
    createChart(){
	    let width = 960,
	    height = 500,
	    radius = Math.min(width, height) / 2;

		let color = d3.scaleOrdinal(d3.schemeCategory10);

		let pie = d3.pie()
		    .value(function(d) { return d[0].count; })
		    .sort(null);

		this.arc = d3.arc()
		    .innerRadius(radius - 100)
		    .outerRadius(radius - 20);

		let svg = d3.select(this.node)
		    .attr("width", width)
		    .attr("height", height)
		  .append("g")
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        //Logout
        //d3.selectAll("p").data(this.props.sections).enter().each((d)=>{console.log(d)});
        //let path = svg.selectAll("path").data(this.props.sections).enter().append("path").each((d,i)=>{
        //        console.log(d, " this " + this);
        //    });



        let path = svg.selectAll("path").data(this.props.sections).enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
	        .attr("d", this.arc)
		    .each(function(d) { this._current = d; });

        let legend = (index)=>{
	        let legend = svg.append('g').attr('class', 'legend').selectAll('text').data(this.props.sections).enter().append('text')
	        .text(function(d) { return '• ' + d[0].name; })
	        .attr('fill', function(d) { return color(d.name); })
	        .attr('y', function(d, i) { return 20 * (i + 1); })
        }
        legend(0);
          
        function change(e) {
		    var value = e.target.value;
            console.log("value " + value);
		    pie.value(function(d) { return d[value].count; }); // change the value function
		    path = path.data(pie); // compute the new angles
            svg.selectAll(".legend").remove();
            legend(value);
		    path.transition().duration(750).attrTween("d", this.arcTween.bind(this)); // redraw the arcs
        }
        return change
    }
	arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
		    return this.arc(i(t));
		}.bind(this);
	}
    componentDidMount(){
        this.change = this.createChart();
    }
    render(){
        return(
            <div className={"pieChart"}>
	            <form>
	                <label>
                        <input type="radio" name="dataset" value="0" onClick={(e)=>{this.change(e)}}/> 
                        Frontend
                    </label>
	                <label>
                        <input type="radio" name="dataset" value="1" onClick={(e)=>{this.change(e)}}  /> 
                        Backend
                    </label>
                    <label>
                        <input type="radio" name="dataset" value="2" onClick={(e)=>{this.change(e)}}  /> 
                        Deployment
                    </label>
	            </form>
	            <svg ref={node => this.node = node} width={500} height={500}> </svg>
            </div>
        )
    }
}


PieChart.defaultProps ={
    sections:[
        {
	        name:"frontend",
            list:[
                {name:"Auth0",level:10 },
                {name:"Axios",level:10 },
                {name:"Babel",level:10 },
                {name:"D3",level:10 },
                {name:"React",level:30 },
                {name:"Redux",level:10 },
                {name:"SASS",level:10 },
                {name:"Typescript",level:10 },
                {name:"Vivus",level:10 },
                {name:"webpack",level:10 },
                {name:"ES6",level:10 },
                {name:"Gulp",level:10 }
		    ]
        },
        {
            name:"Backend",
            list:[
                {name:"Node",level:10 },
                {name:"Express",level:10 },
                {name:"Pug",level:10 },
                {name:"Passport",level:10 },
                {name:"Express-sessions",level:10 },
                {name:"Mongo",level:10 },
                {name:"Paypal",level:10 },
                {name:"Stripe",level:10 },
                {name:"Docker",level:10 },
                {name:"Certbot",level:10 },
                {name:"Google Analytics",level:10 }
            ]
        }
    ]
};
