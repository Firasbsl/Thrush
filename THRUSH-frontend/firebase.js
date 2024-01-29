// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_pYRvrnsYGsYVouRfHPNbzzqPGZOHpuE",
  authDomain: "firas-4fb8a.firebaseapp.com",
  projectId: "firas-4fb8a",
  storageBucket: "firas-4fb8a.appspot.com",
  messagingSenderId: "1061620612282",
  appId: "1:1061620612282:web:24b02c4fcde5cf1edf5683"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
