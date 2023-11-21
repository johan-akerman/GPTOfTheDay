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
        <div className="md:block hidden hover:border-darkBrown transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border py-3 px-4 text-left">
          <div className="flex items-center text-left justify-between ">
            <div className="flex items-center gap-4 w-4/6 ">
              <div className="w-full">
                <p className="text-xl font-semibold text-gray-900 leading-none truncate">
                  {gpt?.data?.title}
                </p>
                <p className="text-lg pt-1 w-full truncate">
                  {gpt?.data?.description}
                </p>

                <div className="flex gap-2 text-sm">
                  <p>
                    Posted {getNiceDataString(gpt?.data?.submittedAt)} by{" "}
                    {gpt?.data?.creator}.
                  </p>
                  <p>
                    {gpt?.data?.comments.length}{" "}
                    {gpt?.data?.comments.length === 1 ? " comment" : "comments"}
                    .
                  </p>
                </div>
                <p className="text-sm pb-2"> </p>
                <span className="cursor-pointer text-xs font-medium px-3 py-1 rounded-lg  border-2 bg-gray-100 text-gray-900">
                  {category_info[gpt_category_index].icon +
                    " " +
                    category_info[gpt_category_index].title}
                </span>
              </div>
            </div>

            <div className="flex gap-4 ">
              <UpvoteButton g={gpt} />
            </div>
          </div>
        </div>
      </Link>

      <div className="md:hidden block transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border p-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4 w-5/6">
            <div className="w-full">
              <p className="text-2xl font-semibold text-gray-900 leading-none truncate">
                {gpt?.data?.title}
              </p>
              <p className="text-lg pt-1 truncate">{gpt?.data?.description}</p>

              <div className="flex text-sm mb-2 gap-2">
                <p>
                  Posted {getNiceDataString(gpt?.data?.submittedAt)} by{" "}
                  {gpt?.data?.creator}.
                </p>
              </div>

              <div className="flex text-sm mb-4 gap-2">
                <p>
                  {gpt?.data?.comments.length}{" "}
                  {gpt?.data?.comments.length === 1 ? " comment" : "comments"}
                </p>
              </div>

              <span className="cursor-pointer text-xs font-medium px-3 py-1 mt-2 rounded-lg  border-2 bg-gray-100 text-gray-900">
                {category_info[gpt_category_index].icon +
                  " " +
                  category_info[gpt_category_index].title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Link
            to={`/gpts/${gpt?.id}`}
            className="cursor-pointer px-3 py-1.5 border-2  hover:border-orange-400 font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
          >
            Visit
          </Link>

          <UpvoteButton g={gpt} />
        </div>
      </div>
    </>
  );
}
