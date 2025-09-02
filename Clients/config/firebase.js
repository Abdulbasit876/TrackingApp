import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  initializeFirestore,
  memoryLocalPersistence,  // 👈 import memory persistence
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfu892L6bLVlp_8ilHYJvcMBr0YqGpDu8",
  authDomain: "tstingapp-dd531.firebaseapp.com",
  projectId: "tstingapp-dd531",
  storageBucket: "tstingapp-dd531.appspot.com",
  messagingSenderId: "231241093549",
  appId: "1:231241093549:web:ea36a350d3b3c734821124",
  measurementId: "G-7Y22FB380C",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Use memory-only persistence for Firestore in React Native
const db = initializeFirestore(app, {
  localCache: memoryLocalPersistence,
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, db };
