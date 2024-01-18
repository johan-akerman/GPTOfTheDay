import React, { useState } from "react";
import { useEffect } from "react";
import { getSfNextMidnight, getSfTime } from "../utils/times";

export default function InfoBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // ⌛
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const sfTime = getSfTime();

      const midnight = getSfNextMidnight();

      const millisecondsUntilMidnight = midnight - sfTime;
      const totalSecondsLeft = Math.floor(millisecondsUntilMidnight / 1000);

      const hours = Math.floor(totalSecondsLeft / 3600);
      const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
      const seconds = totalSecondsLeft % 60;
      let tmpEmoji = "";

      setTimeLeft({
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      });

      seconds % 2 == 0 ? (tmpEmoji = "⌛") : (tmpEmoji = "⏳");
      setEmoji(tmpEmoji);
    };

    updateRemainingTime();

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-darkGray text-center">
      <div className="max-w-7xl mx-auto py-3 px-2 sm:px-3 lg:px-8 flex justify-center md:gap-4 gap-2 items-center">
        <p className="text-white font-medium md:text-lg text-sm">
          <span className="mr-1"> {emoji}</span> Daily voting ends in{"   "}
          <span className="text-semibold bg-white bg-opacity-20 text-white md:px-1.5 px-1 py-1 rounded-md ">
            {`${timeLeft.hours}h`}
          </span>
          :{" "}
          <span className="text-semibold bg-white bg-opacity-20 text-white md:px-1.5 px-1 py-1 rounded-md">
            {`${timeLeft.minutes}m`}
          </span>
          :{" "}
          <span className="text-semibold bg-white bg-opacity-20 text-white md:px-1.5 px-1 py-1 rounded-md">
            {`${timeLeft.seconds}s`}
          </span>
        </p>
      </div>
    </div>
  );
}
