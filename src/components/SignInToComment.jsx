import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { signInWithGoogle } from "../authentication";

export default function SignInToComment() {
  return (
    <div className="bg-gray-100 text-center p-5 rounded-lg mb-10 mt-4 border-2">
      <FontAwesomeIcon icon={faLock} className="text-5xl mb-4 opacity-10" />
      <h1 className="text-2xl font-semibold">Sign up to comment!</h1>
      <p>
        Join our community of people who wants to discover, share and discuss
        the latest GPTs.
      </p>
      <div className="flex gap-3 mx-auto justify-center mt-4">
        <button
          onClick={() => signInWithGoogle()}
          className="md:flex hidden gap-2 text-center justify-center transition duration-150 cursor-pointer text-lg  rounded-lg  bg-darkGray text-mediumBrown font-semibold px-6 py-2"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google logo"
          />
          <span>Log in with Google</span>
        </button>
      </div>
    </div>
  );
}
