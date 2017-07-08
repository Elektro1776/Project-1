
let MAPS = (spec, mySecrets) => {
  let that, map, infowindow, service, geocoder;
   mySecrets = mySecrets || {};
   var markers = [];

  function createDefaultMap(userLocation) {
    return geoCodeAddress(userLocation).then((response) => {
      let location = response[0].geometry.location;
      map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 14,
        // mapTypeId: 'roadmap'
      });
      map.panBy(0, -50)
      service = new google.maps.places.PlacesService(map);
      infoWindow = new google.maps.InfoWindow();
      var pos = {
                  location
                };
      infoWindow.setPosition(pos.location);
      infoWindow.setContent('You Are Here');
      infoWindow.open(map);
      map.setCenter(pos.location);
      autoCompleteLocation()
      // addMarker(response[0]);
    })
  }
  function autoCompleteLocation () {
    var input = $('.side-nav form #autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                $('#locationSearch')[0]), {
              // types: ['(cities)'],
              // componentRestrictions: countryRestrict
            });
    autocomplete.bindTo("bounds", map);
    google.maps.event.addDomListener(window, 'load', autoCompleteLocation);

    autocomplete.addListener('place_changed', function() {
      infoWindow.close();
      // marker.setVisible(false);
      var place = autocomplete.getPlace();
      console.log("We have the place!", place);
      if (!place.geometry) {
        console.log("error");
      }
      var latLong = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      if (place.geometry) {
        // map.setCenter(place.geometry.location);
        // map.fitBounds(place.geometry.viewport);
        map.panTo(place.geometry.location);
        map.setZoom(15);
        findBreweries().then((response) => {
          console.log(' HELLOW RESPONSE', response);
        })
      } else {
        // map.setZoom(15);
        // myLocationMarker(place);
      }
    });
    }
  function getUserLocation() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA6jvk_PaOvdEptVVlbt_fM799pcwcAztM',
        method: 'POST',

      }).done(function(position) {
        resolve(position);
      }).fail(function(err) {
        console.log('HUSTON WE HAVE AN ERR WITH USER POSITION', err);
        reject(err);
      });
    });
  }

  function geoCodeAddress(location) {
    geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve,reject) {
        geocoder.geocode( { 'location': location }, function(results, status) {
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

  function findBreweries(location) {
    console.log(' WHAT IS THE LOCATION?', map.getBounds());
    let request = {
      // location: location,
      bounds: map.getBounds(),
      keyword: ['bar', 'brewery'],
    }
    return new Promise(function(resolve, reject) {
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // resolve(findDetail(results));
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              // var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: {
                  url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                  anchor: new google.maps.Point(10, 10),
                  scaledSize: new google.maps.Size(15, 17)
                }
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              // google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
            }
            let firstResultSet = results.slice(0,9);

            Promise.all(firstResultSet.map(findDetail)).then(function(details) {
              console.log(' WHAT ARE THE DETAILS?', details);
              resolve(formatGoogleResults(details));
            })
          }else {
            reject(status);
          }
        })
    });
  }
  function dropMarker(i) {
    return function() {
      markers[i].setMap(map);
    };
  }
  function findDetail(resultND, i) {
        return new Promise(function(resolve, reject) {
          service.getDetails(resultND, function(result, status) {
            let okayStatus = google.maps.places.PlacesServiceStatus.OK;
            let overLimit = google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT;
            if (status !== okayStatus) {
                if(status === overLimit) {
                  console.error(status);
                  throw status
                }
                console.error(status);
              throw status;
            }
            resolve(result);
          });
        });
      }

      function formatGoogleResults(details) {
        return new Promise(function(resolve, reject) {
          Promise.all(details.map(createDetailObject))
                 .then((details) => {
                  resolve(details)
                });
          });
      }

      function createDetailObject(details) {
        let detail = {};
        let keys = Object.keys(details);
         keys.map((key) => {
          //  console.log(' WHAT ARE THE KEYS?', key, details[key]);
          switch (key) {
            case 'name': {
              return detail["name"] = details[key];
            }
            case 'opening_hours': {
              return detail["opening_hours"] = details[key];
            }
            case 'formatted_phone_number': {
              return  detail["formatted_phone_number"] = details[key];
            };
            case 'price_level': {
              return detail["price_level"] = details[key];
            }
            case 'website' : {
              return detail["website"] = details[key];
            }
            case 'photos': {
              return detail["photos"] = details[key][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
            }
            case 'rating': {
              return detail[key] = details[key];
            }
            // case 'geometry': {
            //   let orignLat = {
            //     lat: details[key].location.lat(),
            //     lng: details[key].location.lng(),
            //   };
            //   let destinationLng = {
            //     lat:
            //   }
            //   console.log(' LOCATIONNNNNNNNNN', lat, lng);
            //   detail["location"] = details[key].location;
            //   return new Promise(function(resolve, reject) {
            //     $.ajax({
            //       url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat},${lng}&destinations=${}`
            //     })
            //   })
            // }
            default:
              return detail;
          }
        })
        return detail
      }

      // add Markers for our results from google
      function addMarkers(results) {
        for (var i = 0; i < results.length; i++) {
          var result = results[i];
          if (result !== undefined) {
            addMarker(result , i);
          }
        }
      }
     function addMarker(place, i) {
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location,
         icon: {
           url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
           anchor: new google.maps.Point(10, 10),
           scaledSize: new google.maps.Size(15, 17)
         }
       });

       google.maps.event.addListener(marker, 'click', function() {
         console.log(' CLICK', marker);
         service.getDetails(place, function(result, status) {
           console.log(' PLACEEEE CLICKED', result, status);
           if (status !== google.maps.places.PlacesServiceStatus.OK) {
             console.error(status);
             return;
           };
           infoWindow.setContent(result.name);
           infoWindow.open(map, marker);
         });
       });
  }
  that = {};
  that.createDefaultMap = createDefaultMap;
  that.geoCodeAddress = geoCodeAddress;
  // that.reverseGeoCode = reverseGeoCode;
  that.findDetail = findDetail;
  that.getUserLocation = getUserLocation;
  that.formatGoogleResults = formatGoogleResults;
  that.findBreweries = findBreweries;
  return that;
}
