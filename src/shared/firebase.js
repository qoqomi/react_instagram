import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxfJnMJtO-RsRdAQKFe6mq-nh eOr3GC44",
  authDomain: "instgram-84c2d.firebaseapp.com",
  projectId: "instgram-84c2d",
  storageBucket: "instgram-84c2d.appspot.com",
  messagingSenderId: "860810333067",
  appId: "1:860810333067:web:ef8db1001ebb89b6cffd8e",
  measurementId: "G-5Q75YSWY9B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const signupEmail = (email, Password) => {
  return createUserWithEmailAndPassword(auth, email, Password);
};

export const loginEmail = (email, Password) => {
  console.log("저장🐸");
  return signInWithEmailAndPassword(auth, email, Password);
};

//firestore
export const db = getFirestore(app);
//storage
export const storage = getStorage(app);

export default app;
