$(document).ready(function(){

    var url = "http://beermapping.com/webservice/locquery/dc4b4287be8a39329d4c960c4980c322/Denver&s=json";

    // AJAX === Asynchronous JavaScript

    $.ajax({
      url: url,
      method: "GET"
    }).done(function(beerMap) {
   		console.log(beerMap);
   		});
   	});