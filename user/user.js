import { auth, db } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { logAction } from "../logs/logger.js";

// Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(db, "users"), {
        uid: userCred.user.uid,
        name,
        email,
      });
      await logAction(userCred.user.uid, "User Registered");
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await logAction(userCred.user.uid, "User Logged In");
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}
