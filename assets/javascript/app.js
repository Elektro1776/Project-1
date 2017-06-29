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
  function searchUntap() {
    let parsedParams = JSON.parse(localStorage.getItem('searchParams'));
    let beerType = parsedParams.beerSearch || '';
    let location = parsedParams.location || 'Colorado';
    let breweryName = parsedParams.breweryName || '';
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.untappd.com/v4/search/beer?q=${beerType}&${breweryName}&${location}&client_id=337761F7CE5C059F22A5D05E4182CD9AC5BF5711&client_secret=AAD5C7DC2CCD52B7A5E2721DA26765411A8F986B`,
      "method": "GET",
    }

    $.ajax(settings).done(function (response) {
      console.log("Untapped API RESPONSE",response);
    });

  }
  function findBeer() {
    initialMap.radar();
  }
searchUntap()


})
