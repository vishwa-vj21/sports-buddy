import { db } from "../firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { logAction } from "../logs/logger.js";

const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

// Add Event
if (eventForm) {
  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const eventName = document.getElementById("eventName").value;
    const city = document.getElementById("city").value;
    const area = document.getElementById("area").value;
    const dateTime = document.getElementById("dateTime").value;

    try {
      await addDoc(collection(db, "events"), {
        eventName,
        city,
        area,
        dateTime,
      });
      await logAction("admin", "Event Added", eventName);
      alert("Event added!");
      loadEvents();
    } catch (err) {
      alert(err.message);
    }
  });
}

// Load Events
async function loadEvents() {
  eventList.innerHTML = "";
  const querySnap = await getDocs(collection(db, "events"));
  querySnap.forEach((docSnap) => {
    const event = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${event.eventName} - ${event.city} - ${event.area} - ${event.dateTime}`;
    li.innerHTML += ` <button onclick="deleteEvent('${docSnap.id}')">Delete</button>`;
    eventList.appendChild(li);
  });
}

window.deleteEvent = async (id) => {
  await deleteDoc(doc(db, "events", id));
  await logAction("admin", "Event Deleted", id);
  loadEvents();
};

if (eventList) loadEvents();
