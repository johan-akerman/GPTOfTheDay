import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore"; 
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAdditionalUserInfo} from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const getGptDoc = await getDocs(collection(db, "gpts"));

export function getGpt(id) {
    return getGptDoc.docs.at(0)
    // getGptDoc.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //     doc.data().gpts.forEach((gpt) => {
    //         console.log(`GPT: ${gpt.id} | upvotes: ${gpt.upvotes}}`)
    //     })
    // })
}

// Initialize Authentication
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// export function createUser(email, password) {
//     createUserWithEmailAndPassword(auth, email, password)
//         .catch(error => console.log(error.message));
// }

// export function signInUser(email, password) {
//     signInWithEmailAndPassword(auth, email, password)
//         .then(res => console.log("Logged in"))
//         .catch(error => console.log(error.message));
// }

export function signInUserGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            auth.currentUser = result.user;
        })
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

export function logOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
}

export function getCurrentUser() {
    return auth.currentUser
} 