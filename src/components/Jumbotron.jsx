import React from "react";
import SubmitForm from "./SubmitForm";
import { Link } from "react-router-dom";
export function Jumbotron() {
  return (
    <>
      <main className="bg-mediumBrown">
        <div className="md:w-9/12 md:text-left text-center w-12/12 pt-12 pb-20 grid grid-cols-12 lg:gap-10 gap-0 mx-auto">
          <div className="lg:col-span-7 col-span-12 md:px-0 px-4 md:pt-12 pt-0">
            <h1 className="text-darkBrown md:text-7xl text-6xl font-bold mb-6">
              Discover, launch and vote on the best custom GPTs.
            </h1>
            <p className="text-darkBrown text-2xl mb-5 ">
              🔍 Find the new GPTs that everyone is talking about
            </p>
            <p className="text-darkBrown text-2xl  mb-5 ">
              🏆 Vote on your favourites and crown a winner
            </p>

            <p className="text-darkBrown text-2xl mb-5 ">
              💬 Join the community and discuss GPTs
            </p>

            <p className="text-darkBrown text-2xl t mb-5 ">
              🚀 Attract users for your GPTs
            </p>
          </div>

          <div className="lg:col-span-5 col-span-12 lg:px-0 px-4 lg:pt-0 pt-12 text-left">
            <SubmitForm />
          </div>
        </div>
      </main>
    </>
  );
}
