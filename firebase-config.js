// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAY7xm7_LV3eeme_ZknpdEvSz6vlUhxWLk",
  authDomain: "sports-buddy-22af5.firebaseapp.com",
  projectId: "sports-buddy-22af5",
  storageBucket: "sports-buddy-22af5.firebasestorage.app",
  messagingSenderId: "726616315879",
  appId: "1:726616315879:web:5189748be0b5c577d88f42",
  measurementId: "G-J166TVZ6DV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
