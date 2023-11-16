import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAdditionalUserInfo,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  signInWithRedirect(auth, googleProvider)
    .then((result) => {
      console.log(result.user);
      auth.currentUser = result.user;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logOut() {
  signOut(auth)
    .then(() => {
      console.log("successful logout");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCurrentUser() {
  return auth.currentUser;
}
