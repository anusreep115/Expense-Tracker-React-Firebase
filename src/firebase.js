import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC2x-WCYx2NT7dRSPsESF65kD1klIh6kM",
  authDomain: "expense-tracker-50830.firebaseapp.com",
  projectId: "expense-tracker-50830",
  storageBucket: "expense-tracker-50830.firebasestorage.app",
  messagingSenderId: "671105913118",
  appId: "1:671105913118:web:e72317d3130ea32be2390f",
  measurementId: "G-RSSJV97JJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)


// firebase login

// firebase init

// firebase deploy