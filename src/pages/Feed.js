import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import RentalCard from "../components/RentalCard";
import { InfoBar } from "../components/InfoBar";
import lundData from "../data/lund.json";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

export default function Feed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    let tmp = lundData;
    tmp.sort(function (a, b) {
      // Sort by average rating.
      if (a.averageRating > b.averageRating) return -1;
      if (a.averageRating < b.averageRating) return 1;

      // If the votes number is the same between both items, sort alphabetically
      if (a.reviews.length < b.reviews.length) return 1;
      if (a.reviews.length > b.reviews.length) return -1;
    });
    setData(tmp);
  }, []);

  return (
    <>
      <InfoBar />
      <Navbar />
      <Jumbotron />
      <div className="bg-white">
        <div className="md:w-8/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          <div>
            <h1 className="text-black text-left text-3xl sm:mt-5 font-bold pb-8 pt-8 ">
              Top GPTs posted Today, November 10
            </h1>
            <div className="w-full">
              {data.slice(0, 10).map((property, i) => {
                return <RentalCard property={property} i={i} key={i} />;
              })}
            </div>
          </div>

          <div>
            <h1 className="text-black text-left text-3xl sm:mt-5 font-bold pb-8 pt-8 ">
              Top GPTs posted in the last 7 days
            </h1>
            <div className="w-full">
              {data.slice(0, 10).map((property, i) => {
                return <RentalCard property={property} i={i} key={i} />;
              })}
            </div>
          </div>

          <div className="my-16 text-center">
            <h1 className="text-center text-black lg:text-4xl text-3xl sm:mt-5 font-bold">
              Want to discover the best GPTs of all time?
            </h1>

            <p className="mt-3 md:text-xl text-lg px-5 mb-8">
              Browse, search and filter our library of GPTs.
            </p>

            <Link
              to="/directory"
              className="mt-6 px-6 py-3 border border-transparent font-medium rounded-md text-white bg-green text-2xl transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg"
            >
              Browse all GPTs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
