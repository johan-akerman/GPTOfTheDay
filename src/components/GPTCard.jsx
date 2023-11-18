import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";

export default function GPTCard({ gpt, i }) {
  const url = window.location.href;
  const gpt_page = url.split("/")[url.split("/").length - 2] == "gpts";
  const category_info = [
    { id: 0, title: "All", icon: "🌐", selected: true },
    { id: 1, title: "Productivity", icon: "⏰", selected: false },
    { id: 2, title: "DALL-E", icon: "🎨", selected: false },
    { id: 3, title: "Writing", icon: "✏️", selected: false },
    { id: 4, title: "Programming", icon: "💻", selected: false },
    { id: 5, title: "Data Analysis", icon: "📊", selected: false },
    { id: 6, title: "Education", icon: "📚", selected: false },
    { id: 7, title: "Lifestyle", icon: "🌴", selected: false },
    { id: 8, title: "Just for fun", icon: "😄", selected: false },
    { id: 9, title: "Miscellaneous", icon: "📦", selected: false },
  ];
  const gpt_category_index = category_info.findIndex(
    (c) => c.title === gpt?.data?.category
  );

  function getNiceDataString(date) {
    const dateFromFb = new Date(date.seconds * 1000);

    const currentSfTime = new Date();

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
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-semibold text-gray-900 leading-none">
                {gpt?.data?.title}
              </p>
              <p className="text-lg pt-1 pb-1">{gpt?.data?.description}</p>

              <div className="flex text-sm mb-2 gap-2">
                <p>
                  Posted {getNiceDataString(gpt?.data?.submittedAt)} by{" "}
                  {gpt?.data?.creator}.
                </p>
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
