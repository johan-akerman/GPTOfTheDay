import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const getGptDoc = await getDocs(collection(db, "gpts"));

export function getGpt(id) {
    getGptDoc.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        doc.data().gpts.forEach((gpt) => {
            console.log(`GPT: ${gpt.id} | upvotes: ${gpt.upvotes}}`)
        })
    })
}

// Initialize Authentication
const auth = getAuth(app);

export function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .catch(error => console.log(error.message));
}

export function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(res => console.log("Logged in"))
        .catch(error => console.log(error.message));
}