// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfu892L6bLVlp_8ilHYJvcMBr0YqGpDu8",
  authDomain: "tstingapp-dd531.firebaseapp.com",
  projectId: "tstingapp-dd531",
  storageBucket: "tstingapp-dd531.appspot.com",
  messagingSenderId: "231241093549",
  appId: "1:231241093549:web:ea36a350d3b3c734821124",
  measurementId: "G-7Y22FB380C",
};

// ✅ Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Always initializeAuth once in RN
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
