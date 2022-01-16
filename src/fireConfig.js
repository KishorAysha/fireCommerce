import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdAWzL9FgUKPBWK5B0qSbSJIAEuLw8Si8",
  authDomain: "ecommerce-fc411.firebaseapp.com",
  projectId: "ecommerce-fc411",
  storageBucket: "ecommerce-fc411.appspot.com",
  messagingSenderId: "379129170610",
  appId: "1:379129170610:web:ff66cc30dbb2521b4a97ab",
  measurementId: "G-TXFLGNSG1Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
