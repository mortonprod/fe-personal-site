require("./splash-page/index");
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

var button_my_button = "#contact-form-button";
$(button_my_button).click(function(e){
  submitToAPI(e);
});