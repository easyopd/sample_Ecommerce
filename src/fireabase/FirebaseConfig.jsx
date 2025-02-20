// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Evg-5bpeT0S7I0LZjv08VkMGXoDPubY",
  authDomain: "hunarshawls-7f05d.firebaseapp.com",
  projectId: "hunarshawls-7f05d",
  storageBucket: "hunarshawls-7f05d.firebasestorage.app",
  messagingSenderId: "850529902796",
  appId: "1:850529902796:web:5426ef0184a33393faa269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}