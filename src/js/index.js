// require("./splash-page/index");
var $ = require('jquery');

// Loading screen

// (function(){
//   function id(v){return document.getElementById(v); }
//   function loadbar() {
//     var ovrl = id("overlay"),
//         prog = id("progress"),
//         stat = id("progstat"),
//         img = document.images,
//         c = 0;
//         tot = img.length;
//     console.log(`Images: ${img}`);
//     function imgLoaded(){
//       c += 1;
//       var perc = ((100/tot*c) << 0) +"%";
//       prog.style.width = perc;
//       stat.innerHTML = "Loading "+ perc;
//       if(c===tot) return doneLoading();
//     }
//     function doneLoading(){
//       ovrl.style.opacity = 0;
//       setTimeout(function(){ 
//         ovrl.style.display = "none";
//       }, 1200);
//     }
//     for(var i=0; i<tot; i++) {
//       var tImg     = new Image();
//       tImg.onload  = imgLoaded;
//       tImg.onerror = imgLoaded;
//       tImg.src     = img[i].src;
//     }    
//   }
//   document.addEventListener('DOMContentLoaded', loadbar, false);
// }());

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
      alert("Message Sent");
      document.getElementById("contact-form").reset();
  location.reload();
    },
    error: function () {
      // show an error message
      alert("Something went wrong. Try contacting me through linkedin");
    }});
}

var button_my_button = "#contact-form-button";
$(button_my_button).click(function(e){
  submitToAPI(e);
});