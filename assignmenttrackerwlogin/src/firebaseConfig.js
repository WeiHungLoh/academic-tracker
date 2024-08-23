import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_APIKEY",
  authDomain: "REPLACE_WITH_YOUR_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECTID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGEBUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDERID",
  appId: "REPLACE_WITH_YOUR_APPID",
  measurementId: "REPLACE_WITH_YOUR_MEASUREMENTID"
};


const app = initializeApp(firebaseConfig);
getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }
