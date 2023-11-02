// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbAo0An9WZEiveXaRowyy2djg1z6Bz8as",
  authDomain: "netflix-gpt-a0af2.firebaseapp.com",
  projectId: "netflix-gpt-a0af2",
  storageBucket: "netflix-gpt-a0af2.appspot.com",
  messagingSenderId: "267567203981",
  appId: "1:267567203981:web:f087b92d05839760c884c4",
  measurementId: "G-JQ3XH1YQMH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
