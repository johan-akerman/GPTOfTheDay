import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";


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
const googleProvider = new GoogleAuthProvider();

export function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .catch(error => console.log(error.message));
}

export function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(res => console.log("Logged in"))
        .catch(error => console.log(error.message));
}

export function signInUserGoogle() {
    signInWithPopup(auth, googleProvider)
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(`Google signin error: ${errorMessage}`)
        })
}