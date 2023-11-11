import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import StarRatings from "react-star-ratings";

export default function ReviewForm({ property }) {
  const form = useRef();
  const [currentRating, setCurrentRating] = useState(0);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const sendEmail = (e) => {
    // e.preventDefault();
    // emailjs
    //   .sendForm(
    //     "X", ### add your service ID
    //     "Y", ### add template ID
    //     form.current,
    //     "Z" ### add your ID
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       if (result.text === "OK") {
    //         setSuccessfulSubmission(true);
    //       }
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };

  function changeRating(newRating) {
    setCurrentRating(newRating);
  }

  return (
    <div className="transform ease-in duration-100 w-full bg-white rounded-2xl p-4 text-left">
      <div className="text-left">
        {successfulSubmission ? (
          <div className="text-center py-12 px-5">
            <h1 className="text-3xl font-semibold text-gray-900 leading-none mb-3">
              Tack!
            </h1>
            <p>
              Innan vi laddar upp din review så kommer den att granskas. Kom
              tillbaka snart!
            </p>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-semibold text-gray-900 leading-none mb-6">
              Betygsätt {property.title}
            </p>

            <form ref={form} onSubmit={sendEmail}>
              <label
                class="mt-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Betyg
              </label>

              <StarRatings
                rating={currentRating}
                starRatedColor="#FACC13"
                starHoverColor="#FACC13"
                changeRating={changeRating}
                starDimension="40px"
                starSpacing="5px"
                numberOfStars={5}
                name="rating"
              />

              <input
                type="text"
                name="rating"
                value={currentRating}
                className="hidden"
              />

              <input
                type="text"
                name="rental"
                value={property.url}
                className="hidden"
              />

              <div>
                <label
                  class="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  for="grid-state"
                >
                  Recension
                </label>

                <textarea
                  className="bg-gray-200  mt-2 mb-4 appearance-none  border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white border-2 focus:border-green"
                  rows="4"
                  placeholder="Skriv en recension om ditt studentboende"
                  name="review"
                />
              </div>

              <div class="w-full mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Typ av bostad
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-green"
                    name="type"
                  >
                    <option>Korridorsrum</option>
                    <option>1 rum</option>
                    <option>2 rum</option>
                    <option>3 rum</option>
                    <option>4 rum</option>
                    <option>Annat</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <label
                  class="mt-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Namn (valfritt)
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                  type="textbox"
                  placeholder="Förnamn"
                  name="name"
                />
              </div>

              <input
                type="submit"
                value="Ladda upp"
                className="cursor-pointer mt-6 px-5 py-2 border border-transparent font-medium rounded-md text-white bg-green text-lg transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
