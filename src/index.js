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

//ses function
var $ = require('jquery');

function submitToAPI(e) {
  e.preventDefault();
  var url = "https://ses.alexandermorton.co.uk/ses";

   var Namere = /[A-Za-z]{1}[A-Za-z]/;
   if (!Namere.test($("#Name").val())) {
                   alert ("Name can not less than 2 char");
       return;
   }
   if ($("#Email").val()=="") {
       alert ("Please enter your email id");
       return;
   }
   var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
   if (!reeamil.test($("#Email").val())) {
       alert ("Please enter valid email address");
       return;
   }

  var name = $("#Name").val();
  var email = $("#Email").val();
  var note = $("#note").val();
  var data = {
     name : name,
     email : email,
     note : note
   };

  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),

    
    success: function () {
      // clear form and show a success message
      alert("Successfull");
      document.getElementById("contact-form").reset();
  location.reload();
    },
    error: function () {
      // show an error message
      alert("UnSuccessfull");
    }});
}

global.submitToAPI = submitToAPI;