import React from "react";

export default function Comment({ review }) {
  console.log(review);

  return (
    <div className="transform ease-in duration-100 bg-white rounded-lg text-left">
      <div className="text-left">
        <div>
          <span className="text-xs opacity-40">{review?.comment_time}</span>
          <p className="text-lg font-medium">{review?.user}</p>
        </div>
        <div className="">
          <p className="text-md">{review?.text}</p>
        </div>
      </div>
    </div>
  );
}
