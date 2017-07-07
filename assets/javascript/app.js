function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });
};

$(document).ready(function() {
  const apiKey = 'AIzaSyCwOFrBMJrkRF4Q7MJ-ysYwEWKewhcJlyk';
  let initialMap;
  let createGoogleCard;
  let searchParams = JSON.parse(localStorage.getItem('searchParams'));
  let now = new Date();
  let later;

  function injectMapScript() {
    (function(d, s, id){
      var js, mjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)){
         return;
      }
      js = d.createElement(s); js.id = id;
      js.onload = function(){
          // script has loaded
          // ran into issues getting google to be accessable by the time this
          // script is loaded. setTimeout seemed to fix the problem so far
          function isGoogleLoaded() {
            if (typeof google === 'object' && typeof google.maps === 'object') {
              findBeer()
            } else {
              setTimeout(isGoogleLoaded, 500)
            }
          }
          isGoogleLoaded();

      };
      js.src = "./assets/javascript/maps.js";
      mjs.parentNode.insertBefore(js, mjs);
    }(document, 'script', 'custom-maps-js'));
  }
  // load our map script file once the dom is ready and our inital map has been called back with DATA
  // this ensures we have access to the google object and start creating new maps
  if($('body').hasClass('resultsPage')) {
    injectMapScript();
  } else if ($('body').hasClass('signin')) {
    initialMap = MAPS(searchParams);
    initialMap.getUserLocation();

  }


  // loads a default map so we have access to the google map Object throughout
  // the app
  function findBeer() {
      let searchBeer = BEER();
      initialMap = MAPS(searchParams);
      let userLocation = JSON.parse(localStorage.getItem("latlng"));
      initialMap.createDefaultMap(userLocation);
      console.log(' WHAT IS OUR USER LOCATION?', userLocation);
      createGoogleCard = googleCardCreator();
     initialMap.geoCodeAddress(userLocation).then(function(response) {
        console.log(' WHAT IS THE TEST?', response[0].geometry.location.lat());
        return initialMap.findBreweries(response[0].geometry.location)
        })
        .then(function(googleResults) {
          // console.log(' WHAT ARE THE RESULTS?', results);
          createGoogleCard.createCard(googleResults)
          // return initialMap.formatGoogleResults(results)
        })
      // initialMap.geoCodeAddress(searchParams.locationSearch).then(function (results) {
      //   console.log(' DID WE GET OUR RESULTS?', results);
      //   return initialMap.findBreweries(results)
      // })
      // .then(function(googleResults) {
      //   // console.log(' WHAT ARE THE RESULTS?', results);
      //   createGoogleCard.createCard(googleResults)
      //   // return initialMap.formatGoogleResults(results)
      // })


  }

})
