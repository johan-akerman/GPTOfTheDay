import React from "react";
import SubmitForm from "./SubmitForm";
import { Link } from "react-router-dom";
export function Jumbotron() {
  return (
    <>
      <main className="bg-mediumBrown">
        <div className="md:w-9/12 w-11/12 pt-12 pb-20 mx-auto grid grid-cols-12 gap-10">
          <div className="lg:col-span-7 col-span-12 md:pt-20 pt-0">
            <h1 className="text-darkBrown md:text-7xl text-5xl font-bold mb-4">
              Discover, launch and vote on the best GPTs.
            </h1>

            <p className="text-darkBrown text-2xl mb-8 ">
              Find the new GPTs that everyone is talking about.
            </p>
          </div>

          <div className="lg:col-span-5 lg:block hidden">
            <SubmitForm />
          </div>
        </div>
      </main>
    </>
  );
}
