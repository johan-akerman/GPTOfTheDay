import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let firstname = user.displayName.split(" ")[0];
        setCurrentUser({
          id: user.uid,
          firstname: firstname,
        });
      }
    });
  }, []);

  return currentUser;
}
