// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFFpDHHDG8ZEBIoR6FrkCDCL8tTtwxbfo",
  authDomain: "chat-c20ee.firebaseapp.com",
  projectId: "chat-c20ee",
  storageBucket: "chat-c20ee.appspot.com",
  messagingSenderId: "118382285867",
  appId: "1:118382285867:web:13a23453ca9dfcf89e466e",
  measurementId: "G-26ZW4ZXNWW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }

export default firebase;