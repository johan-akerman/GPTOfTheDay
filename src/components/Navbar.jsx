import React from "react";

import { Link } from "react-router-dom";
import { getCurrentUser, logOut, signInUserGoogle } from "../firebase";
import MobileMenu from "./MobileMenu";

import logo from "../images/logo_dark.png";

export function Navbar({ user, setUser }) {
  const handleLogin = () => {
    signInUserGoogle().then((user) => setUser(getCurrentUser()));
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <div className="bg-mediumBrown w-full">
      <div className="py-6 md:w-9/12 w-11/12 mx-auto flex justify-between ">
        <Link className="text-4xl text-white font-medium capitalize" to="/">
          <img src={logo} className="h-16 mr-4" />
        </Link>

        <div className="flex justify-between items-center gap-4">
          <Link
            className="lg:block hidden text-lg text-darkBrown font-medium"
            to="/directory"
          >
            Browse all GPTs
          </Link>

          <Link
            className="lg:block hidden text-lg text-darkBrown font-medium mr-10 ml-4"
            to="/submit"
          >
            Submit GPT
          </Link>
          <MobileMenu user={user} setUser={setUser} />
          {user ? (
            <button
              onClick={() => handleLogOut}
              className="lg:block hidden cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-orange-400 bg-white text-lg transform ease-in duration-100 hover:bg-gray-100 "
            >
              Log out
            </button>
          ) : (
            <>
              {" "}
              <Link
                to="/log-in"
                className="lg:block hidden cursor-pointer px-5 py-1.5  font-medium rounded-md text-darkBrown border-2 bg-transparent border-darkBrown text-lg transform ease-in duration-100 hover:bg-darkBrown hover:text-lightBrown "
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="lg:block hidden cursor-pointer px-5 py-1.5 border-2 border-transparent font-medium rounded-md text-mediumBrown bg-darkBrown text-lg transform ease-in duration-100 hover:bg-opacity-80 "
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
