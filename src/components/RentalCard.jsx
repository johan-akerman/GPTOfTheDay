import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function GPTCard({ property, i }) {
  return (
    <div>
      <div className="transform ease-in w-full border-b py-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center">
            <h1 className="mr-3 text-2xl font-semibold">#{i + 1}</h1>
            <img
              className="w-20 h-20 rounded-md mr-4 bg-cover"
              src={property.thumbnail}
              alt="Preview"
            />
            <div>
              <p className="text-xl font-medium text-gray-900 leading-none">
                {property.title}
              </p>
              <p className="text-md pt-1 pb-1">Tagline</p>

              <span className="cursor-pointer text-xs font-medium px-3 py-1 rounded-lg  border-2 bg-gray-100 text-gray-900">
                ⏰ Productivity
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to={`/lund/${property.url}`}
              className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
            >
              Visit
            </Link>

            <div className="cursor-pointer px-5 py-2 border-2  hover:border-green font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group">
              <FontAwesomeIcon
                icon={faArrowUp}
                className="mr-1.5 group-hover:animate-bounce transform ease-in-out group-hover:text-green"
              />{" "}
              531
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
