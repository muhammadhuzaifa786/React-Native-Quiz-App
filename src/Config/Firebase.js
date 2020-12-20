import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDqos8SAswHBMziSRj_0BFIvmuEPVrRCbs",
    authDomain: "rncliquizapp.firebaseapp.com",
    databaseURL: "https://rncliquizapp.firebaseio.com",
    projectId: "rncliquizapp",
    storageBucket: "rncliquizapp.appspot.com",
    messagingSenderId: "776645759105",
    appId: "1:776645759105:web:576113b248b6e13e447d80",
    measurementId: "G-3JK6QJNEKG"
  };



  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);