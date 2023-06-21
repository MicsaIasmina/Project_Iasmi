import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCX-g_oik6V12X5K_XFfFrrbdi2ih_aIsM",
  authDomain: "proiect-sesizari.firebaseapp.com",
  projectId: "proiect-sesizari",
  storageBucket: "proiect-sesizari.appspot.com",
  messagingSenderId: "734505026906",
  appId: "1:734505026906:web:9c454e54b7ceaa39535f63",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
