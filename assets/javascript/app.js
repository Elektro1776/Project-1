function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });
}
$(document).ready(function() {
  const apiKey = 'AIzaSyCwOFrBMJrkRF4Q7MJ-ysYwEWKewhcJlyk';
  let initialMap;
  (function(d, s, id){
    var js, mjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)){
       return;
    }
    js = d.createElement(s); js.id = id;
    js.onload = function(){
        // script has loaded
        initialMap = MAPS();
        initialMap.createNewMap();
        initialMap.createMapMarkers();
    };
    js.src = "./assets/javascript/maps.js";
    mjs.parentNode.insertBefore(js, mjs);
  }(document, 'script', 'custom-maps-js'));

  //   (function() {
  //   $.ajax({
  //     url: `https://maps.GOOGLEapis.com/maps/api/place/nearbysearch/json?location=39.739236,-104.990251&radius=1609.34&type=restaurant&keyword=brewery&pagetoken&key=AIzaSyCwOFrBMJrkRF4Q7MJ-ysYwEWKewhcJlyk`,
  //      type: 'GET',
  //      crossDomain: true,
  //      success: function(response) {
  //        console.log(' WHAT IS OUR RESPONSE DATA', response.results);
  //      },
  //   })
  // })();



})
