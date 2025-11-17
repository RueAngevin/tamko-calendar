import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdeWHhPMrif-xxvOiuxX1C2ZdfrBDPB4A",
  authDomain: "tamko-calendar-5a0c2.firebaseapp.com",
  projectId: "tamko-calendar-5a0c2",
  storageBucket: "tamko-calendar-5a0c2.firebasestorage.app",
  messagingSenderId: "539170321162",
  appId: "1:539170321162:web:6522a8c9c3026f2a0640f3",
  measurementId: "G-GB22CGG3RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);