// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDpwRkx3AQDkExIsS4sxRup8Xl2yvjeUR8",
    authDomain: "notify-me-76c82.firebaseapp.com",
    projectId: "notify-me-76c82",
    storageBucket: "notify-me-76c82.appspot.com",
    messagingSenderId: "494238314125",
    appId: "1:494238314125:web:28d33066b62e8397743cc4",
    measurementId: "G-6LKZ6XH3MB"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);



export default db;

export {app, auth, storage};