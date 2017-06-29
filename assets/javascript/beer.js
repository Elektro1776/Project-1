let BEER = () => {
  let that;
  function searchUntap() {
    let parsedParams = JSON.parse(localStorage.getItem('searchParams'));
    let beerType = parsedParams.beerSearch || '';
    let location = parsedParams.location || 'Colorado';
    let breweryName = parsedParams.breweryName || '';
    let results;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.untappd.com/v4/search/beer?q=${beerType}&${breweryName}&${location}&client_id=337761F7CE5C059F22A5D05E4182CD9AC5BF5711&client_secret=AAD5C7DC2CCD52B7A5E2721DA26765411A8F986B`,
      "method": "GET",
    }

    return $.ajax(settings).done(function (response) {
      console.log("Untapped API RESPONSE",response);
      return response
    });

  }
that = {};
that.searchUntap = searchUntap;
return that;
}
