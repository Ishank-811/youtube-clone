import firebase from "firebase/app"; 
import "firebase/auth"; 
const firebaseConfig = {
    apiKey: "AIzaSyBGbdT4g70rO2WT0xUG-e7Q19-wuLO1hKo",
    authDomain: "itech-tube.firebaseapp.com",
    projectId: "itech-tube",
    storageBucket: "itech-tube.appspot.com",
    messagingSenderId: "535013013607",
    appId: "1:535013013607:web:963b0cf4132d7339fbfcc2"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase.auth() ;
   