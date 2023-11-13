import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../authentication";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo_dark.png";
import { useAuthState } from "../firebase";
import ProfileMenu from "./ProfileMenu";
import { useEffect } from "react";

export function Navbar() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-mediumBrown w-full">
      <div className="py-6 md:w-9/12 w-11/12 mx-auto flex justify-between ">
        <Link className="text-4xl text-white font-medium capitalize" to="/">
          <img src={logo} className="h-16 mr-4" />
        </Link>

        <div className="flex justify-between items-center md:gap-4 gap-2">
          <Link
            className="lg:block hidden text-lg text-darkBrown font-medium"
            to="/directory"
          >
            Browse all GPTs
          </Link>

          <Link
            className="lg:block hidden text-lg text-darkBrown font-medium mr-4 ml-4"
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
                className="md:flex hidden gap-2 text-center justify-center transition duration-150 cursor-pointer text-lg  rounded-lg  bg-darkGray text-mediumBrown font-semibold px-6 py-3"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google logo"
                />
                <span>Log in with Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
