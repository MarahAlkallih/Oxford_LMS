import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyABqDM2DoOlLE3mYEPk9mG9UXFD6cXuyIU",
  authDomain: "oxford-lms.firebaseapp.com",
  projectId: "oxford-lms",
  storageBucket: "oxford-lms.firebasestorage.app",
  messagingSenderId: "567293295292",
  appId: "1:567293295292:web:c4a5bdcda0cf7a3f87aeb9",
};
const app = initializeApp(firebaseConfig);
console.log("MODE:", import.meta.env.MODE);
console.log("Firebase Config:", firebaseConfig);
export const messaging = getMessaging(app);