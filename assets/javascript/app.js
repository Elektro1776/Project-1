function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
$(document).ready(function() {
  // Initialize Firebase
  var apiKey = 'AIzaSyCwOFrBMJrkRF4Q7MJ-ysYwEWKewhcJlyk';
  console.log(' CAN WE ACCESS STUFF ABOVE READY ?', initAutocomplete);
  // var config = {
  //   apiKey: "AIzaSyBgKBTuuGt03OVa2v5AIESL9IcvkZn5t5Q",
  //   authDomain: "project-1-bbd03.firebaseapp.com",
  //   databaseURL: "https://project-1-bbd03.firebaseio.com",
  //   projectId: "project-1-bbd03",
  //   storageBucket: "",
  //   messagingSenderId: "581793472401"
  // };
  // firebase.initializeApp(config);
  // var database = firebase.database();
    (function() {
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.739236,-104.990251&radius=1609.34&type=restaurant&keyword=brewery&pagetoken&key=AIzaSyCwOFrBMJrkRF4Q7MJ-ysYwEWKewhcJlyk`,
       type: 'GET',
       crossDomain: true,
       success: function(response) {
         console.log(' WHAT IS OUR RESPONSE DATA', response.results);
       },
    })
  })();



})
