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
  var today = new Date();
  today = moment(today);




console.log(today)

  // function that sets 3 parameters at the start: name, birthday and email (optional)
  function setUserData(userInputData){
    console.log(userInputData)
    var user = userRef.push()
    localStorage.setItem("userID ", user.key)
    user.set({
      name: userInputData.userName, //key: value
      birthday: userInputData.userBDay, //prop = field will need to reset
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


  //Checks age of user
    var userBirthday = moment(userInput.userBDay, 'MM/DD/YYYY');
    var todaysDate = moment(today, 'MM/DD/YYYY');
    var yearsOld = todaysDate.diff(userBirthday, 'years');
    console.log(todaysDate);
    console.log(userBirthday);
    console.log(yearsOld);

  // Age verification 
    if (yearsOld < 21){
      alert("Sorry Charlie")
      // window.location.replace("https://www.google.com/")

    } else if (true){
      // Kicks user data into firebase
      setUserData(userInput);
      // window.location.replace("https://www.google.com/");
    } else{};


  });

    
});
      


