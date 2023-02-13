import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZj7roL-gjba9a_PDriKlgt1gEX4QUV_I",
  authDomain: "techblogs-85a21.firebaseapp.com",
  projectId: "techblogs-85a21",
  storageBucket: "techblogs-85a21.appspot.com",
  messagingSenderId: "1071150006471",
  appId: "1:1071150006471:web:82b6a45e7843fab2153ee2",
  measurementId: "G-DGBKT4KYNR"
};



  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export { timestamp };
  export default firebaseApp.firestore();