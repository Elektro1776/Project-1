let BEER = () => {
  let that;
  function searchUntap() {
    let parsedParams = JSON.parse(localStorage.getItem('searchParams'));
    let beerType = parsedParams.beerSearch || '';
    let location = parsedParams.location || 'Denver';
    let breweryName = parsedParams.breweryName || '';
    let results;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.untappd.com/v4/search/beer?q=${beerType}+${location}&sort=name&client_id=337761F7CE5C059F22A5D05E4182CD9AC5BF5711&client_secret=AAD5C7DC2CCD52B7A5E2721DA26765411A8F986B`,
      "method": "GET",
    };
    return new Promise(function(resolve, reject) {
      $.ajax(settings).done(function (response) {
        console.log(' WHAT IS OUR UNTAPPED RESPONSE AGAIN?', response);
         resolve(response);
      }).fail((err) => {
        console.log(' fucking errrrrr', err);
      });
    })

  }
  function getBreweryLatLng(results) {
    console.log(' WHAT ARE WE MAPPING OVER???', results);
    return results.response.beers.items.map((breweries) => {
      let lat = breweries.brewery.location.lat;
      let lng = breweries.brewery.location.lng;
      return {lat, lng}
    })
  }
  function searchBeerMap(location) {
    let beerSettings = {
      "async": true,
      "crossDomain": true,
      "url": `https://ec2-34-212-47-239.us-west-2.compute.amazonaws.com/api/findBeer`,
      "method": "POST",
      "data": JSON.stringify(location),
      contentType: 'application/json; charset=utf-8',
    }
    return new Promise((resolve, reject) => {
        $.ajax(beerSettings).done(function(response) {
          if(response === "Couldn't connect to database") {
            console.log(' ARE WE GETTING A RESPONSE???', response);
            return
          }
          console.log(' REAL RESPONSE ????', response);
          resolve(response);
        }).fail(function(err) {
          console.log(' WE HAVE AN ERROR HUSTON::', err);
        })
    })
  }
that = {};
that.searchUntap = searchUntap;
that.getBreweryLatLng = getBreweryLatLng;
that.searchBeerMap = searchBeerMap;
return that;
}
