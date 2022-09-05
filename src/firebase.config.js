// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTWFd8FcL3qJXGG2P-T79ivAhW6CdC4og",
  authDomain: "churchdatabase.netlify.app",
  projectId: "churchdocs-79e0d",
  storageBucket: "churchdocs-79e0d.appspot.com",
  messagingSenderId: "1096538489264",
  appId: "1:1096538489264:web:3a7b5ff56d3aab103dd675",
  measurementId: "G-SNV7W190JQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default { app, storage };
const analytics = getAnalytics(app);
