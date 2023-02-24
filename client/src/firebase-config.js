// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Firestore
import { getFirestore } from 'firebase/firestore';
// Authentication
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5rARvWDOIXXemhqU3bOjSeOKllFQhST0",
  authDomain: "priora-f4b5b.firebaseapp.com",
  projectId: "priora-f4b5b",
  storageBucket: "priora-f4b5b.appspot.com",
  messagingSenderId: "172984077746",
  appId: "1:172984077746:web:dbb625b41a0774e33668ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();