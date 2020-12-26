$(document).ready(function(){
  $(window).on("load", signin_page_wrapper_show);
  $(window).on("load", spinner_wrapper_show);


// function show signin_page after body load 
function signin_page_wrapper_show(){
  $("#spinner").hide();
  $("#signin-page-wrapper").show();
}

// function show home_page after body load 
function spinner_wrapper_show(){
  $("#spinner").hide();
  $("#spinner-wrapper").show();
}

});
