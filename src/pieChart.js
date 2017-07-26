import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from "lodash";
import "./pieChart.css";

/**
    This component will produce an animated piechart for my skills.
*/
export default class PieChart extends Component {
    node = null;
    pie = null;
    path = null;
    current= null;
    arc = null;
    legend = null;
    canvas=null;
    svg=null;
    constructor(props){
        super(props);
    }
    /**
        Make sure we only update the graph if we have a resize eventh which takes us over the threshold.
    */
    shouldComponentUpdate(nextProps,nextState){
        if(_.isEqual(nextProps,this.props) && _.isEqual(nextState,this.state)){
            return false;
        }else{
            return true;
        }
    }
    /**
        Render once to update the this.props then call createChart to get d3 to update the dom with new prop values.
    */
    componentDidUpdate(nextProps){
        d3.select(this.node).selectAll("g").remove();
        this.createChart();
    }
      
    /**
        Datum is a single array. When it is passed through the pie chart it will access the front and then the level.
        @function
    */
    createChart(){

	    let radius = Math.min(this.props.width, this.props.height) / 2;
        d3.select(this.svg).attr("height", this.props.height).attr("width", this.props.width);
		let color = d3.scaleOrdinal(d3.schemeCategory20);
        d3.select(this.canvas).attr("transform", "translate(" + (this.props.width / 2) + "," + (this.props.width / 2) + ")");
		this.pie = d3.pie()
		    .value(function(d) { return d.front.level; })
		    .sort(null);

		this.arc = d3.arc()
		    .innerRadius(this.props.innerRadius)
		    .outerRadius(this.props.outerRadius);

		let svg = d3.select(this.node)
		    .attr("width", this.props.width)
		    .attr("height", this.props.height)
		  .append("g")
		   // .attr("transform", "translate(" + this.props.width / 2 + "," + this.props.height / 2 + ")");

            
        this.path = svg.datum(this.props.section).selectAll("path")
		      .data(this.pie)
		    .enter().append("path")
		      .attr("fill", function(d, i) { return color(i); })
		      .attr("d", this.arc)
		      .each(function(d) { this._current = d.level; }); 

        this.createLegend("front");

    }
    setTextX(d, i) {
	    let centroid = this.arc.centroid(d);
	    let midAngle = Math.atan2(centroid[1], centroid[0]);
	    let x = Math.cos(midAngle) * this.props.labelRadius;
	    let sign = (x > 0) ? 1 : -1
	    let labelX = x + (5 * sign)
	    return labelX;
    }
    setTextY(d, i) {
	    let centroid = this.arc.centroid(d);
	    let midAngle = Math.atan2(centroid[1], centroid[0]);
	    let y = Math.sin(midAngle) * this.props.labelRadius;
	    return y;
    }
    setAnchor (d, i) {
	    let centroid = this.arc.centroid(d);
	    let midAngle = Math.atan2(centroid[1], centroid[0]);
	    let x = Math.cos(midAngle) * this.props.labelRadius;
	    return (x > 0) ? "start" : "end";
    }
    createLegend(name){
        console.log("run");
        d3.selectAll(".label").remove();
        let labels = d3.select(this.legend);
        let enteringLabels = labels.selectAll(".label").data(this.pie(this.props.section)).enter();
        //let enteringLabels = labels.datum(this.props.section).selectAll(".label").data(this.pie).enter();
        let labelGroups = enteringLabels.append("g").attr("class", "label");
        labelGroups.append("circle").attr("x", 0).attr("y", 0).attr("r", 2).attr("fill", "#000")
            .attr("transform", (d, i) =>{
                console.log("d" + JSON.stringify(d) +  this.arc.centroid(d));
                //let centroid = this.arc.centroid(d);
                return "translate(" + this.arc.centroid(d) + ")";
            }).attr('class', "label-circle");
        
        let textLines = labelGroups.append("line").attr("x1",  (d, i) => {
                return this.arc.centroid(d)[0];
            }).attr("y1",  (d, i) =>{
                return this.arc.centroid(d)[1];
            }).attr("x2",  (d, i)=> {
                let centroid = this.arc.centroid(d);
                let midAngle = Math.atan2(centroid[1], centroid[0]);
                let x = Math.cos(midAngle) * this.props.labelRadius;
                return x;
            }).attr("y2",  (d, i)=> {
                let centroid = this.arc.centroid(d);
                let midAngle = Math.atan2(centroid[1], centroid[0]);
                let y = Math.sin(midAngle) * this.props.labelRadius;
                return y;
            }).attr('class', "label-line");
        let textLabels = labelGroups.append("text")
            .attr("x", (d,i)=>{ return  this.setTextX(d,i)})
            .attr("y", (d,i)=>{ return  this.setTextY(d,i)})
            .attr('text-anchor', (d,i)=>{ return this.setAnchor(d,i)})
            .attr('class', 'label-text')
            .text(function (d) {
                console.log(d.data[name].name);
                return d.data[name].name
            });

    }
    /**
        When called change what elements the pie chart accesses. Then you attach this to path to begin the transition.
    */
    change(index){
        let name = "front"
        if(index === 1){
            name ="end";
        }else if(index === 2){
            name ="other";
        }
	    this.pie.value(function(d) { return d[name].level; }); 
	    this.path = this.path.data(this.pie); // compute the new angles
	    this.path.transition().duration(750).attrTween("d", this.arcTween.bind(this)); 
        this.createLegend(name);
    }
    /**
        This function will be called ONCE but the function inside is called for each tick. "d" is the data.
        Interpolate will return range specified within domain [0,1]. This is then iterated through by the parameter "t" given passed through the internal function.
        @function
    */
    arcTween(d) {
	  var i = d3.interpolate(this._current, d);
	  this._current = i(0);
	  return (t) =>  {
	    return this.arc(i(t));
	  };
	}
    componentDidMount(){
        this.createChart();
    }
    render(){
        return(
            <div className={"pieChart"}>
	            <form>
	                <label>
                        <input type="radio" name="dataset" value="0" onClick={(e)=>{this.change(0)}}/> 
                        Frontend
                    </label>
	                <label>
                        <input type="radio" name="dataset" value="1" onClick={(e)=>{this.change(1)}}  /> 
                        Backend
                    </label>
                    <label>
                        <input type="radio" name="dataset" value="1" onClick={(e)=>{this.change(2)}}  /> 
                        Other
                    </label>
	            </form>
                <svg ref={svg => this.svg = svg}>
                    <g ref={canvas => this.canvas = canvas}>
	                    <g ref={node => this.node = node}/>
	                    <g ref={legend => this.legend = legend} />
                    </g>
                </svg>
            </div>
        )
    }
}

let factor = 1;

PieChart.defaultProps ={
    section:[
            {front:{name:"Auth0",level:20 },end:{name:"Node",level:50},other:{name:"C++",level:40}},
            {front:{name:"Axios",level:30 },end:{name:"Express",level:30 },other:{name:"Python",level:20}},
            {front:{name:"Babel",level:20 },end:{name:"Pug",level:10 },other:{name:"Numerical",level:30}},
            {front:{name:"D3",level:10 },end:{name:"Passport",level:10 },other:{name:"Statistics",level:30}},
            {front:{name:"React",level:70 },end:{name:"Express-sessions",level:10 },other:{name:"Calculus",level:30}},
            {front:{name:"Redux",level:10 },end:{name:"Mongo",level:30 },other:{name:"Algebra",level:30}},
            {front:{name:"SASS",level:20 },end:{name:"Paypal",level:20 },other:{name:"Thermo",level:20}},
            {front:{name:"Typescript",level:20 },end:{name:"Stripe",level:20 },other:{name:"Mechanics",level:20}},
            {front:{name:"Vivus",level:10 },end:{name:"Docker",level:40 },other:{name:"C#",level:5}},
            {front:{name:"webpack",level:10 },end:{name:"Certbot",level:30 },other:{name:"QM",level:30}},
            {front:{name:"gulp",level:10 },end:{name:"Google Analytics",level:20 },other:{name:"bash",level:40 }},
    ],
    width:500*factor,
    height:500*factor,
    innerRadius: 50*factor,
    outerRadius: 150*factor,
    labelRadius: 175*factor
};



