if (!sessionStorage.session) {
	window.location.href = "login.html";
}

// Init App
var myApp = new Framework7({
   material: true,

   animateNavBackIcon: true,

   // Enable templates auto precompilation
   precompileTemplates: true,

   // Enabled rendering pages using Template7
   template7Pages: true,
});

// Expose Internal DOM library
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});

$$(document).on('ajaxStart', function (e) {
});

$$(document).on('ajaxComplete', function (e) {
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
   console.log("Device is ready!");
});

myApp.onPageInit('signout', function (page) {
   sessionStorage.clear();
   window.location.href = "login.html";
})