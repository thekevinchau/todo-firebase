// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJkNz9CsJwLOFEMZ9QVoDLEsPNYM9ZQtE",
  authDomain: "todo-firebase-7358e.firebaseapp.com",
  projectId: "todo-firebase-7358e",
  storageBucket: "todo-firebase-7358e.appspot.com",
  messagingSenderId: "976193218776",
  appId: "1:976193218776:web:ce4d86e7d6d3f238b54fad",
  measurementId: "G-6TD7EQ3WFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initializes Firebase authentication and gets a reference to the service that's embedded inside the firebaseConfig.
export const auth = getAuth(app);


//We grab the Firestore database that we created inside of our Firebase config
export const db = getFirestore(app);