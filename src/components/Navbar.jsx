import React from "react";

import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="bg-green w-full px-20 py-6 mx-auto flex justify-between ">
      <div className="flex items-center gap-10">
        <Link className="text-4xl text-white font-medium mr-10" to="/">
          RateMyGPTs
        </Link>

        <Link className="text-lg text-white font-medium" to="/">
          Feed
        </Link>

        <Link className="text-lg text-white font-medium" to="/directory">
          Browse all GPTs
        </Link>

        <Link className="text-lg text-white font-medium" to="/submit">
          Submit GPT
        </Link>
      </div>

      <div className="flex justify-between items-center gap-8">
        <Link to="/sign-in" className="text-white text-lg font-medium">
          Login
        </Link>

        <Link
          to="/sign-up"
          className="cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-green bg-white text-lg transform ease-in duration-100 hover:bg-gray-100 hover:shadow-lg"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
