import firebase from "firebase"
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "react-portfolio-20200111.firebaseapp.com",
  databaseURL: "https://react-portfolio-20200111.firebaseio.com",
  projectId: "react-portfolio-20200111",
  storageBucket: "react-portfolio-20200111.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: "1:76751699151:web:b93c2ccd5c2f2cbbe80bba",
  // measurementId: "G-E7P4ST23HN"
}

firebase.initializeApp(config)
// db関係の記述
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default firebase;