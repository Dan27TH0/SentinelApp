// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAIwDccIRpfAjDa9BpJCWKs_ovS92L4HE",
    authDomain: "nexusitc-2ed5e.firebaseapp.com",
    projectId: "nexusitc-2ed5e",
    storageBucket: "nexusitc-2ed5e.firebasestorage.app",
    messagingSenderId: "162005026388",
    appId: "1:162005026388:web:8b2f11bc8004d412424fc1",
    measurementId: "G-KMNWHY7ESN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);