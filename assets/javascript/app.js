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
  let searchParams = JSON.parse(localStorage.getItem('searchParams'))
  console.log(' WE SHOULD HAVE SEARCH PARAMS', searchParams);
  // load our map script file once the dom is ready and our inital map has been called back with DATA
  // this ensures we have access to the google object and start creating new maps
  (function(d, s, id){
    var js, mjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)){
       return;
    }
    js = d.createElement(s); js.id = id;
    js.onload = function(){
        // script has loaded
        loadMap()
    };
    js.src = "./assets/javascript/maps.js";
    mjs.parentNode.insertBefore(js, mjs);
  }(document, 'script', 'custom-maps-js'));

  // loads a default map so we have access to the google map Object throughout
  // the app
  function loadMap() {
    // return new Promise(function(resolve, reject) {
      initialMap = MAPS(searchParams);
      initialMap.createDefaultMap();
      let googleResults;
      initialMap.geoCodeAddress().then(function(results) {
        return initialMap.findBreweries(results[0].geometry.location)
      }).then(function(results) {
        // findBeer()
        // return Promise.all(results.map(findBeer))
        googleResults = results;
        // initialMap.reverseGeoCode();
        console.log(' RESPONSE??????', results);
        // return findBeer()
        // console.log(' WHAT ARE THE RESULTS???', untapped);
      })
      // .then(function(untapped) {
      //   // filterBreweries(googleResults, untapped)
      // })
      // .then(function(results) {
      // })
    // })
  }

  function findBeer() {
    let searchBeer = BEER();
    return searchBeer.searchUntap()
  }
  function filterBreweries(googleResults, untappedResults) {
    let untapped = untappedResults.response.beers.items;
      let allMatches = untapped.map(function(beer, uIndex) {
        let uLat = parseFloat(beer.brewery.location.lat.toFixed(2));
        let uLng = parseFloat(beer.brewery.location.lng.toFixed(2));
        return googleResults.filter(function(result, index) {
          let googleLat = parseFloat(result.geometry.location.lat().toFixed(2));
          let googleLng = parseFloat(result.geometry.location.lng().toFixed(2));
          if (googleLat === uLat && googleLng === uLng) {
            // console.log(' WE HAVE untapped', {uLat, googleLat, beer}, { uLng, googleLng }, uIndex, "googleeee",  index);
            return beer
          }
        });
      })
      console.log(' WHAT ARE ALL THE MATCHES?', allMatches);
      // googleResults.filter()
  }

})
