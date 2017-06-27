$(document).ready(function(){


/**
Root
  Users
    User1id
    User2id
    User3id
      Name
      Email
      Bday
      Recents
        search 1
        search 2
        search 3
        search 4
        search 5      
*/


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgKBTuuGt03OVa2v5AIESL9IcvkZn5t5Q",
    authDomain: "project-1-bbd03.firebaseapp.com",
    databaseURL: "https://project-1-bbd03.firebaseio.com",
    projectId: "project-1-bbd03",
    storageBucket: "project-1-bbd03.appspot.com",
    messagingSenderId: "581793472401"
  };

  firebase.initializeApp(config);
  
  // firebase variables 
  var database = firebase.database();
  var userRef = database.ref("users");

  // variable for today's date (to compare user's bday)
  var today = new Date()
  today = moment(today).format('YYYY-MM-DD');



console.log(today)

  // function that sets 3 parameters at the start: name, birthday and email (optional)
  function setUserData(userInputData){
    console.log(userInputData)
    var user = userRef.push()
    user.set({
      name: userInputData.userName, //key: value
      birthday: userInputData.buserBDay, //prop = field will need to reset
      email: userInputData.userEmail,
      recentSearches: null,
    });
  }
  // setUserData("Charlie", "07/04/1996","charlie@gmail.com")


  // Capture user data on "Welcome to Beer Navigator" Take Off

  //Stores form entries as an array and feeds array into userInput object
  $('form').submit(function(e) {
    e.preventDefault()
    var userInput = {}
    var $inputs = $('#FBcapture :input:not(:button)')
    $inputs.each(function(index, value){
      var prop = $(value)[0].id;
      console.log(prop)
      userInput[prop] = $(value).val()
      console.log(index, value)

    })

 setUserData(userInput);




   test = ((2017/06/26)-(1989/10/17))
   console.log(test)

  });

    // if ((today - userBDay) < 21) {
    //   // If true, take user to a new "Sorry Charlie" page
    
    // } else if(true) {
    //     user.name.push(userName.val())
    //     user.birthday.push(userBDay.val())
    //     user.email.push(userEmail.val())
    
    // } else {

    // };
    
});
      





