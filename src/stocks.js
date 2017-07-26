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
        Create all arrays for the last 20 minutes.
        Ignore time domain if isGetAll flag called.
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
                    //time:index*-1
                    time:index
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

      //x.domain([0,100])
      //y.domain([70, 80])

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
	  var graph = undefined

	  if (d3.select('.graph-g').empty()) {
	    graph = svg.append('g')
	        .attr('class', 'graph-g')
	        .attr('width', this.props.width)
	        .attr('height', this.props.height)
	       // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	    //add axes
	 //   graph.append('g')
	 //       .attr('class', 'x axis')
	 //     //  .attr('transform', 'translate(0,' + plot.height + ')')
	 //       .call(xAxis)

        //      .append('text')
       //     .attr('dx', (this.props.width / 2))
       //     .attr('dy', '3em')
       //     .style('text-anchor', 'middle')
        //    .text('Time')


      // Add the X Axis
	  graph.append("g")
	      .attr("transform", "translate(0," + this.props.height + ")")
	      .call(d3.axisBottom(x));

          

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
		    axios.get(stock,{ headers: {'Access-Control-Allow-Origin': '*',"Access-Control-Allow-Credentials": "true","Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"}}).then((res) => {
		        console.log("Stock "  + JSON.stringify(res.data));
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
        console.log("Mount");
        let name = "MSFT";
        let intervalId =  setIntervalAndExecute(()=>{
            this.callStock(name).then((data)=>{
                this.setState({isData:true});
                let arrays = this.createArrays(data, this.props.isGetAll);
                let tempArrays = JSON.parse(JSON.stringify(arrays));
                let timeSeries = this.createTimeSeries(tempArrays,20);
                    
                console.log("Call");
                this.createChase(timeSeries,1000,1000*19).then(()=>{
                   // this.createGraph.bind(this)(arrays);
                });
            });
        },1000*60);
        this.setState({intervalId: intervalId});
    }
    /**
        Will only return when there is no chase running.
        @function
    */
    createChase(timeSeries,frequency,duration){
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
        Get a chronological list of what you would get from server if queried in the past.
        Pop of 20 elements push to list, then 19 push to list...  So create array in opposite direction and then flip.
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
            console.log("Check: " + JSON.stringify(tempTempArrays));
            list.push(tempTempArrays);
	    }
        list.reverse();
        console.log("List: " + JSON.stringify(list));
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
    width:280,
    height:280,
    timeDomain:20, // Only take 20 minutes of data.
    isChase:true,
    isGetAll:true
}


function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}