import React from "react";

export default function Comment({ review }) {
  function getNiceDataString(date) {
    if (date === "Just now") {
      return "Just now";
    } else {
      const dateFromFb = new Date(date.seconds * 1000);

      const currentSfTime = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        })
      );

      const milliSecondsPerMinute = 60 * 1000;
      const milliSecondsPerHour = milliSecondsPerMinute * 60;
      const milliSecondsPerDay = milliSecondsPerHour * 24;

      const elapsed = currentSfTime - dateFromFb;

      if (elapsed < milliSecondsPerMinute) {
        return "< 1 minute ago";
      } else if (elapsed < milliSecondsPerHour) {
        const minutes = Math.round(elapsed / milliSecondsPerMinute);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else if (elapsed < milliSecondsPerDay) {
        const hours = Math.round(elapsed / milliSecondsPerHour);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        const days = Math.round(elapsed / milliSecondsPerDay);
        return `${days} day${days > 1 ? "s" : ""} ago`;
      }
    }
  }

  return (
    <div className="transform ease-in duration-100 bg-white rounded-lg text-left">
      <div className="text-left">
        <div>
          <span className="text-xs opacity-40">
            {getNiceDataString(review?.submittedAt)}
          </span>
          <p className="text-lg font-medium">{review?.userName}</p>
        </div>
        <div className="">
          <p className="text-md">{review?.text}</p>
        </div>
      </div>
    </div>
  );
}
