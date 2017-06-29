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
        loadMaps().then(function() {
          findBeer();
        });
    };
    js.src = "./assets/javascript/maps.js";
    mjs.parentNode.insertBefore(js, mjs);
  }(document, 'script', 'custom-maps-js'));

  // loads a default map so we have access to the google map Object throughout
  // the app
  function loadMaps() {
    return new Promise(function(resolve, reject) {
      initialMap = MAPS();
      resolve(initialMap.createDefaultMap())
    })
  }
  let allResults;
  let googleService;
  function foundBreweries(results, service) {
    console.log(' HELLOOOOOO FROM TEST ??????', results);
    allResults = results;
    googleService = service;
    return;
  }
  function findBeer() {

    initialMap.findBreweries(foundBreweries);
    let searchBeer = BEER();
    let $beerResults = searchBeer.searchUntap();
    $beerResults.done(function(response) {
      console.log(' WHAT IS OUR SEARCH BEER', response, allResults);

    })
  }
  function filterBreweries(gPlaces, untapResults) {
      gPlaces.map(place)
  }

})
