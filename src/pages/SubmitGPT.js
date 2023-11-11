import { Navbar } from "../components/Navbar";
import React from "react";
import { useEffect } from "react";
import SubmitForm from "../components/SubmitForm";

export default function SubmitGPT() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-grayish h-screen">
        <div className="md:w-4/12 w-11/12 mx-auto h-full md:pt-32  p-0 pt-32 gap-3">
          <SubmitForm />
        </div>
      </div>
    </>
  );
}
