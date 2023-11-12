import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";

export default function GPTCard({ property, i }) {
  const url = window.location.href;
  const gpt_page = url.split("/")[url.split("/").length - 2] == "gpts";

  return (
    <>
      <div className="md:block hidden transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border py-3 px-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl font-medium text-gray-900 leading-none">
                {gpt_page
                  ? `${property.title}`
                  : `#${i + 1}: ${property.title}`}
              </p>
              <p className="text-lg pt-1">Description</p>

              <p className="text-sm pb-2">
                Created by: creator. Posted 13 minutes ago. X comments.
              </p>
              <span className="cursor-pointer text-xs font-medium px-3 py-1 rounded-lg  border-2 bg-gray-100 text-gray-900">
                ⏰ Productivity
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            {gpt_page ? (
              <a
                className="cursor-pointer px-5 py-2 border-2  hover:border-orange-400 font-medium rounded-md  text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
                href="https://www.example.com"
                target="blank"
              >
                Chat with GPT
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="ml-2"
                />
              </a>
            ) : (
              <Link
                to={`/gpts/${property.url}`}
                className="cursor-pointer px-5 py-2 border-2  hover:border-orange-400 font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
              >
                Visit
              </Link>
            )}

            <UpvoteButton />
          </div>
        </div>
      </div>

      <div className="md:hidden block transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border p-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-lg font-medium text-gray-900 leading-none">
                #{i + 1}: {property.title}
              </p>
              <p className="text-md pt-1 pb-1">Tagline</p>

              <p className="text-sm pb-2">
                Created by: creator name. Posted 13 minutes ago.
              </p>

              <span className="cursor-pointer text-xs font-medium px-3 py-1 mt-2 rounded-lg  border-2 bg-gray-100 text-gray-900">
                ⏰ Productivity
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Link
            to={`/gpts/${property.url}`}
            className="cursor-pointer px-3 py-1.5 border-2  hover:border-orange-400 font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
          >
            Visit
          </Link>

          <UpvoteButton />
        </div>
      </div>
    </>
  );
}
