import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {

  apiKey: "AIzaSyBTDbIcUK25PT0CJZg-xRCBWEFl643TRvM",
  authDomain: "healthify-app-b0a2e.firebaseapp.com",
  databaseURL: "https://healthify-app-b0a2e-default-rtdb.firebaseio.com",
  projectId: "healthify-app-b0a2e",
  storageBucket: "healthify-app-b0a2e.appspot.com",
  messagingSenderId: "690902591225",
  appId: "1:690902591225:web:d4b665d57654fe4ae42428",
  measurementId: "G-5NW7N8M1D0"

};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export const database = firebase.database();


export default fire;