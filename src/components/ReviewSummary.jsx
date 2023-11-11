import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";

export default function ReviewSummary({ property }) {
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
  const [sumScore, setSumScore] = useState(0);

  useEffect(() => {
    let tmp = [0, 0, 0, 0, 0];
    let count = 0;
    if (property) {
      property.reviews.map((review) => {
        let index = review.rating - 1;
        tmp[index] = tmp[index] + 1;
      });
    }

    for (let i = 0; i < 5; i++) {
      count += tmp[i] * (i + 1);
      console.log("count", count);
    }

    setScores(tmp);
    setTotalNumberOfReviews(property.reviews.length);
    setSumScore(count);
  }, [property]);

  return (
    <div className="transform ease-in duration-100 w-full bg-white rounded-2xl p-4 text-left">
      <div className="text-left">
        <div>
          <p className="text-2xl font-semibold text-gray-900 leading-none mb-6">
            Sammanfattning
          </p>

          <h1 class="mt-3 block uppercase tracking-wide text-gray-800 text-5xl text-center font-bold mb-2">
            {sumScore / totalNumberOfReviews || 0} / 5
          </h1>

          <p className="text-center text-gray-400 mt-2">
            {totalNumberOfReviews} recensioner
          </p>
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <div className="flex justify-between">
              <h1 class="block uppercase tracking-wide text-gray-700 text-xl text-center font-bold mb-2">
                5
              </h1>
              <FontAwesomeIcon
                icon={faStar}
                className="text-md ml-2 mt-1.5 text-yellow-400"
              />{" "}
            </div>
            <ProgressBar value={(scores[4] / totalNumberOfReviews) * 100} />
            <p className="text-gray-400">({scores[4]})</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <div className="flex justify-between">
              <h1 class="block uppercase tracking-wide text-gray-700 text-xl text-center font-bold mb-2">
                4
              </h1>
              <FontAwesomeIcon
                icon={faStar}
                className="text-md ml-2 mt-1.5 text-yellow-400"
              />{" "}
            </div>
            <ProgressBar value={(scores[3] / totalNumberOfReviews) * 100} />
            <p className="text-gray-400">({scores[3]})</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <div className="flex justify-between">
              <h1 class="block uppercase tracking-wide text-gray-700 text-xl text-center font-bold mb-2">
                3
              </h1>
              <FontAwesomeIcon
                icon={faStar}
                className="text-md ml-2 mt-1.5 text-yellow-400"
              />{" "}
            </div>
            <ProgressBar value={(scores[2] / totalNumberOfReviews) * 100} />
            <p className="text-gray-400">({scores[2]})</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <div className="flex justify-between">
              <h1 class="block uppercase tracking-wide text-gray-700 text-xl text-center font-bold mb-2">
                2
              </h1>
              <FontAwesomeIcon
                icon={faStar}
                className="text-md ml-2 mt-1.5 text-yellow-400"
              />{" "}
            </div>
            <ProgressBar value={(scores[1] / totalNumberOfReviews) * 100} />
            <p className="text-gray-400">({scores[1]})</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-3">
            <div className="flex justify-between">
              <h1 class="block uppercase tracking-wide text-gray-700 text-xl text-center font-bold mb-2">
                1
              </h1>
              <FontAwesomeIcon
                icon={faStar}
                className="text-md ml-2.5 mt-1.5 text-yellow-400"
              />{" "}
            </div>
            <ProgressBar value={(scores[0] / totalNumberOfReviews) * 100} />
            <p className="text-gray-400">({scores[0]})</p>
          </div>
        </div>
      </div>
    </div>
  );
}
