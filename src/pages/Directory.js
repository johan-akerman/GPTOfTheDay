import React, { useState } from "react";
import { Jumbotron } from "../components/Jumbotron";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import RentalCard from "../components/RentalCard";
import { InfoBar } from "../components/InfoBar";
import lundData from "../data/lund.json";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SelectCategory from "../components/SelectCategory";

export default function Directory() {
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
  ]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFilterChange = (selected) => {
    setSelectedOptions(selected);
  };
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(categories[0]);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    let tmp = lundData;
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
      <InfoBar />
      <Navbar />

      <div className="bg-white">
        <div className="w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12">
          <div className="grid grid-cols-12 gap-20">
            <div className="col-span-4">
              <div class="w-full relative mx-auto text-gray-600 bg-grayish border-2 border-gray-300 px-5 text-lg py-2 rounded-lg flex items-center">
                <FontAwesomeIcon icon={faSearch} className="" />
                <input
                  class="h-10 pl-2 pr-4 rounded-lg  focus:outline-none bg-transparent grow"
                  name="search"
                  placeholder="Search for GPTs"
                />
              </div>

              <h1>Sort by</h1>
              <SelectCategory />
              <h1>Categories</h1>
              <div className="flex flex-wrap gap-x-1 gap-y-2 mt-4">
                {categories.map((c) => {
                  return (
                    <span
                      className={`cursor-pointer text-sm font-medium me-2 px-3 py-2 rounded-lg  border-2 ${
                        c.selected
                          ? "bg-green text-white border-green"
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

            <div className="col-span-8">
              <div className="w-full">
                {data.slice(0, 15).map((property, i) => {
                  return <RentalCard property={property} i={i} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
