import { Navbar } from "../components/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { signInUserGoogle, signInUserGoogleRedirect } from "../authentication";

export default function LogIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    signInUserGoogleRedirect();
  }

  return (
    <>
      <Navbar />
      <div className="bg-lightBrown h-screen ">
        <div className="md:w-4/12 w-11/12 mx-auto h-full pt-20 grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <div className="flex flex-col">
                <h1 className="text-3xl text-center font-semibold mb-3">
                  Welcome back!
                </h1>

                <button 
                  onClick={handleClick}
                  class="flex gap-2 text-center justify-center mt-6 transition duration-150 cursor-pointer text-md font-medium me-2 px-3 py-2 rounded-lg  border-2 bg-gray-100 text-gray-900">
                  <img
                    class="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google logo"
                  />
                  <span>Log in with Google</span>
                </button>
              </div>
              <p className="text-black text-sm opacity-70 pt-4 text-center">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-orange-400 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
