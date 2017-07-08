let searchParams = {}
let googleCardCreator = function() {
  var that;
  function createCard(googleDetails) {
    var targetDiv = $('#searchResults');

    targetDiv.html('')
    $.each(googleDetails, function(i, value) {
      // console.log(' WHAT IS OUR I AND VALUE', i, value);
      let { name, formatted_phone_number,opening_hours, price_level, website, photos, rating } = value;

      let allGoogleInfo = {
        "name": name,
        "formatted_phone_number": formatted_phone_number,
        "opening_hours": JSON.stringify(opening_hours),
        "price_level": price_level,
        "website": website,
        "photos": photos,
        "rating": rating,
      };
      let containerDiv = $("<div>");
      var card =
          '<div class="card">' +
            '<div class="card-image">' +
              `<img src=${photos} class = "responsive-img imageStyle"/>` +
                `<div><span class="card-title">${name}</span></div>` +

            '</div>'+
            "<div class= 'infoButton'>" +
                  "<a href = '#modal1' class='moreInfo btn right'>"+
                  '<iclass="material-icons">More Info</i>'+
                '</a>' +
           "</div>" +
          '</div>';

        containerDiv.addClass(" col s12 m12 l6");
        containerDiv.html(card)
        containerDiv.data("info", allGoogleInfo);

        targetDiv.append(containerDiv);

    });
  }
  that = {};
  that.createCard = createCard;
  return that;
}

$(document).ready(function() {

  $('.parallax').parallax();

  $('.collapsible').collapsible();

  $(".button-collapse").sideNav();

  $('.modal').modal();

   $('#modal1').modal('close');

   $(".button-collapse").sideNav({

    closeOnClick: true,

   });


let test = $('form');
  // listen for form submit on our results page
  $('.side-nav form').on('submit', function(e) {
    e.preventDefault();
      let $inputs = $('#beerForm :input:not(:button)');
      $inputs.each(function(index,value) {
        var prop = $(value)[0].id;
        searchParams[prop] = $(value).val();

      })
      // initialMap.geoCodeAddress(searchParams);
      // pass the searchParams to firebase for the current user and store them for quick
      // search later
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
      //  window.location.replace('./materialize_results.html');
  });

  function createHoursTable(hoursResults) {
    $.each(hoursResults, function(value) {

    })
    let html = `
      <table class="responsive-table">
        <thead>
          <tr>
            <th>Hours Of Operation</th>
          </tr>
        </thead>`
        return html
  }
  function displayBreweryModal(breweryData) {
    let parsedHours = JSON.parse(breweryData.opening_hours);
    let openNow;
    if (parsedHours.open_now) {
      openNow = 'yes';
    } else {
      openNow = 'no'
    }
    $('#modal1 thead tr').html('');
    $.each(parsedHours.weekday_text, function(index,value) {
      let tableData = `
          <th>${value}</th>
        `
      $('#modal1 thead tr').append(tableData)
    });
    // let table = createHoursTable(parsedHours.weekday_text)
    $('#modal1 #breweryName').text(breweryData.name);
    $('#modal1 #phoneNumber').text(breweryData.formatted_phone_number);
    $('#modal1 #openNow').text(openNow);
    $('#modal1 #rating').text(breweryData.rating);
    $('#modal1 #website').text(breweryData.website);

    // $('#modal1 #isOpen').append(table)
    $('#modal1 .imageStyle').attr('src', breweryData.photos)
    $('#modal1').modal('open');
  }
  $('#searchResults').on("click", ".card a", function(e) {
    e.preventDefault();
    let el = $(this).siblings();
    let elParent = $(this).parent();
    let parentEl = elParent.parent();
    let breweryData = parentEl.parent().data('info');
    displayBreweryModal(breweryData);
  })

});
