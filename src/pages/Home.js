import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import GPTCard from "../components/GPTCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../authentication";
import { getHottest, getMostRecent } from "../firestore";
import SubmitForm from "../components/SubmitForm";
import { Timestamp } from "firebase/firestore";
import Carousel from "../components/Carousel";

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
              🔥 <br className="md:hidden block" />
              Top GPTs posted today
            </h1>
            <p className="pb-8 pt-6 text-2xl text-center">
              Upvote your favourites.
            </p>
            <div className="w-full flex flex-col gap-3">
              {dataHottest?.map((gpt, i) => {
                return <GPTCard gpt={gpt} i={i} key={gpt.id} />;
              })}

              {dataHottest?.length == 0 ? (
                <div className="w-full bg-white bg-opacity-50 border-orange-300 border-2 border-dashed rounded-md  py-8 px-4 text-center">
                  <h1 className="text-3xl font-semibold">
                    No GPTs submitted today! 🤖
                  </h1>
                  <p className="text-xl pb-8 pt-2">
                    Get out ahead and post your GPT now.
                  </p>
                  <Link
                    to="/submit"
                    className="px-6 py-2 border border-transparent font-medium rounded-md text-white bg-orange-400 text-xl hover:bg-orange-300"
                  >
                    Submit GPT
                  </Link>
                </div>
              ) : (
                ""
              )}

              {dataHottest?.length % 5 === 0 && dataHottest?.length !== 0 ? (
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
            <h1 className="text-black text-center text-5xl mt-12 font-bold pt-8 ">
              🔔 <br className="md:hidden block" /> Most recent GPTs
            </h1>
            <p className="pb-8 pt-6 text-2xl text-center">
              Upvote your favourites.
            </p>
            <div className="w-full flex flex-col gap-3">
              {dataMostRecent?.map((gpt, i) => {
                return <GPTCard gpt={gpt} i={i} key={gpt.id} />;
              })}

              {dataMostRecent?.length % 5 === 0 ? (
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
            Showcase your GPTs for FREE and get more users!
          </h1>

          <Link
            to="/submit"
            className="mt-6 px-6 py-3 border border-transparent font-medium rounded-md text-white bg-orange-400 text-2xl hover:bg-orange-300"
          >
            Submit GPT
          </Link>
        </div>
      </div>
    </>
  );
}
