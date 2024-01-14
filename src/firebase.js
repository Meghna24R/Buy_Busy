// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0ghR7bt6UUZELrTpW5vs7BCYVn2mg3ic",
  authDomain: "buybusy-31bb8.firebaseapp.com",
  projectId: "buybusy-31bb8",
  storageBucket: "buybusy-31bb8.appspot.com",
  messagingSenderId: "491293318555",
  appId: "1:491293318555:web:4c5297d6c55ef27d79953e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
