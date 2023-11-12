import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig";
import { getAuth } from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


// Initialize Authentication
export const auth = getAuth(app);