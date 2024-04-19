// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-4542f.firebaseapp.com",
  projectId: "mernestate-4542f",
  storageBucket: "mernestate-4542f.appspot.com",
  messagingSenderId: "314895189607",
  appId: "1:314895189607:web:c1ae4aadda43714868f6c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);