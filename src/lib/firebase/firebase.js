// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyA3YKiTM2-regyNqUFwuvTM8b5Liqnqqhs",
  authDomain: "sveltekit-auth-7b8e8.firebaseapp.com",
  projectId: "sveltekit-auth-7b8e8",
  storageBucket: "sveltekit-auth-7b8e8.appspot.com",
  messagingSenderId: "927537754032",
  appId: "1:927537754032:web:483d942c778698c8d27075"
  };

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const auth = getAuth(firebaseApp)
