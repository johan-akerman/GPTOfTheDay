import { Navbar } from "../components/Navbar";
import React from "react";
import { useEffect } from "react";
import SubmitForm from "../components/SubmitForm";

export default function SubmitGPT({ user }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-lightBrown min-h-screen">
        <div className="md:w-4/12 w-11/12 mx-auto h-full md:pt-32  p-0 pt-32 gap-3 pb-20">
          <SubmitForm />
        </div>
      </div>
    </>
  );
}
