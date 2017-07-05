
let MAPS = (spec, mySecrets) => {
  let that, map, infowindow, service, geocoder;
   mySecrets = mySecrets || {};

  function createDefaultMap(userLocation) {
    geoCodeAddress(spec.locationSearch).then((response) => {
      let location = response[0].geometry.location;
      map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 14,
        mapTypeId: 'roadmap'
      });
      map.panBy(0, -50)
      service = new google.maps.places.PlacesService(map);
      infoWindow = new google.maps.InfoWindow();
    })
  }
  function getUserLocation() {
    var lat;
        var long;

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                lat = pos.lat;
                long = pos.lng;

                console.log("Lat", lat);
                console.log("LOng", long);
                localStorage.setItem("latlng", JSON.stringify(pos));
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Location found.');
                // infoWindow.open(map);
                // map.setCenter(pos);
              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
  }

  function geoCodeAddress(location) {
    geocoder = new google.maps.Geocoder();
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
      })
  }
  function findBreweries(location) {
    let request = {
      location: JSON.parse(localStorage.getItem('latlng')),
      radius: 1609.34,
      keyword: ['bar' , 'brewery'],
    }
    return new Promise(function(resolve, reject) {
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            // resolve(findDetail(results));
            addMarkers(results);
            let firstResultSet = results.slice(0,9);

            Promise.all(firstResultSet.map(findDetail)).then(function(details) {
              resolve(formatGoogleResults(details));
            })
          }else {
            reject(status);
          }
        })
    });
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
          switch (key) {
            case 'name': {
              return detail[key] = details[key];
            }
            case 'opening_hours': {
              return detail[key] = details[key];
            }
            case 'formatted_phone_number': {
              return  detail[key] = details[key];
            };
            case 'price_level': {
              return detail[key] = details[key];
            }
            case 'website' : {
              return detail[key] = details[key];
            }
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
         service.getDetails(place, function(result, status) {
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
  that.reverseGeoCode = reverseGeoCode;
  that.findDetail = findDetail;
  that.getUserLocation = getUserLocation;
  that.formatGoogleResults = formatGoogleResults;
  that.findBreweries = findBreweries;

  return that;
}
