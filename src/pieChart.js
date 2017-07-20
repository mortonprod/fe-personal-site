import React, { Component } from 'react';
import * as d3 from "d3";
import "./pieChart.css";
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


		let path = svg.datum(this.props.sections).selectAll("path")
		  .data(pie)
		.enter().append("path")
		  .attr("fill", function(d, i) { return color(i); })
		  .attr("d", this.arc)
		  .each(function(d) { this._current = d; });
          
        function change(e) {
		    var value = e.target.value;
            console.log("value " + value);
		    pie.value(function(d) { return d[value].count; }); // change the value function
		    path = path.data(pie); // compute the new angles
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
            <div>
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
	    [
	        {name:"React",count:30 },
	        {name:"Axios",count:10 },
	        {name:"SASS",count:10 }
	    ],
	    [
	        {name:"Express",count:30 },
	        {name:"Auth0",count:100 },
	        {name:"bcrypt",count:10 }
	    ],
	    [
	        {name:"docker",count:30 },
	        {name:"certbot",count:2000 },
            {name:"certbot",count:2000 }
	    ]
    ]
};
