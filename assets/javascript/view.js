let searchParams = {}
let googleCardCreator = function() {
  var that;
  function createCard(googleDetails) {
    $.each(googleDetails, function(i, value) {
      // console.log(' WHAT IS OUR I AND VALUE', i, value);
      let { name, formatted_phone_number,opening_hours, price_level, website } = value;
      console.log(' CAN WE GET OUR VARS???', name, formatted_phone_number, opening_hours, price_level, website);
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
});

// moment(bday, ["DD/MM/YYYY"])
