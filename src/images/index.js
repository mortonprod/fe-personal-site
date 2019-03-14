var temp = document.getElementById('demon');
if(temp) {
  temp.src = require('./demon.png');
}

var temp = document.getElementById('monitor');
if(temp) {
  temp.src = require('./monitor.png');
}

var temp = document.getElementById('login');
if(temp) {
  temp.src = require('./login.png');
}

var temp = document.getElementById('edge');
if(temp) {
  temp.src = require('./edge.png');
}

var temp = document.getElementById('lambda');
if(temp) {
  temp.src = require('./lambda.png');
}


var temp = document.getElementById('cd');
if(temp) {
  temp.src = require('./cd.png');
}


var temp = document.getElementById('ec2');
if(temp) {
  temp.src = require('./ec2.png');
}


var temp = document.getElementById('aws');
if(temp) {
  temp.src = require('./aws.png');
}


var temp = document.getElementById('alignment');
if(temp) {
  temp.src = require('./alignment.png');
}

var temp = document.getElementById('glasgow');
if(temp) {
  temp.src = require('./glasgow.jpeg');
}

var temp = document.getElementById('phone');
console.log(temp);
if(temp) {
  temp.src = require('./phone.jpg');
}

temp = document.getElementsByClassName('img-clock');
console.log(temp);
if(temp && temp.length > 0) {
  // temp.forEach(function(el) {
  //   el.src = require('./clock.png');
  // });
  for (var i = 0; i < temp.length; i++) {
    console.log(temp[i].id); //second console output
    temp[i].src = require('./clock.png');
  }
}