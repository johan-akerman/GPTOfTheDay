import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import GPTCard from "../components/GPTCard";
import gptData from "../data/gpts.json";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectCategory from "../components/SelectCategory";
import { getGpt, getGptsWithMostUpvotes } from "../firestore";

export default function Directory() {
  const [gpt, setGpt] = useState();

  const [categories, setCategories] = useState([
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
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  function handleLoadMore(i) {
    setCurrentPage(i + 1);
  }

  const [currentSort, setCurrentSort] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    getGpt("H16mtfbLIlocQ3PJgSk4").then((res) => setGpt(res));
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    let tmp = gptData;
    tmp.sort(function (a, b) {
      // Sort by average rating.
      if (a.averageRating > b.averageRating) return -1;
      if (a.averageRating < b.averageRating) return 1;

      // If the votes number is the same between both items, sort alphabetically
      if (a.reviews.length < b.reviews.length) return 1;
      if (a.reviews.length > b.reviews.length) return -1;
    });
    setData(tmp);
  }, []);

  function handleCategoryUpdate(id) {
    setCategories(
      categories.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    );
  }

  return (
    <>
      <div className="bg-lightBrown">
        <div className="md:w-9/12 w-11/12 mx-auto h-full pt-20 md:pb-28 pb-12">
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-4 col-span-12">
              <div className="bg-white border rounded-lg p-4">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Sort by
                </label>
                <SelectCategory />
                <label class="mt-6 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-x-1 gap-y-2 mt-4">
                  {categories.map((c) => {
                    return (
                      <span
                        className={`cursor-pointer text-sm font-medium me-2 px-3 py-2 rounded-lg  border-2 ${
                          c.selected
                            ? "bg-orange-400 text-white border-orange-400"
                            : "bg-gray-100 text-gray-900"
                        }`}
                        onClick={() => handleCategoryUpdate(c.id)}
                      >
                        {c.icon} {"  "} {c.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 col-span-12 flex flex-col gap-2">
              {gpt ? <GPTCard i={0} gpt={gpt} /> : ""}

              <button className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-orange-400 text-lg transform ease-in duration-100 group w-40 mt-6 mx-auto">
                Load more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
