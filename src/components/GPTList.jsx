import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import GPTCard from "../components/GPTCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getHottest, getWinners } from "../firestore";
import { analyticsLogSelectedLoadMore } from "../ganalytics";
import SubmitForm from "../components/SubmitForm";
import Newsletter from "../components/Newsletter";
import { getPreviousMidnight } from "../utils/times";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function GPTList({ i }) {
  const [dataHottest, setDataHottest] = useState([]);

  const day = getPreviousMidnight(i);
  console.log("day", day);

  console.log(i);

  function handleLoadMoreHottest() {
    getWinners(5, true, i).then((res) =>
      setDataHottest((old) => old.concat(res))
    );
  }

  useEffect(() => {
    getWinners(5, false, i).then((res) => setDataHottest(res));
  }, []);

  function getMonthName(monthIndex) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthIndex >= 0 && monthIndex < 12) {
      return months[monthIndex];
    } else {
      throw new Error("Invalid month index");
    }
  }

  function getDayName(dayIndex) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (dayIndex >= 0 && dayIndex < 7) {
      return days[dayIndex];
    } else {
      throw new Error("Invalid day index");
    }
  }

  return (
    <div className="mb-16">
      <h1 className="text-black text-left text-4xl sm:mt-5 font-bold pt-4 mb-4 px-3">
        {getDayName(day.getDay()) +
          ", " +
          getMonthName(day.getMonth()) +
          " " +
          day.getDate()}
      </h1>

      <div className="w-full flex flex-col gap-3">
        {dataHottest?.map((gpt, i) => {
          return <GPTCard gpt={gpt} i={i} key={gpt.id} />;
        })}

        {dataHottest?.length == 0 ? (
          <div className="w-full bg-white bg-opacity-50 border-orange-300 border-2 border-dashed rounded-md  py-8 px-4 text-center">
            <h1 className="text-2xl mb-4 font-semibold">
              No GPTs submitted this day! 🤖
            </h1>

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
            className="cursor-pointer px-5 py-2 font-medium rounded-md text-orange-500 text-lg group mt-6 mx-auto"
            onClick={() => handleLoadMoreHottest()}
          >
            <FontAwesomeIcon icon={faChevronDown} className="mr-2" />
            Show more GPTs
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
