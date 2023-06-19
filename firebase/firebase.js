import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAskg8BABgzAJK4OuC0XACu7D24uLRBl1Q",
  authDomain: "sesizari-bd7b0.firebaseapp.com",
  projectId: "sesizari-bd7b0",
  storageBucket: "sesizari-bd7b0.appspot.com",
  messagingSenderId: "917849867475",
  appId: "1:917849867475:web:d4bc598ea17f25333a0026"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
