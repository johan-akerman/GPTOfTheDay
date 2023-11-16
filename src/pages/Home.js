import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import GPTCard from "../components/GPTCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../authentication";
import { getHottest, getMostRecent } from "../firestore";
import SubmitForm from "../components/SubmitForm";
import { Timestamp } from "firebase/firestore";

export default function Home({ user }) {
  const [dataHottest, setDataHottest] = useState([]);
  const [dataMostRecent, setDataMostRecent] = useState([]);
  const [currentPageHottest, setCurrentPageHottest] = useState(0);
  const [currentPageRecent, setCurrentPageRecent] = useState(0);

  function handleLoadMoreHottest() {
    setCurrentPageHottest((old) => old + 1);
  }
  useEffect(() => {
    getHottest(5, true).then((res) => setDataHottest((old) => old.concat(res)));
  }, [currentPageHottest]);

  function handleLoadMoreRecent() {
    setCurrentPageRecent((old) => old + 1);
  }

  useEffect(() => {
    getMostRecent(5, true).then((res) =>
      setDataMostRecent((old) => old.concat(res))
    );
  }, [currentPageRecent]);

  useEffect(() => {
    getHottest(5).then((res) => setDataHottest(res));

    getMostRecent(5).then((res) => setDataMostRecent(res));
  }, []);

  return (
    <>
      <Jumbotron />
      <div className="bg-lightBrown">
        <div className="md:w-7/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          <div>
            <h1 className="text-black text-center text-5xl sm:mt-5 font-bold pt-8 ">
              🔥 Top GPTs posted today
            </h1>
            <p className="pb-14 pt-6 text-2xl text-center">
              Vote on your favourites by clicking the upvote button.
            </p>
            <div className="w-full flex flex-col gap-3">
              {dataHottest?.map((gpt, i) => {
                return <GPTCard gpt={gpt} i={i} key={gpt.id} />;
              })}

              {dataHottest?.length % 5 == 0 ? (
                <button
                  className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-darkGray hover:bg-opacity-80  text-lg transform ease-in duration-100 group w-40 mt-6 mx-auto"
                  onClick={() => handleLoadMoreHottest()}
                >
                  Load more
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <h1 className="text-black text-center text-5xl sm:mt-5 font-bold pt-8 ">
              🔔 Most recent GPTs
            </h1>
            <p className="pb-14 pt-6 text-2xl text-center">
              Vote on your favourites by clicking the upvote button.
            </p>
            <div className="w-full flex flex-col gap-3">
              {dataMostRecent?.map((gpt, i) => {
                return <GPTCard gpt={gpt} i={i} key={gpt.id} />;
              })}

              {dataMostRecent?.length % 5 == 0 ? (
                <button
                  className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-darkGray hover:bg-opacity-80  text-lg transform ease-in duration-100 group w-40 mt-6 mx-auto"
                  onClick={() => handleLoadMoreRecent()}
                >
                  Load more
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="pb-20 md:pt-32 pt-20 text-center bg-darkBrown">
          <h1 className="md:w-2/5 w-11/12 mx-auto text-center text-white text-5xl font-bold mb-12">
            Ready to explore the best GPTs of all time?
          </h1>

          <Link
            to="/directory"
            className="mt-6 px-6 py-3 border border-transparent font-medium rounded-md text-white bg-orange-400 text-2xl hover:bg-orange-300"
          >
            Browse all GPTs
          </Link>
        </div>
      </div>
    </>
  );
}
