// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs92ih1lCnEDhjYPmP46fmkDaVA64uXWg",
  authDomain: "player-menu-backend.firebaseapp.com",
  projectId: "player-menu-backend",
  storageBucket: "player-menu-backend.appspot.com",
  messagingSenderId: "64879496350",
  appId: "1:64879496350:web:de1a8a503c5ab4b45f3f8f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const functions = getFunctions(app)
export const storage = getStorage(app)
export const database = getFirestore(app)