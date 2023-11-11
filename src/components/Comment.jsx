import React from "react";

export default function Comment({ review }) {
  return (
    <div className="transform ease-in duration-100 bg-white rounded-lg text-left">
      <div className="text-left">
        <div>
          <span className="text-xs opacity-40">{review.date}</span>
          <p className="text-lg font-medium">{review.name}</p>
        </div>
        <div className="">
          <p className="text-md">{review.review}</p>
        </div>
      </div>
    </div>
  );
}
