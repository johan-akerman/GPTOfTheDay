import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewCard({ review }) {
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

        <div className="flex">
          {review.photos.map((photo) => {
            return (
              <img
                className="w-32 h-32 rounded-2xl mr-4 bg-cover"
                src={photo}
                alt="Preview"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
