import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";

export default function GPTCard({ gpt, i }) {
  const url = window.location.href;
  const gpt_page = url.split("/")[url.split("/").length - 2] == "gpts";
  console.log(gpt_page);
  const category_info = [
    { id: 0, title: "All", icon: "🌐", selected: true },
    { id: 1, title: "Productivity", icon: "⏰", selected: false },
    { id: 2, title: "DALL-E", icon: "🎨", selected: false },
    { id: 3, title: "Writing", icon: "✏️", selected: false },
    { id: 4, title: "Programming", icon: "💻", selected: false },
    { id: 5, title: "Data Analysis", icon: "📊", selected: false },
    { id: 6, title: "Education", icon: "📚", selected: false },
    { id: 7, title: "Lifestyle", icon: "🌴", selected: false },
    { id: 8, title: "Just for Fun", icon: "😄", selected: false },
    { id: 9, title: "Miscellaneous", icon: "📦", selected: false },
  ];
  const gpt_category_index = category_info.findIndex(
    (c) => c.title === gpt?.data?.category
  );

  return (
    <>
      <div className="md:block hidden transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border py-3 px-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl font-medium text-gray-900 leading-none">
                {gpt_page
                  ? `${gpt?.data?.title}`
                  : `#${i + 1}: ${gpt?.data?.title}`}
              </p>
              <p className="text-lg pt-1">{gpt?.data?.description}</p>

              <div className="flex md:gap-4 gap-2 text-sm">
                <p>By: {gpt?.data?.creator}</p>

                <p>Posted {gpt?.data?.submittedAt}</p>
                <p>
                  {gpt?.data?.comments.length}{" "}
                  {gpt?.data?.comments.length === 1 ? " comment" : "comments"}
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

          <div className="flex gap-4">
            {gpt_page ? (
              <a
                className="cursor-pointer px-5 py-2 border-2  hover:border-orange-400 font-medium rounded-md  text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
                href={gpt?.data?.url}
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
                to={`/gpts/${gpt?.id}`}
                className="cursor-pointer px-5 py-2 border-2  hover:border-orange-400 font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
              >
                Visit
              </Link>
            )}

            <UpvoteButton g={gpt} />
          </div>
        </div>
      </div>

      <div className="md:hidden block transform ease-in w-full bg-white bg-opacity-50 hover:bg-opacity-100 rounded-md border p-4 text-left">
        <div className="flex items-center text-left justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-medium text-gray-900 leading-none">
                {gpt_page
                  ? `${gpt?.data?.title}`
                  : `#${i + 1}: ${gpt?.data?.title}`}
              </p>
              <p className="text-lg pt-1 pb-1">{gpt?.data?.description}</p>

              <div className="flex text-xs mb-2 gap-2">
                <p>By: {gpt?.data?.creator}</p>
                <p>Posted {gpt?.data?.publishedAt}</p>
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
