// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwN2QH09MS-IFaV-e-qxHMGkL-7kYnS_E",
    authDomain: "authentication-db938.firebaseapp.com",
    projectId: "authentication-db938",
    storageBucket: "authentication-db938.appspot.com",
    messagingSenderId: "1054749862129",
    appId: "1:1054749862129:web:4e6c7134c71d391cb56150"
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