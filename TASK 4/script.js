
var firebaseConfig = {
  apiKey: "AIzaSyC08SM9kYyiNLsBNhox8lqJV03MoZcRNYk",
  authDomain: "login-with-firebase-data-c9232.firebaseapp.com",
  projectId: "login-with-firebase-data-c9232",
  storageBucket: "login-with-firebase-data-c9232.appspot.com",
  messagingSenderId: "854233600839",
  appId: "1:854233600839:web:bdb76783bce88954517262"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password not Entered!!')
    return
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login() {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password not Entered!!')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser

      var database_ref = database.ref()

      var user_data = {
        last_login: Date.now()
      }

      database_ref.child('users/' + user.uid).update(user_data)

      alert('User Logged In!!')
      window.location.href = "welcome.html"
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message

      if (error_code === "auth/invalid-email" || error_code === "auth/user-not-found" || error_code === "auth/wrong-password") {
        alert("Incorrect email or password. Please try again.")
      } else {
        alert(error_message)
      }
    })
}





function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}