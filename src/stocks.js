import React, { Component } from 'react';
import axios from "axios";
import * as d3 from "d3";
import "./stocks.css";
/**
    This component call stocks API and the then renders to screen. 
    The component has two frequencies. One is the frequency the graph updates and the other is the frequency of calling the API.
    Call API every minute and the updates the graph.
    @class
*/
export default class Stocks extends Component {
    graph = null;
    constructor(){
        super();
        this.state = {isData:false,intervalId:null};
    }
    /**
        Create all arrays for the last 20 minutes.
    */
    createArrays(data){
	    let high = [];
	    let low = [];
	    let close = [];
        let open = [];
        let times = []
        let index = 0;
        let all = []
        for(let key in data["Time Series (1min)"]){
            if(index < this.props.timeDomain ){
	            open.push(Number(data["Time Series (1min)"][key]["1. open"]));
	            high.push(Number(data["Time Series (1min)"][key]["2. high"]));
	            low.push(Number(data["Time Series (1min)"][key]["3. low"]));
	            close.push(Number(data["Time Series (1min)"][key]["4. close"]));
                times.push(index*-1);
                all.push({
                    open:Number(data["Time Series (1min)"][key]["1. open"]),
                    high:Number(data["Time Series (1min)"][key]["2. high"]),
                    low:Number(data["Time Series (1min)"][key]["3. low"]),
                    close:Number(data["Time Series (1min)"][key]["4. close"]),
                    time:index*-1
                });
                index++;
            }
        };
        return {open,high,low,close,times,all}
    }
    /**
        Take the last 20 mintues of data.
        Store start/end time to draw the domain.
        Flix y axis size browser starts (0,0) top left.
    */
    createGraph(data) {

      let x = d3.scaleLinear()
        //.range([0, this.props.width])
        .range([0, 100])

      let y = d3.scaleLinear()
        //.range([this.props.height,0])
        .range([100,0])

      let xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat('')
        .tickSize(10, 0).ticks(2);

      let yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(10, 10).ticks(3);
      let arrays = this.createArrays(data);
	  let max = Math.max.apply(null,arrays.high);
      let min = Math.min.apply(null,arrays.low);
      //Silly since this should always be 20 minutes. 
      let maxTimes = Math.max.apply(null,arrays.times);
      let minTimes = Math.min.apply(null,arrays.times);
      //x.domain([minTimes,maxTimes])
      //y.domain([min, max])
      x.domain([0,100])
      y.domain([70, 80])

	  let lineClose = d3.line()
	    .x(function(d) { return d.time })
	    .y(function(d) { return d.close }) 
      let lineOpen = d3.line()
        .x(function(d) { return d.time })
        .y(function(d) { return d.open }) 
      let lineHigh = d3.line()
        .x(function(d) { return d.time })
        .y(function(d) { return d.high })   
      let lineLow = d3.line()
        .x(function(d) { return d.time })
        .y(function(d) { return d.low })   
	  // make the graph
	  var svg = d3.select(this.graph);
	  var graph = undefined

	  if (d3.select('.graph-g').empty()) {
	    graph = svg.append('g')
	        .attr('class', 'graph-g')
	        .attr('width', this.props.width)
	        .attr('height', this.props.height)
	       // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	    //add axes
	    graph.append('g')
	        .attr('class', 'x axis')
	      //  .attr('transform', 'translate(0,' + plot.height + ')')
	        .call(xAxis)
	      .append('text')
	        .attr('dx', (this.props.width / 2))
	        .attr('dy', '1em')
	        .style('text-anchor', 'middle')
	        .text('Time')

	    graph.append('g')
	        .attr('class', 'y axis')
	        .call(yAxis)
	      .append('text')
	        .attr('transform', 'rotate(-90)')
	        .attr('dx', (0 - this.props.height / 2))
	        .attr('dy', '-2.8em')
	        .style('text-anchor', 'middle')
	        .text('ms');
	  } else {
	    graph = d3.select('.graph-g')
	  }

	  // remove old line
	  graph.select('.line').remove()
	  //add data line
	  graph.append('path')
	    .datum(arrays.all)
	    .attr('class', 'line')
	    .attr('d', lineClose);
	}
    callStock(name){
        return new Promise((resolve,reject)=>{
	        let stock="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + name +"&interval=1min&apikey=X4SQ9LSA7BDGI5NB"
		    axios.get(stock).then((res) => {
		        console.log("Stock "  + JSON.stringify(res.data));
                resolve(res.data);
		    });
        })

    }
    /**
        Two timers started. 
        1) 2 minutes call to API.
        2) 100ms call to draw graph. Most recent data always passed. 
    */
    componentDidMount(){
        console.log("Mount");
        let name = "MSFT";
     //   let intervalId =  setIntervalAndExecute(()=>{
	        this.callStock(name).then((data)=>{
                console.log("Call");
                this.createGraph.bind(this)(data);
                this.setState({isData:true});
            });
       // },1000*60);
    ///    this.setState({intervalId: intervalId});
    }
    /**
        Must clear interval.
    */
    componentWillMount(){
        clearInterval(this.state.intervalId);
    }
    /**
        MUST PLACE GRAPH IN INITIAL RENDER SO WE MOUNT WHEN COMPONENTDIDMOUNT.
    */
    render(){
        let comp = null;
        if(this.state.isData){
            comp = (
                <svg ref={(ref)=>{this.graph = ref}}></svg>
            )

        }else{
            comp = (
                <div>
                    <h4>
                        Loading
                    </h4>
                </div>
            )
        }
        return(
            <div>
                <svg ref={(ref)=>{this.graph = ref}}></svg>
            </div>
        )
    }
}

Stocks.defaultProps = {
    width:300,
    height:300,
    timeDomain:20 // Only take 20 minutes of data.
}


function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}