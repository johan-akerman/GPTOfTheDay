import React, { useState } from "react";

export function InfoBar() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (email.length > 0) {
      console.log("email");
      setEmail("");
    }
  }

  return (
    <div className="bg-yellow-400 text-center">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 flex justify-center gap-4 items-center">
        <p className="ml-3 text-black font-medium">
          <span>Get the best new GPTs in your inbox weekly!</span>
        </p>

        <input
          class="w-44 py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoComplete="off"
        />

        <button
          className="cursor-pointer px-5 py-1 border border-transparent font-medium rounded-md text-orange-400 bg-white text-lg transform ease-in duration-100 hover:bg-gray-100"
          onClick={() => handleSubmit()}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
