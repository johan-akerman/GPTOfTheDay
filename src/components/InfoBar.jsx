import React, { useState } from "react";
import { useEffect } from "react";

export default function InfoBar() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateRemainingTime = () => {
      const sfTimeString = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      });

      const sfTime = new Date(sfTimeString);

      const midnight = new Date(sfTimeString);
      midnight.setHours(24, 0, 0, 0);

      const millisecondsUntilMidnight = midnight - sfTime;
      const totalSecondsLeft = Math.floor(millisecondsUntilMidnight / 1000);

      const hours = Math.floor(totalSecondsLeft / 3600);
      const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
      const seconds = totalSecondsLeft % 60;

      setTimeLeft({
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      });
    };

    updateRemainingTime();

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-darkGray text-center">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 flex justify-center gap-4 items-center">
        <p className="ml-3 text-white font-medium">
          <span className="mr-2">⏰ </span> GPTOTD voting ends in{"   "}
          <span className="text-semibold bg-white bg-opacity-20 text-white px-1.5 py-1 rounded-md">
            {`${timeLeft.hours}h`}
          </span>
          :{" "}
          <span className="text-semibold bg-white bg-opacity-20 text-white px-1.5 py-1 rounded-md">
            {`${timeLeft.minutes}m`}
          </span>
          :{" "}
          <span className="text-semibold bg-white bg-opacity-20 text-white px-1.5 py-1 rounded-md">
            {`${timeLeft.seconds}s`}
          </span>
        </p>
      </div>
    </div>
  );
}
