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
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
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
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign("<your-privacy-policy-url>");
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

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
});

/*******************************/
/* Auth State Changes          */
/*******************************/

/*******************************/
/* Firestore DB test           */
/*******************************/

const card_deck = document.querySelector("#id_card_deck");
function renderCard(doc) {
  let card = document.createElement("div");
  card.className = "card";

  let card_body = document.createElement("div");
  card_body.className = "card-body";

  let title = document.createElement("h5");
  title.className = "card-title";

  let img = document.createElement("img");
  img.className ="img";

  card.setAttribute("id", doc.id);
  title.innerText = doc.data().card_name;
  card_body.appendChild(title);
  card.appendChild(card_body);
  img.baseURI = doc.data().card_img_source;
  card.appendChild(img);
  card_deck.appendChild(card);
}

const view_button = document.querySelector("#view_button");
console.log(view_button);
view_button.addEventListener('click', e => {
  e.preventDefault();
  db.collection("cards")
    .get()
    .then(snapshot => {
      //console.log(snapshot.docs);
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderCard(doc);
      });
    });
});


// Hero resize

/*
$(".hero-image").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
  $(".hero").css({ height: $(window).height() + "px" });
});

$(".hero-banner").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
  $(".banner").css({ height: $(window).height() + "px" });
});
*/