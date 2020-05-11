import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB71M9FT43dtg9UMpwSQWRZ0EAiZuJ-n7M",
  authDomain: "udemy-ninja-chat-4cfdf.firebaseapp.com",
  databaseURL: "https://udemy-ninja-chat-4cfdf.firebaseio.com",
  projectId: "udemy-ninja-chat-4cfdf",
  storageBucket: "udemy-ninja-chat-4cfdf.appspot.com",
  messagingSenderId: "871014761231",
  appId: "1:871014761231:web:aba012dd350ec15735f47a",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});
export default firebaseApp.firestore();
