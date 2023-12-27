// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJI7ThoM2GrLsrTj8H2xQfVdmLbA7GJSE",
    authDomain: "culture-voyage.firebaseapp.com",
    projectId: "culture-voyage",
    storageBucket: "culture-voyage.appspot.com",
    messagingSenderId: "675639644855",
    appId: "1:675639644855:web:3392771b8588be12e8f332"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
export { app, auth, db }