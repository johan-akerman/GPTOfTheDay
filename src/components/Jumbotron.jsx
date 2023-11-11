import React from "react";
import SubmitForm from "./SubmitForm";

export function Jumbotron() {
  return (
    <>
      <main className="bg-green">
        <div className="w-11/12 pt-12 pb-20 mx-auto grid grid-cols-12">
          <div className="col-span-6 pt-20">
            <h1 className="text-white lg:text-7xl sm:text-5xl text-3xl font-bold mb-4">
              Discover, launch and review GPTs.
            </h1>

            <p className="text-white text-2xl mb-8">
              Submit your GPTs to get free exposure and feedback.
            </p>
          </div>

          <div className="col-span-6 ">
            <SubmitForm />
          </div>
        </div>
      </main>
    </>
  );
}
