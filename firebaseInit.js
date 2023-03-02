const dotenv = require('dotenv');
dotenv.config()
const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

console.log(process.env.VUE_APP_API_KEY)


const firebaseApp = firebase.default.initializeApp(firebaseConfig);
const timestamp = firebase.default.firestore.FieldValue.serverTimestamp;
const firebaseDB = firebaseApp.firestore();
// export { timestamp };
// export default firebaseApp.firestore();
module.exports = {timestamp, firebaseDB};