import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import ReviewSummary from "../components/ReviewSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import data from "../data/lund.json";
import { useEffect } from "react";
import ReactGA from "react-ga";

export default function Rental() {
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const [property, setProperty] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    let tmp = data.filter((prop) => prop.url === id);
    setProperty(tmp[0]);
  }, [data]);

  if (!property) {
    return (
      <>
        {" "}
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
      <div className="bg-white">
        <div className="w-8/12 mx-auto h-full pt-8 md:pb-28 pb-12 grid grid-cols-12 gap-3">
          <div className="col-span-12 mb-8">
            <Link to="/" className="text-xl mr-4 font-medium">
              <FontAwesomeIcon icon={faChevronLeft} /> Go back
            </Link>
          </div>

          <div className="col-span-12 transform ease-in w-full py-4 text-left">
            <div className="flex items-center text-left justify-between">
              <div className="flex items-center">
                <img
                  className="w-28 h-28 rounded-md mr-4 bg-cover"
                  src={property.thumbnail}
                  alt="Preview"
                />
                <div>
                  <p className="text-3xl font-semibold text-gray-900 leading-none">
                    {property.title}
                  </p>
                  <p>Made by: Johan</p>
                  <p>URL: www.chatgpt.com/example</p>
                  <div className="flex gap-3 text-xs mt-1">
                    <p>#Productivity</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md border-gray-300 text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group">
                  Try out
                </div>

                <div className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md text-white border-green bg-green text-lg transform ease-in duration-100 group">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="mr-1.5 group-hover:animate-bounce transform ease-in-out"
                  />{" "}
                  531
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 pb-6">
            <hr></hr>
            <h1 className="text-3xl pt-4">Description</h1>
            <p>Description goes here</p>
          </div>

          <div className=" col-span-12">
            <hr></hr>

            <h1 className="text-3xl py-4">Comments</h1>

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
                  return <ReviewCard review={review} />;
                })
              )}
            </div>

            <div className="bg-gray-100 text-center p-5 rounded-lg mb-10 mt-10">
              <h1 className="text-2xl font-semibold">Join the discussion!</h1>
              <p>Log in to share your feedback and join the community.</p>
              <div className="flex gap-3 mx-auto justify-center mt-4">
                <button className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md text-white border-green bg-green text-lg transform ease-in duration-100 group">
                  Log in
                </button>
                <button className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md text-white border-green bg-green text-lg transform ease-in duration-100 group">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
