import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import GPTCard from "../components/GPTCard";
import gptData from "../data/gpts.json";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../authentication";
import { getGpt, getGptsWithMostUpvotes } from "../firestore";
import SubmitForm from "../components/SubmitForm";

export default function Home() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(getCurrentUser());

  //const gpt = getGpt("H16mtfbLIlocQ3PJgSk4").then(console.log);
  const topgpts = getGptsWithMostUpvotes(10).then(console.log);
  const [currentPage, setCurrentPage] = useState(0);
  function handleLoadMore(i) {
    setCurrentPage(i + 1);
  }

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
      <Jumbotron />
      <div className="bg-lightBrown">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          <div>
            <h1 className="text-black text-center text-5xl sm:mt-5 font-bold pt-8 ">
              🔥 Top GPTs posted today
            </h1>
            <p className="pb-8 pt-6 text-lg text-center">
              Vote on your favourites by clicking the upvote button. You can
              vote on as many as you want!
            </p>
            <div className="w-full flex flex-col gap-3">
              {data.slice(0, 10).map((property, i) => {
                return <GPTCard property={property} i={i} key={i} />;
              })}

              <button
                className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-darkGray hover:bg-opacity-80  text-lg transform ease-in duration-100 group w-40 mt-6 mx-auto"
                onClick={() => handleLoadMore(currentPage)}
              >
                Load more
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-4/12 md:w-8/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-20">
          <SubmitForm />
        </div>

        <div className="pb-20 md:pt-32 pt-20 text-center bg-darkBrown">
          <h1 className="md:w-2/5 w-11/12 mx-auto text-center text-white  text-4xl font-bold mb-12">
            Ready to explore the best GPTs of all time, not just today's?
          </h1>

          <Link
            to="/directory"
            className="mt-6 px-6 py-3 border border-transparent font-medium rounded-md text-white bg-orange-400 text-2xl hover:bg-orange-300"
          >
            Browse all GPTs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
