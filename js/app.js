

/************************************************************************/
/*        Firebase Initialisation                                       */
/* Google Firebase Auth Script                                          */
/* The core Firebase JS SDK is always required and must be listed first */
/************************************************************************/

var firebaseConfig = {
  apiKey: "AIzaSyB-m1osjoQA-q9NeXhfbUFzdcN23l5fhjg",
  authDomain: "global-drugs-test.firebaseapp.com",
  databaseURL: "https://global-drugs-test.firebaseio.com",
  projectId: "global-drugs-test",
  storageBucket: "global-drugs-test.appspot.com",
  messagingSenderId: "592464685169",
  appId: "1:592464685169:web:c41156d120d3741919d3d0",
  measurementId: "G-W2MBNTGDG1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
//db.settings({ timestampsInSnapshots: true});

/* Firebase Authentication complete */


/*******************************/
/* Firebase Auth UI component */
/*******************************/

var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

/*******************************/
/* Firebase Auth UI component */
/*******************************/

/*******************************/
/* Auth State Changes          */
/*******************************/

auth.onAuthStateChanged(user => {
  
  if (user) {
    console.log("user logged in");
  } else {
    console.log("user not logged in");
  }
})

/*******************************/
/* Auth State Changes          */
/*******************************/


/*******************************/
/*        Sign UP              */
/*******************************/
const signupForm = document.querySelector('#signUpForm');
console.log(signupForm);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

signupForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const userEmail = signupForm['InputEmail1'].value;
    const passWord = signupForm['InputPassword1'].value;
    console.log( userEmail, passWord);

    // Sign Up user with email and password
    auth.createUserWithEmailAndPassword(userEmail,passWord).then(cred =>{
         $('#signUpModal').modal('toggle'); 
         signupForm.reset();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
})

/*******************************/
/*        Sign UP              */
/*******************************/


/*******************************/
/*        SIGN IN              */
/*******************************/

const signInForm = document.querySelector('#signInForm');
console.log(signInForm);

signInForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const userEmail2 = signInForm['InputEmail2'].value;
    const passWord2 = signInForm['InputPassword2'].value;
    console.log( userEmail2, passWord2);

    auth.signInWithEmailAndPassword(userEmail2, passWord2).then(cred =>{
        $('#signInModal').modal('toggle'); 
        signupForm.reset();
   })
   .catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
       } else {
         alert(errorMessage);
       }
       console.log(error);
     });
})


/*******************************/
/*        SIGN IN              */
/*******************************/

/*
var provider = auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
*/

/******************************** */
/* Sign Out */
/******************************** */

const signOut = document.querySelector('#sign-out');
console.log(signOut);

signOut.addEventListener('click', (e) => {

  e.preventDefault();
  auth.signOut().then((resp) => {
    console.log("Signed Out Successfully...!!!");
    console.log(resp);
  });

})

/******************************** */
/* Sign Out */
/******************************** */