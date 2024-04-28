// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqdikRZo6gLA8Q2aZLrr1xQJLy7HvilNc",
  authDomain: "todolist-a6601.firebaseapp.com",
  projectId: "todolist-a6601",
  storageBucket: "todolist-a6601.appspot.com",
  messagingSenderId: "901255861455",
  appId: "1:901255861455:web:cd20f277d522ffa98f93ba",
  measurementId: "G-9ZD90MXR3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);