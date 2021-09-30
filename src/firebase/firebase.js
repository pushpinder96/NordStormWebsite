import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCGarPjuq0Pi1Ssr3PjNN8NGlGDx6aYO-0",
    authDomain: "cloth-shop-7c0c4.firebaseapp.com",
    databaseURL: "https://cloth-shop-7c0c4-default-rtdb.firebaseio.com",
    projectId: "cloth-shop-7c0c4",
    storageBucket: "cloth-shop-7c0c4.appspot.com",
    messagingSenderId: "736521480147",
    appId: "1:736521480147:web:a95a232f6c8d94106d7126",
    measurementId: "G-1M3GRWT903"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firebaseAuth=firebase.auth();
  export default firebase;
  