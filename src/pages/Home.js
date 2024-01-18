import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import GPTList from "../components/GPTList";
import { Link } from "react-router-dom";

export default function Home() {
  const [days, setDays] = useState(3);

  return (
    <>
      <Jumbotron />
      <div className="bg-lightBrown">
        <div className="md:w-7/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          {Array.from({ length: days }, (_, i) => (
            <GPTList key={i} i={i} />
          ))}

          <div className="w-full mx-auto text-center">
            <button
              className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-darkGray hover:bg-opacity-80  text-lg transform ease-in duration-100 mt-6 mx-auto"
              onClick={() => setDays((res) => res + 1)}
            >
              Load more days
            </button>
          </div>
        </div>
      </div>

      <div className="pb-20 md:pt-32 pt-20 text-center bg-darkBrown">
        <h1 className="md:w-2/5 w-11/12 mx-auto text-center text-white text-5xl font-bold mb-12">
          Showcase your GPT and get more users!
        </h1>

        <Link
          to="/submit"
          className="text-center justify-center transition duration-150 cursor-pointer text-lg rounded-full  bg-orange-400 text-darkBrown font-semibold px-6 py-4"
        >
          Post your GPT for FREE
        </Link>
      </div>
    </>
  );
}
