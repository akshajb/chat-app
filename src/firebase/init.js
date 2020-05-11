import firebase from "firebase";
var firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain ,
  databaseURL: process.env.VUE_APP_databaseURL ,
  projectId: "udemy-ninja-chat-4cfdf",
  storageBucket: "udemy-ninja-chat-4cfdf.appspot.com",
  messagingSenderId: "871014761231",
  appId: "1:871014761231:web:aba012dd350ec15735f47a",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});
export default firebaseApp.firestore();
