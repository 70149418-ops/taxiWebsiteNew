// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE these values with your actual project credentials from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDNqNfh4K5Ye5KCeZPdBCPnu_DptUZH5GI",
  authDomain: "taxiwebsitenew.firebaseapp.com",
  projectId: "taxiwebsitenew",
  storageBucket: "taxiwebsitenew.firebasestorage.app",
  messagingSenderId: "134683214231",
  appId: "1:134683214231:web:66abde48aa024a66cf44d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it for use in your CRUD tasks [cite: 11]
export const db = getFirestore(app);