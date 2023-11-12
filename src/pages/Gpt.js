import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { faLock, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

import Comment from "../components/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import data from "../data/gpts.json";
import { useEffect } from "react";
import GPTCard from "../components/GPTCard";

export default function Gpt() {
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const [property, setProperty] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let tmp = data.filter((prop) => prop.url === id);
    setProperty(tmp[0]);
  }, [data]);

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="bg-grayish h-screen">
          <h1 className="text-center text-xl pt-20">Something went wrong!</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-lightBrown">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-20 md:pb-28 pb-12 gap-3">
          <GPTCard property={property} />

          <div className="mt-4 transform ease-in w-full py-4 text-left bg-white p-4 border rounded-lg">
            <h1 className="text-2xl font-semibold py-2">Comments</h1>

            <div className="bg-gray-100 text-center p-5 rounded-lg mb-10 mt-4 border-2">
              <FontAwesomeIcon
                icon={faLock}
                className="text-5xl mb-4 opacity-10"
              />
              <h1 className="text-2xl font-semibold">Sign up to comment!</h1>
              <p>
                Join our community of people who wants to discover, share and
                discuss the latest GPTs.
              </p>
              <div className="flex gap-3 mx-auto justify-center mt-4">
                <Link
                  to="/log-in"
                  className="cursor-pointer px-5 py-1.5  font-medium rounded-md text-gray-900 border-2 bg-transparent border-gray-900 text-lg transform ease-in duration-100 hover:bg-gray-900 hover:text-white "
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  className="cursor-pointer px-5 py-1.5 border-2 border-transparent font-medium rounded-md text-white bg-orange-400 text-lg transform ease-in duration-100 hover:bg-opacity-80 "
                >
                  Sign up
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {property.reviews.length === 0 ? (
                <div className="h-96 text-center px-5 pt-32 w-96 mx-auto">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-7xl mb-3 text-gray-300"
                  />
                  <h1 className="text-center text-black text-3xl font-bold pb-2">
                    No comments yet...
                  </h1>
                </div>
              ) : (
                property.reviews.map((review) => {
                  return <Comment review={review} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
