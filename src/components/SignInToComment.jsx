import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

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
        <Link
          to="/log-in"
          className="cursor-pointer px-5 py-1.5  font-medium rounded-md text-gray-900 border-2 bg-transparent border-gray-900 text-lg transform ease-in duration-100 hover:bg-gray-900 hover:text-white "
        >
          Log in
        </Link>
        <Link
          to="/sign-up"
          className="cursor-pointer px-5 py-1.5 border-2 border-transparent font-medium rounded-md text-white bg-orange-400 text-lg transform ease-in duration-100 hover:bg-opacity-80 "
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
