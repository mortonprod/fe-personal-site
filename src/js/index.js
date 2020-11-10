// require("./splash-page/index");
var $ = require('jquery');
import dialogPolyfill from 'dialog-polyfill'
$(document).ready(function() {
  var is_reset= false;
  var dialog = document.querySelector('#dialog');
  var dialog_title = dialog.getElementsByClassName("mdl-dialog__title")[0]
  var dialog_paragraph = dialog.getElementsByClassName("mdl-dialog__content")[0].getElementsByTagName('p')[0]
  dialogPolyfill.registerDialog(dialog);
  dialog.querySelector('button:not([disabled])').addEventListener('click', function() {
    dialog.close();
    if(is_reset){
      document.getElementById("contact-form").reset();
      location.reload();
      is_reset = false;
    }
  });
  function submitToAPI(e) {
    e.preventDefault();
    var url = "https://ses.alexandermorton.co.uk/ses";
     var Namere = /[A-Za-z]{1}[A-Za-z]/;
     if (!Namere.test($("#Name").val())) {
          dialog_title.innerHTML = "Fix Me"
          dialog_paragraph.innerHTML = "Name must be more than 2 characters";
          dialog.showModal();
          return;
     }
     if ($("#Email").val()=="") {
        dialog_title.innerHTML = "Fix Me"
        dialog_paragraph.innerHTML = "Please enter your email";
        dialog.showModal();
        return;
     }
     var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
     if (!reeamil.test($("#Email").val())) {
          dialog_title.innerHTML = "Fix Me"
          dialog_paragraph.innerHTML = "Please enter valid email address";
          dialog.showModal();
         return;
     }
     if ($("#note").val()=="") {
      dialog.showModal();
      dialog_title.innerHTML = "Fix Me"
      dialog_paragraph.innerHTML = "Please enter your message";
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
        is_reset = true;
        dialog.showModal();
        dialog_title.innerHTML = "Sent"
        dialog_paragraph.innerHTML = "I will try to get back to you as soon as possible.";
        return;
      },
      error: function () {
        dialog.showModal();
        dialog_title.innerHTML = "Error"
        dialog_paragraph.innerHTML = "Something went wrong on my side. Try contacting me through linkedin";
        return;
      }});
  }
  var button_my_button = "#contact-form-button";
  $(button_my_button).click(function(e){
    submitToAPI(e);
  });
});