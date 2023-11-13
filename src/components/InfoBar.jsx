import React, { useState } from "react";
import { useEffect } from "react";

export default function InfoBar() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  function handleSubmit() {
    if (email.length > 0) {
      console.log("email");
      setEmail("");
    }
  }
  useEffect(() => {
    const sfTimeZone = "America/Los_Angeles";

    const updateRemainingTime = () => {
      const sfTime = new Date().toLocaleString("en-US", {
        timeZone: sfTimeZone,
      });
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const millisecondsUntilMidnight = midnight - new Date(sfTime);
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

    // Initial update
    updateRemainingTime();

    // Update every second
    const intervalId = setInterval(updateRemainingTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-darkGray text-center">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 flex justify-center gap-4 items-center">
        <p className="ml-3 text-white font-medium">
          <span className="mr-2">⏰ </span> GPTOTD vote closing in{" "}
          {`${timeLeft.hours}h:${timeLeft.minutes}m:${timeLeft.seconds}s`}!
        </p>
      </div>
    </div>
  );
}
