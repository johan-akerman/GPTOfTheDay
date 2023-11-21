import React from "react";
import SubmitForm from "./SubmitForm";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
export function Jumbotron() {
  return (
    <>
      <main className="bg-mediumBrown">
        <div className="md:w-10/12 md:text-left text-center w-12/12 pt-12 pb-20 grid grid-cols-12 lg:gap-10 gap-0 mx-auto">
          <div className="lg:col-span-7 col-span-12 md:px-0 px-4 md:pt-12 md:mt-8 mt-0">
            <h1 className="text-darkBrown md:text-7xl text-6xl font-extrabold mb-6">
              Find, share and vote on the best new GPTs
            </h1>

            <p className="text-darkBrown text-2xl mb-5">
              🔍 <span className="underline font-semibold">Find</span> the new
              GPTs that everyone is talking about.
            </p>

            <p className="text-darkBrown text-2xl t mb-5 ">
              🚀 <span className="underline font-semibold">Share</span> your GPT
              for FREE and attract new users.
            </p>
            <p className="text-darkBrown text-2xl  mb-5 ">
              🏆 <span className="underline font-semibold">Vote</span> on your
              favourites and crown a winner.
            </p>
          </div>

          <div className="lg:col-span-5 col-span-12 lg:px-0 px-4 lg:pt-0 pt-12 text-left">
            <SubmitForm />
          </div>
        </div>

        <Carousel />
      </main>
    </>
  );
}
