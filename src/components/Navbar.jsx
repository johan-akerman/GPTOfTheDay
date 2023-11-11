import React from "react";

import { Link } from "react-router-dom";
import { getCurrentUser, logOut, signInUserGoogle } from "../firebase";
import MobileMenu from "./MobileMenu";

export function Navbar({ user, setUser }) {
  const handleLogin = () => {
    signInUserGoogle().then((user) => setUser(getCurrentUser()));
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <div className="bg-green w-full">
      <div className="py-6 md:w-9/12 w-11/12 mx-auto flex justify-between ">
        <div className="flex items-center gap-8">
          <Link className="text-4xl text-white font-medium capitalize" to="/">
            RateMyGPTs
          </Link>

          <Link
            className="lg:block hidden text-lg text-white font-medium"
            to="/leaderboard"
          >
            Leaderboard
          </Link>

          <Link
            className="lg:block hidden text-lg text-white font-medium"
            to="/directory"
          >
            Browse all GPTs
          </Link>

          <Link
            className="lg:block hidden text-lg text-white font-medium"
            to="/submit"
          >
            Submit GPT
          </Link>
        </div>

        <div className="flex justify-between items-center gap-4">
          <MobileMenu user={user} setUser={setUser} />
          {user ? (
            <button
              onClick={() => handleLogOut}
              className="lg:block hidden cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-green bg-white text-lg transform ease-in duration-100 hover:bg-gray-100 "
            >
              Log out
            </button>
          ) : (
            <>
              {" "}
              <Link
                to="/log-in"
                className="lg:block hidden cursor-pointer px-5 py-1.5  font-medium rounded-md text-white border-2 bg-green border-white text-lg transform ease-in duration-100 hover:bg-white hover:text-green "
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="lg:block hidden cursor-pointer px-5 py-1.5 border-2 border-transparent font-medium rounded-md text-green bg-white text-lg transform ease-in duration-100 hover:bg-gray-100 "
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
