
let MAPS = (spec, mySecrets) => {
  let that, map, infowindow, service, geocoder;
   mySecrets = mySecrets || {}
  function createDefaultMap(lat, long) {
    console.log(' WHAT IS THE SPEC????', spec);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.739236, lng: -104.990251},
      zoom: 13,
      mapTypeId: 'roadmap'
    });
    service = new google.maps.places.PlacesService(map);
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();
    // console.log(' Do we have a map', map.getBounds());

  }

  // function createMarker(place) {
  //   console.log(' WHAT IS THE PLACE???', place.geometry);
  //   var placeLoc = place.geometry.location;
  //   infowindow = new google.maps.InfoWindow();
  //   var marker = new google.maps.Marker({
  //        map: map,
  //        position: placeLoc
  //      });
  //      google.maps.event.addListener(marker, 'click', function() {
  //         infowindow.setContent(place.name);
  //         infowindow.open(map, this);
  //       });
  // }
  function geoCodeAddress() {
    return new Promise(function(resolve,reject) {
        geocoder.geocode( { 'address': spec.locationSearch}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // resolve results upon a successful status
            resolve(results);
          } else {
            // reject status upon un-successful status
            reject(status);
          }
        });
    });
  }
  function reverseGeoCode(result) {
      geocoder.geocode( {placeId: result.place_id }, function(results, status) {
        // console.log(' WHAT IS THE REVERSE ', results);
      })
  }
  function findBreweries(location) {
    console.log(' WHAT ', location);
    let request = {
      location: location,
      radius: 1609.34,
      keyword: 'brewery',
    }
    return new Promise(function(resolve, reject) {
      // setTimeout(function() {
        service.nearbySearch(request, function(results, status) {
          console.log(' WHAT IS THE STATUS', results, status);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            resolve(findDetail(results));
          }else {
            reject(status);
          }
        })

      // }, 500)
    });
  }
  function findDetail(results) {
    console.log(' WHAT IS OUR MAPS', google.maps);
        return new Promise(function(resolve,reject) {
          // setTimeout(function() {
          // setTimeout(function() {
          let j = 0;
          let detailsArray = [];
          function getMissedResults(place) {
            // console.log(' MISSED RESULTS????', j, place);
            j ++

            service.getDetails(place, function(details, status) {
              // console.log(' WE SHOULD HAVE PLACES?????', places);

              if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                // console.log(' DETAILSSSS FOR MISSED QUERY', details, status);
                 setTimeout(function() {
                    getMissedResults(result)
                  }, 1200)
                // return
              } else {
                console.log(' DETAILS ARRAY LENGTH????', detailsArray.length );
                detailsArray.push(details)
                if (detailsArray.length == 49) {
                  console.log(' DETAILS ARRAY', detailsArray);
                }
              }
            })
          }
          for (var i = 0, result; i < 50; i++) {
            result = results[i]
          // console.log(' RESULTS LENGTH?????', results[i], i);
          // results.map(function(result) {
          // reverseGeoCode(result)
        //  else {
        console.log(' HELLOOOO???');
          // getMissedResults(result)
          // }


          // })
          addMarker(result);
      }
    // }, 1000)

    resolve()
            // service.getDetails({placeId: place.place_id}, function(place,status) {
            //   console.log(' WHAT THE FUCK IS THE STATUS', status);
            //   if (status == google.maps.places.PlacesServiceStatus.OK) {
            //     // console.log(' ARE WE GETTING A PLACE??', place);
            //     resolve(place);
            //   } else {
            //     reject(status);
            //   }
            // });

          // }, 2000)
        });
      }

     function addMarker(place) {
       console.log(' WHAT IS THE PLACEW?', place);
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location,
         icon: {
           url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
           anchor: new google.maps.Point(10, 10),
           scaledSize: new google.maps.Size(10, 17)
         }
       });

       google.maps.event.addListener(marker, 'click', function() {
         service.getDetails(place, function(result, status) {
           if (status !== google.maps.places.PlacesServiceStatus.OK) {
             console.error(status);
             return;
           }
          //  console.log(" WHAT IS OUR RESULT ON CLICK ???", result);
           infoWindow.setContent(result.name);
           infoWindow.open(map, marker);
         });
       });
  }
  that = {};
  that.createDefaultMap = createDefaultMap;
  that.geoCodeAddress = geoCodeAddress;
  that.reverseGeoCode = reverseGeoCode;
  that.findDetail = findDetail;
  // that.createMapMarkers = createMapMarkers;
  // that.textSearch = googleTextSearch;
  that.findBreweries = findBreweries;

  return that;
}

// function googleTextSearch() {
//   var service;
//   var infowindow;
//
// function initialize() {
//   var location = new google.maps.LatLng(39.739236,-104.990251);
//
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: location,
//       zoom: 12
//     });
//
//   var request = {
//     location: location,
//     radius: '3600',
//     query: 'brewery'
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
// initialize();
//
// }
