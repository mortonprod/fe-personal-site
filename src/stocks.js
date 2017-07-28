import React, { Component } from 'react';
import axios from "axios";
import * as d3 from "d3";
import "./stocks.css";
/**
    This component call stocks API and the then renders to screen. 
    The component has two frequencies. One is the frequency the graph updates and the other is the frequency of calling the API.
    Call API every minute and the updates the graph.
    If chase set to true then get the component to move 20 minutes behind and chase in 20 seconds.
    @class
*/
export default class Stocks extends Component {
    graph = null;
    constructor(){
        super();
        this.state = {isData:false,intervalId:null};
    }
    /**
        Ignore time domain if isGetAll flag called.
        Will return an array in chronological order. Therefore need to flip
    */
    createArrays(data, isGetAll){
	    let high = [];
	    let low = [];
	    let close = [];
        let open = [];
        let times = []
        let index = 0;
        let all = []
        for(let key in data["Time Series (1min)"]){
            if(index < this.props.timeDomain || isGetAll ){
                console.log("key " + key);
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
        high.reverse();
        low.reverse();
        close.reverse();
        open.reverse();
        times.reverse();
        all.reverse();
        return {open,high,low,close,times,all}
    }
    /**
        Take the last 20 mintues of data.
        Store start/end time to draw the domain.
        Flix y axis size browser starts (0,0) top left.
    */
    createGraph(arrays) {

      let x = d3.scaleLinear()
        .range([0, this.props.width])

      let y = d3.scaleLinear()
        .range([this.props.height,0])
        //.range([0,this.props.height])

      let xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat('')
        .tickSize(10, 0).ticks(2);

      let yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(10, 10).ticks(3);
	  let max = Math.max.apply(null,arrays.high);
      let min = Math.min.apply(null,arrays.low);
      //Silly since this should always be 20 minutes. 
      let maxTimes = Math.max.apply(null,arrays.times);
      let minTimes = Math.min.apply(null,arrays.times);
      //x.domain([minTimes,maxTimes])
      y.domain([min, max ])
      x.domain(d3.extent(arrays.all, function(d) { return d.time; }));


	  let lineClose = d3.line()
	    .x(function(d) { return x(d.time) })
	    .y(function(d) { return y(d.close) }) 
      let lineOpen = d3.line()
        .x(function(d) { return x(d.time) })
        .y(function(d) { return y(d.open) }) 
      let lineHigh = d3.line()
        .x(function(d) { return x(d.time) })
        .y(function(d) { return y(d.high) })   
      let lineLow = d3.line()
        .x(function(d) { return x(d.time) })
        .y(function(d) { return y(d.low) })   
	  // make the graph
	  var svg = d3.select(this.graph);
      svg.attr('width', this.props.width + this.props.margin.left*2 )
        .attr('height', this.props.height + + this.props.margin.top*2 )
	  var graph = undefined
      if(!d3.select('.graph-g').empty()){
        d3.select('.graph-g').remove();
      }
	    graph = svg.append('g')
	        .attr('class', 'graph-g')
	        .attr('width', this.props.width)
	        .attr('height', this.props.height)
            .attr("transform", "translate(" + this.props.margin.top + "," + this.props.margin.left + ")");



	  graph.append("g")
	      .call(d3.axisBottom(x));
          


      graph.append("g")
        .call(d3.axisLeft(y));
    if(d3.select('.stock__YLabel').empty()){
      svg.append("text")             
          .attr("transform",
                "translate(" + (this.props.width/2 + this.props.margin.left) + " ," + 
                               (this.props.margin.top*(5/6)) + ")")
          .style("text-anchor", "middle")
         .style("font-size", "20px")
         .style("fill","red")
         .style("font-family","Lobster")
          .text("Minutes Ago");
      svg.append("text") 
          .attr('class', 'stock__YLabel')            
          .attr("transform",
                "translate(" + (20) + " ," + 
                               (this.props.height/2 + this.props.margin.top) + ")")
           .style("font-size", "20px")
        .style("fill","red")
        .style("font-family","Lobster")
          .style("text-anchor", "middle")
          .text("Points");
    }


	  graph.select('.line__close').remove();
      graph.select('.line__open').remove();
      graph.select('.line__high').remove();
      graph.select('.line__low').remove();
	  //add data line
	  graph.append('path')
	    .datum(arrays.all)
	    .attr('class', 'line line__close')
	    .attr('d', lineClose)
      graph.append('path')
        .datum(arrays.all)
        .attr('class', 'line line__open')
        .attr('d', lineOpen)
      graph.append('path')
        .datum(arrays.all)
        .attr('class', 'line line__high')
        .attr('d', lineHigh)
      graph.append('path')
        .datum(arrays.all)
        .attr('class', 'line line__low')
        .attr('d', lineLow)
	}
    callStock(name){
        return new Promise((resolve,reject)=>{
	        let stock="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + name +"&interval=1min&apikey=X4SQ9LSA7BDGI5NB"
		    axios.get(stock).then((res) => {
                resolve(res.data);
		    });
        })

    }
    /**
        If chase then show the graph in 20 seconds on each stock call.
        Otherwise just plot the data.
        Cancel the set interval on the chase after all data plotted. 
        Call after only for case when we do not want to chase. May need to change other state after chase complete.

    */
    componentDidMount(){
        let name = "MSFT";
        let intervalId =  setIntervalAndExecute(()=>{
            this.callStock(name).then((data)=>{
                this.setState({isData:true});
                let arrays = this.createArrays(data, this.props.isGetAll);
                let tempArrays = JSON.parse(JSON.stringify(arrays));
                let timeSeries = this.createTimeSeries(tempArrays,arrays.all.length);
                    
                this.createChase(timeSeries,1000*19).then(()=>{
                   // this.createGraph.bind(this)(arrays);
                });
            });
        },1000*60);
        this.setState({intervalId: intervalId});
    }
    /**
        Will only return when there is no chase running.
        The frequency must be the total duration/number of elements in time series.
        @function
    */
    createChase(timeSeries,duration){
        let frequency = duration/timeSeries.length;
        return new Promise((resolve,reject)=>{
            if(this.props.isChase){
                let index = 0;
	            let inter = setIntervalAndExecute(()=>{
	                this.createGraph.bind(this)(timeSeries[index]); 
                    index++;
	            },frequency);
	            setTimeout(()=>{
	                clearInterval(inter);
                    resolve();
                },duration);

	        }else{
                resolve();
            }
        })
    }
    /**
        Get a chronological list of what you would get from server if queried in the past. TempArray is in chronological order. 
        Therefore if we were going back in time(20 minutes) we would need to pop of 20 elements push to list, then 19 push to list...  
        So create array in opposite direction and then flip.
        Make sure to copy object since pass by value (Which in the case of none primitives is a reference.)
        @function
    */
    createTimeSeries(tempArrays,pastTime){
        let list = [];
	    for(let i = 0; i < pastTime; i++){
	        for(let key in tempArrays){
	            tempArrays[key].pop();
	        }
            let tempTempArrays = JSON.parse(JSON.stringify(tempArrays));
            list.push(tempTempArrays);
	    }
        list.reverse();
        return list;
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
        return(
            <svg className={"stock"} ref={(ref)=>{this.graph = ref}}></svg>
        )
    }
}

Stocks.defaultProps = {
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


function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}