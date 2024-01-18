import React from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../authentication";
import MobileMenu from "./MobileMenu";

import logo from "../images/logo_dark.png";
import { useAuthState } from "../firebase";
import ProfileMenu from "./ProfileMenu";

export function Navbar() {
  const { user } = useAuthState();

  return (
    <div className="bg-lightBrown w-full">
      <div className="py-6 md:w-10/12 w-11/12 mx-auto flex justify-between ">
        <Link className="text-4xl text-white font-medium capitalize" to="/">
          <img src={logo} className="h-14 mr-4" />
        </Link>

        <div className="flex justify-between items-center md:gap-4 gap-2">
          <Link
            className="lg:block hidden text-xl text-darkBrown font-semibold mr-4 ml-4"
            to="/directory"
          >
            All GPTs
          </Link>

          <Link
            className="lg:block hidden text-xl text-darkBrown font-semibold mr-4 ml-4"
            to="/submit"
          >
            Submit GPT
          </Link>
          <MobileMenu user={user} />
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <button
                onClick={() => signInWithGoogle()}
                className="md:flex hidden gap-2 text-center justify-center transition duration-150 cursor-pointer text-lg  rounded-full  bg-darkGray text-lightBrown font-semibold px-6 py-3"
              >
                <span>Sign in</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
