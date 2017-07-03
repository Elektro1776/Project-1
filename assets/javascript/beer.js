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
      // headers: {
      //   "X-Ratelimit-Limit": "XXXX",
      //   "X-Ratelimit-Remaining": "XXX"
      // }
    }
    return new Promise(function(resolve, reject) {
      $.ajax(settings).done(function (response) {
         resolve(response);
      }).fail((err) => {
        console.log(' fucking errrrrr', err);
      });
    })

  }
that = {};
that.searchUntap = searchUntap;
return that;
}
