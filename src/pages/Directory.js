import React, { useState } from "react";
import GPTCard from "../components/GPTCard";
import { useEffect } from "react";
import SelectSort from "../components/SelectSort";
import { getGptsWithFilter, getMoreGpts } from "../firestore";
import { analyticsLogChangedCategory, analyticsLogSelectedLoadMore } from "../ganalytics";
import { CATEGORY_INFO } from "../utils/categories";
export default function Directory() {
  const [gpts, setGpts] = useState();

  const [categories, setCategories] = useState(CATEGORY_INFO);

  const [currentPage, setCurrentPage] = useState(0);
  function handleLoadMore() {
    analyticsLogSelectedLoadMore("Directory");
    setCurrentPage((old) => old + 1);
  }

  const [currentSort, setCurrentSort] = useState({
    name: "Most upvotes",
    value: "upvote_count",
    order: "desc",
  });
  const [currentCategory, setCurrentCategory] = useState("All");

  function handleCategoryUpdate(id) {
    let updatedCategories = [...categories];
    const oldCategoryIndex = updatedCategories.findIndex(
      (c) => c.selected === true
    );
    updatedCategories[oldCategoryIndex].selected = false;
    updatedCategories[id].selected = true;
    analyticsLogChangedCategory(categories[id].title)
    setCurrentCategory((old) => categories[id].title);
  }

  // Retrives more gpts and appends them to current gpts
  useEffect(() => {
    if (currentPage) {
      getMoreGpts(currentPage).then((res) => setGpts((old) => old.concat(res)));
    }
  }, [currentPage]);

  // Retrieves the gpts for the current filters
  useEffect(() => {
    if (currentCategory === "All") {
      getGptsWithFilter(
        null,
        null,
        null,
        currentSort.value,
        currentSort.order,
        5
      ).then((res) => setGpts(res));
    } else {
      getGptsWithFilter(
        "category",
        "==",
        currentCategory,
        currentSort.value,
        currentSort.order,
        5
      ).then((res) => {
        setGpts(res);
      });
    }
  }, [currentCategory, currentSort]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <SelectSort setCurrentSort={setCurrentSort} />
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
              {gpts ? (
                gpts.map((gpt, i) => <GPTCard i={i} gpt={gpt} />)
              ) : (
                <p>No results found...</p>
              )}

              {gpts?.length % 5 === 0 ? (
                <button
                  onClick={() => handleLoadMore()}
                  className="cursor-pointer px-5 py-2 font-medium rounded-md text-white bg-orange-400 text-lg transform ease-in duration-100 group w-40 mt-6 mx-auto"
                >
                  Load more
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
