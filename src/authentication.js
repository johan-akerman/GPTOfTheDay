import { signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAdditionalUserInfo, signInWithRedirect} from "firebase/auth";
import { auth } from "./firebase";
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

export function signInUserGoogleRedirect() {
    signInWithRedirect(auth, googleProvider);
}

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