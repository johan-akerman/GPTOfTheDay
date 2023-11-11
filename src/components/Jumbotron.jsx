import React from "react";
import SubmitForm from "./SubmitForm";
import { Link } from "react-router-dom";
export function Jumbotron() {
  return (
    <>
      <main className="bg-green">
        <div className="md:w-9/12 w-11/12 pt-12 pb-20 mx-auto grid grid-cols-12 gap-10">
          <div className="lg:col-span-7 col-span-12 md:pt-20 pt-0">
            <h1 className="text-white md:text-7xl text-5xl font-bold mb-4">
              Discover, launch and review GPTs.
            </h1>

            <p className="text-white text-2xl mb-8 ">
              Find the new GPTs that everyone is talking about.
            </p>

            <Link
              to="/directory"
              className="text-center mt-6 px-6 py-3 border border-transparent font-medium rounded-md text-green bg-white text-2xl transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg"
            >
              Explore GPTs
            </Link>
          </div>

          <div className="lg:col-span-5 lg:block hidden">
            <SubmitForm />
          </div>
        </div>
      </main>
    </>
  );
}
