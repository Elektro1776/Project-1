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
    console.log(' IS THIS RUNNING');
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
  }
  // load our map script file once the dom is ready and our inital map has been called back with DATA
  // this ensures we have access to the google object and start creating new maps
  if($('body').hasClass('resultsPage')) {
    injectMapScript();
  }


  // loads a default map so we have access to the google map Object throughout
  // the app
  function loadMap() {
      initialMap = MAPS(searchParams);
      createGoogleCard = googleCardCreator();
      initialMap.getUserLocation();
      initialMap.createDefaultMap();
      // let googleResults;
      initialMap.geoCodeAddress(searchParams.locationSearch).then(function(results) {
        return initialMap.findBreweries(results[0].geometry.location)
      }).then(function(results) {
        // initialMap.reverseGeoCode();
        // return findBeer()
        return initialMap.formatGoogleResults(results)
      })
      .then(function(googleResults) {
        console.log(' WE HAVE GOOGLE RESULTS????', googleResults);
        createGoogleCard.createCard(googleResults)
        findBeer().then(function(untappedResults) {

        })
        // if (null) {
        //   console.log(' WE ARE NULL');
        //   return
        // }
        // filterBreweries(googleResults, untapped)
      })
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
    googleResults.filter((results) => {
      console.log(' WHAT IS THE RESULT', results.result.name.trim().match(/\S+/g));
    })
    untapped.map((results) => {
      console.log(' WHAT ARE THE UNTAPPED RESULTS', results.brewery.brewery_name);
    })
      // let allMatches = untapped.map(function(beer, uIndex) {
      //   let uLat = parseFloat(beer.brewery.location.lat.toFixed(2));
      //   let uLng = parseFloat(beer.brewery.location.lng.toFixed(2));
      //   return googleResults.filter(function(result, index) {
      //     let googleLat = parseFloat(result.geometry.location.lat().toFixed(2));
      //     let googleLng = parseFloat(result.geometry.location.lng().toFixed(2));
      //     if (googleLat === uLat && googleLng === uLng) {
      //       // console.log(' WE HAVE untapped', {uLat, googleLat, beer}, { uLng, googleLng }, uIndex, "googleeee",  index);
      //       return beer
      //     }
      //   });
      // })
      later = new Date();
      console.log(' WHAT ARE ALL THE MATCHES?', now, later);
      // googleResults.filter()
  }
  let test = {
    hello: 'world'
  }


})
