let searchParams = {}
let googleCardCreator = function() {
  var that;
  function createCard(googleDetails) {
    $.each(googleDetails, function(i, value) {
      // console.log(' WHAT IS OUR I AND VALUE', i, value);
      let { name, formatted_phone_number,opening_hours, price_level, website, photos } = value;

      var targetDiv = $('#searchResults');
      let allGoogleInfo = {
        "name": name,
        "formatted_phone_number": formatted_phone_number,
        "opening_hours": opening_hours,
        "price_level": price_level,
        "website": website,
        "photos": photos,
      };
      let stringifiedResult = JSON.stringify(allGoogleInfo);
      let containerDiv = $("<div>");

      var card = 
          '<div class="card">' +
            '<div class="card-image">' +
              `<img src=${photos} class = "responsive-img imageStyle"/>` +
                `<span class="card-title">${name}</span>` +
                "<a href = '#modal1' class='moreInfo btn-floating halfway-fab waves-effect waves-light green'>"+
                  '<iclass="material-icons">add</i>'+
                '</a>' +
            '</div>'+
          '</div>' +
        
        containerDiv.addClass("col s12 m12 l6");
        containerDiv.html(card)
        containerDiv.data("info", allGoogleInfo);

        // let dataAttr = $(card).children().children().children('.moreInfo').attr("info", {"fuck": "this"});
        // $(card).data("data", value);
        // console.log("What is the card data", card)
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



  $('form').submit(function(e) {
    e.preventDefault();
      let $inputs = $('#beerForm :input:not(:button)');
      console.log(' DO WE GET INPUTS??', $inputs);
      $inputs.each(function(index,value) {
        console.log('WHAT ARE THE VALUES,', $(value)[0].id);
        var prop = $(value)[0].id;
        searchParams[prop] = $(value).val();

      })
      // for (var i = 0;)
      // pass the searchParams to firebase for the current user and store them for quick
      // search later
      console.log(' WHAT ARE THE SEARCH PARAMS', searchParams);
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
       window.location.replace('./materialize_results.html');
  });

  $('#searchResults').on("click", "a", function(e) {
    e.preventDefault();
    let el = $(this).siblings();
    let elParent = $(this).parent();
    let parentEl = elParent.parent()
    console.log("parsed data@@@@@", parentEl.parent().data('info'));
  })

});

// moment(bday, ["DD/MM/YYYY"])
