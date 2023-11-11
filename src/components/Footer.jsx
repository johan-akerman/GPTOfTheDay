import React, { useState } from "react";

import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (email.length > 0) {
      console.log(email);
      setEmail("");
    }
  }

  return (
    <div className="bg-green text-white text-center">
      <div className="mx-auto pt-20 pb-28  text-center flex-col flex w-80">
        <Link className="text-4xl font-medium hover:opacity-60" to="/">
          RateMyGPTs
        </Link>

        <p className="mt-8 text-white font-medium mb-4">
          <span>Get the best new GPTs in your inbox weekly!</span>
        </p>

        <input
          class="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 bg-opacity-60 text-black placeholder-black mb-2"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoComplete="off"
        />

        <button
          className="cursor-pointer px-5 py-1 border border-transparent font-medium rounded-md text-green bg-white text-lg transform ease-in duration-100 hover:bg-gray-100"
          onClick={() => handleSubmit()}
        >
          Sign up for free newsletter
        </button>
      </div>
    </div>
  );
}
