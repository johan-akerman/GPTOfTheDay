import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full bg-orange-500 bg-opacity-20 rounded-lg p-4">
      <h1 className="font-semibold text-center">
        📨 Get the best new GPTs in your inbox weekly!
      </h1>

      <form className="mx-auto text-center mt-2">
        <input
          className="py-2 pl-2 mr-3 rounded-lg text-sm w-80 focus:outline-none bg-gray-100 border-2"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <button
          className="cursor-pointer px-5 py-2 border border-transparent font-medium text-sm rounded-md text-white bg-orange-400 hover:bg-orange-300transform ease-in duration-100"
          // onClick={() => handleSubmit()}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
