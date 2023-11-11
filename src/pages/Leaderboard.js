import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import GPTCard from "../components/GPTCard";
import gptData from "../data/gpts.json";
import { useEffect } from "react";
import { getCurrentUser, getGpt } from "../firebase";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(getCurrentUser());
  const gpt = getGpt(0);
  console.log(gpt);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  useEffect(() => {
    let tmp = gptData;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <div className="bg-grayish">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          <div>
            <h1 className="text-black md:text-left text-center  text-4xl sm:mt-5 font-bold pb-8 pt-8 ">
              Top GPTs posted today
            </h1>
            <div className="w-full flex flex-col gap-3">
              {data.slice(0, 10).map((property, i) => {
                return <GPTCard property={property} i={i} key={i} />;
              })}
            </div>
          </div>

          <div>
            <h1 className="text-black md:text-left text-center  text-4xl sm:mt-5 font-bold pb-8 pt-8 ">
              Top GPTs posted in the last 7 days
            </h1>
            <div className="w-full flex flex-col gap-3">
              {data.slice(0, 10).map((property, i) => {
                return <GPTCard property={property} i={i} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
