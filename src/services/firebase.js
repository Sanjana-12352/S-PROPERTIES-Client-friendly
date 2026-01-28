// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3YUEslwpZi0a7STstlrmFezVoFp-ju2Q",
  authDomain: "real-estate-d0fa3.firebaseapp.com",
  projectId: "real-estate-d0fa3",
  storageBucket: "real-estate-d0fa3.firebasestorage.app",
  messagingSenderId: "347775203498",
  appId: "1:347775203498:web:4a93840cd571ce06eaf8d3",
  measurementId: "G-CZ2ZNY7XMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);