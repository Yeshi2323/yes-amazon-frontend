import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLV9uykoy5ksF5xEkQVPYHXxbUJ8-SPKw",
  authDomain: "clone-646b8.firebaseapp.com",
  projectId: "clone-646b8",
  storageBucket: "clone-646b8.firebasestorage.app",
  messagingSenderId: "435252181816",
  appId: "1:435252181816:web:81f2ff9d907e6bc2ca1fcd",
  measurementId: "G-E497X1913M",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// export { auth, db, analytics };
