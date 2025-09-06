import { db } from "../firebase-config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function logAction(userId, action, details = "") {
  try {
    await addDoc(collection(db, "logs"), {
      userId,
      action,
      details,
      timestamp: serverTimestamp(),
    });
    console.log("Log saved:", action);
  } catch (error) {
    console.error("Error saving log:", error);
  }
}
