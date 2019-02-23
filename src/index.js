// require('./index.scss');
// This will place css at this url so we can then add this to each template.
import url from './index.scss'
var temp = document.getElementById('demon');
if(temp) {
  temp.src = require('./images/demon.png');
}

var temp = document.getElementById('monitor');
if(temp) {
  temp.src = require('./images/monitor.png');
}

var temp = document.getElementById('login');
if(temp) {
  temp.src = require('./images/login.png');
}

var temp = document.getElementById('edge');
if(temp) {
  temp.src = require('./images/edge.png');
}

var temp = document.getElementById('lambda');
if(temp) {
  temp.src = require('./images/lambda.png');
}


var temp = document.getElementById('cd');
if(temp) {
  temp.src = require('./images/cd.png');
}


var temp = document.getElementById('ec2');
if(temp) {
  temp.src = require('./images/ec2.png');
}


var temp = document.getElementById('aws');
if(temp) {
  temp.src = require('./images/aws.png');
}


var temp = document.getElementById('alignment');
if(temp) {
  temp.src = require('./images/alignment.png');
}

var temp = document.getElementById('glasgow');
if(temp) {
  temp.src = require('./images/glasgow.jpeg');
}

var temp = document.getElementById('phone');
console.log(temp);
if(temp) {
  temp.src = require('./images/phone.jpg');
}

temp = document.getElementsByClassName('img-clock');
console.log(temp);
if(temp && temp.length > 0) {
  // temp.forEach(function(el) {
  //   el.src = require('./images/clock.png');
  // });
  for (var i = 0; i < temp.length; i++) {
    console.log(temp[i].id); //second console output
    temp[i].src = require('./images/clock.png');
  }
}


// demonImg.src = require('./images/demon.png');
// var monitorImg = document.getElementById('monitor');
// monitorImg.src = require('./images/monitor.png');
// var loginImg = document.getElementById('login');
// loginImg.src = require('./images/login.png');


// var edgeImg = document.getElementById('edge');
// edgeImg.src = require('./images/edge.png');
// var temp = document.getElementById('lambda');
// temp.src = require('./images/lambda.png');
// temp = document.getElementById('cd');
// temp.src = require('./images/cd.png');
// temp = document.getElementById('ec2');
// temp.src = require('./images/ec2.png');
// temp = document.getElementById('aws');
// temp.src = require('./images/aws.png');
// temp = document.getElementById('alignment');
// temp.src = require('./images/alignment.png');
// temp = document.getElementById('glasgow');
// temp.src = require('./images/glasgow.jpeg');
// temp = document.getElementById('phone');
// temp.src = require('./images/phone.jpg');

// temp = document.getElementsByClassName('img-clock');
// temp.forEach(function(el) {
//   el.src = require('./images/clock.png');
// });
// require('./particles-in-box')