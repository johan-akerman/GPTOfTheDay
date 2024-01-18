import React from "react";
import SubmitForm from "./SubmitForm";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
export function Jumbotron() {
  return (
    <>
      <main className="bg-lightBrown">
        <div className="md:w-8/12 text-center w-12/12 pt-20 pb-8 lg:gap-10 gap-0 mx-auto">
          <span className="px-5 py-3 bg-orange-300 rounded-full text-sm">
            150+ GPTs already submitted!
          </span>
          <h1 className="text-darkBrown md:text-8xl text-6xl font-semibold mb-6 mt-10">
            The daily leaderboard for custom GPTs
          </h1>

          <p className="text-darkBrown text-2xl mb-10">
            Find, vote and discuss the best new GPTs, every day.
          </p>

          <Link
            to="/submit"
            className="text-center justify-center transition duration-150 cursor-pointer text-lg rounded-full  bg-darkGray text-mediumBrown font-semibold px-6 py-4"
          >
            Post your GPT for FREE
          </Link>
        </div>

        <Carousel />
      </main>
    </>
  );
}
