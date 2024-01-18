import React from "react";
import { Link } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";
import { getNiceDataString } from "../utils/strings";
import { CATEGORY_INFO } from "../utils/categories";

export default function GPTCard({ gpt, i }) {
  const category_info = CATEGORY_INFO;
  const gpt_category_index = category_info.findIndex(
    (c) => c.title === gpt?.data?.category
  );

  return (
    <>
      <Link to={`/gpts/${gpt?.id}`}>
        <div className="md:block hidden transform ease-in w-full hover:bg-mediumBrown  rounded-md py-1 text-left">
          <div className="flex items-center text-left gap-4 w-full px-4 py-2 justify-between">
            <div className=" items-center w-5/6">
              <p className="text-xl font-semibold text-gray-900 leading-none truncate">
                {gpt?.data?.title}
              </p>
              <p className="text-lg w-full opacity-50 truncate">
                {gpt?.data?.description}
              </p>

              <div className="flex gap-2 text-sm">
                <p>
                  Posted by {gpt?.data?.creator}{" "}
                  {getNiceDataString(gpt?.data?.submittedAt)}.
                </p>
                <p>
                  {gpt?.data?.comments.length}{" "}
                  {gpt?.data?.comments.length === 1 ? " comment" : "comments"}.
                </p>
              </div>
            </div>

            <UpvoteButton g={gpt} />
          </div>
        </div>
      </Link>

      <div className="md:hidden block transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border p-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4 w-5/6">
            <div className="w-full">
              <p className="text-xl font-semibold text-gray-900 leading-none truncate">
                {gpt?.data?.title}
              </p>
              <p className="text-lg w-full truncate opacity-50">
                {gpt?.data?.description}
              </p>

              <div className="flex gap-2 text-sm">
                <p>
                  Posted by {gpt?.data?.creator}{" "}
                  {getNiceDataString(gpt?.data?.submittedAt)}.
                </p>
                <p>
                  {gpt?.data?.comments.length}{" "}
                  {gpt?.data?.comments.length === 1 ? " comment" : "comments"}.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Link
            to={`/gpts/${gpt?.id}`}
            className="cursor-pointer px-8 pt-4  border hover:border-orange-400 font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
          >
            Visit
          </Link>

          <UpvoteButton g={gpt} />
        </div>
      </div>
    </>
  );
}
