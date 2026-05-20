// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKH6OA9YOwKba98uI11Ja-L-IlB8hCrn0",
  authDomain: "spec-app-e07f7.firebaseapp.com",
  projectId: "spec-app-e07f7",
  storageBucket: "spec-app-e07f7.firebasestorage.app",
  messagingSenderId: "871402418057",
  appId: "1:871402418057:web:34687f6fc8c38181ef3b58",
  databaseURL: "https://spec-app-e07f7-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export const storage = getStorage(app);