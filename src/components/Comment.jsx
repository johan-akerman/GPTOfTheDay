import React from "react";
import { getNiceDataString } from "../utils/strings";

export default function Comment({ review }) {
  function getNiceCommentString(date) {
    return date === "Just now" ? "Just now" : getNiceDataString(date);
  }

  return (
    <div className="transform ease-in duration-100 bg-white rounded-lg text-left">
      <div className="text-left">
        <div>
          <span className="text-xs opacity-40">
            {getNiceCommentString(review?.submittedAt)}
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
