// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmvvqwLamcIbJuModoqnl3efPuJSrWjUE",
  authDomain: "cool-firebase-todo.firebaseapp.com",
  projectId: "cool-firebase-todo",
  storageBucket: "cool-firebase-todo.appspot.com",
  messagingSenderId: "1022693482220",
  appId: "1:1022693482220:web:08c1f25522f96e4e3a8fc9",
  measurementId: "G-LWXXGE36WZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export default db;
