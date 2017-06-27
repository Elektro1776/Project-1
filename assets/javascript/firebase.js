

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

  var database = firebase.database()

  var userRef = database.ref("users")

  // function that sets 3 parameters at the start: name, birthday and email (optional)
  function setUserData(name, birthday, email){
    var user = userRef.push()
    user.set({
      name: name, //key: value
      birthday: birthday,
      email: email,
      recentSearches: null,
    });
  }
  setUserData("charlie", "01/01/1995","cFish@gmail.com")

