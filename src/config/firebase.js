import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJHeU0LGGrcvdeUbsPei6IRNJiBbAgRwk",
  authDomain: "enverx-assignment-d6e50.firebaseapp.com",
  projectId: "enverx-assignment-d6e50",
  storageBucket: "enverx-assignment-d6e50.appspot.com",
  messagingSenderId: "268575251964",
  appId: "1:268575251964:web:29e6aea0103efab2bce679",
  measurementId: "G-9L6YYZY4ST",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
