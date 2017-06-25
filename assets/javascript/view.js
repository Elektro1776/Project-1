let searchParams = {}
$(document).ready(function() {

  $('form').submit(function(e) {
    e.preventDefault();
      let $inputs = $('#beerForm :input:not(:button)');
      // console.log(' DO WE GET INPUTS??', $inputs);
      $inputs.each(function(index,value) {
        // console.log(' WHAT ARE THE VALUES AND INDEX', value, index);
        let prop = $(value)[0].id;
        searchParams[prop] = $(value).val();

      })
      // pass the searchParams to firebase for the current user and store them for quick
      // search later
      console.log(' WHAT ARE THE SEARCH PARAMS', searchParams);
      sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
      window.location.replace('./materialize_results.html');
  });
});
