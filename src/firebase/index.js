// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrtJCdAvbcPjAVbVkmvImk7D3Uz6V3vyk",
  authDomain: "event-calendar-fcd92.firebaseapp.com",
  projectId: "event-calendar-fcd92",
  storageBucket: "event-calendar-fcd92.firebasestorage.app",
  messagingSenderId: "828459955074",
  appId: "1:828459955074:web:1e3a8d8ded7c1f7f1d159b",
  measurementId: "G-16TQZ42T7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };    