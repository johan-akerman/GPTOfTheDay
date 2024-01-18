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

  function handleLoadMoreHottest() {
    let tmp = [];

    getWinners(5, true, i).then((res) =>
      setDataHottest((old) => old.concat(res))
    );
  }

  useEffect(() => {
    getWinners(5, false, i).then((res) => setDataHottest(res));
  }, []);

  function getMonthName(monthIndex) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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

  function generateTitle() {
    if (i == 0) {
      return "Top GPTs posted today";
    } else if (i == 1) {
      return "Yesterday's top GPTs";
    } else {
      return (
        getDayName(day.getDay()) +
        ", " +
        getMonthName(day.getMonth()) +
        " " +
        day.getDate()
      );
    }
  }

  return (
    <div className="mb-16">
      <h1 className="text-black text-left text-3xl sm:mt-5 font-semibold pt-4 mb-6 px-3">
        {generateTitle()}
      </h1>

      <div className="w-full flex flex-col gap-3">
        {dataHottest?.map((gpt, index) => {
          return <GPTCard gpt={gpt} i={index} key={gpt.id} />;
        })}

        {dataHottest?.length == 0 && i == 0 ? (
          <div className="mx-3  border border-darkBrown bg-mediumBrown bg-opacity-80 rounded-lg py-2 px-3 align-middle md:flex block justify-between text-center">
            <h1 className="align-middle mt-1.5 md:mb-0 mb-3">
              📭 No GPTs have been submitted yet!
            </h1>

            <Link
              className="md:mx-0 mx-auto px-5 py-2 border border-transparent font-medium text-sm rounded-md text-white bg-darkBrown transform ease-in duration-100"
              to="/submit"
            >
              Submit your GPT now
            </Link>
          </div>
        ) : (
          ""
        )}

        {dataHottest?.length == 0 && i != 0 ? (
          <div className="mx-3 align-middle md:flex block justify-between text-center">
            <h1 className="align-middle md:mb-0 mb-3">
              No GPTs were submitted this day.
            </h1>
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
            Show more GPTs from this day
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
