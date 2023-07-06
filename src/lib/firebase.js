import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlYDZNyvwuxWn1z78mSfiXObpD2PdyBi8",
  authDomain: "social-media-app-7367d.firebaseapp.com",
  projectId: "social-media-app-7367d",
  storageBucket: "social-media-app-7367d.appspot.com",
  messagingSenderId: "347969947171",
  appId: "1:347969947171:web:5fc2d45c391ef73998d396"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);