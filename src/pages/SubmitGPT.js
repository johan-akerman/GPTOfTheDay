import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga";

export default function New() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);

    window.scrollTo(0, 0);
  }, []);

  const form = useRef();
  const [currentRating, setCurrentRating] = useState(0);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bjq999o",
        "template_fjilcdu",
        form.current,
        "ImJf0U-BesTuKCwaz"
      )
      .then(
        (result) => {
          console.log(result.text);
          if (result.text === "OK") {
            setSuccessfulSubmission(true);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function changeRating(newRating) {
    setCurrentRating(newRating);
  }

  return (
    <>
      <Navbar />
      <div className="bg-grayish">
        <div className="md:w-5/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:mb-0 mb-6">
            <Link to="/" className="text-xl mr-4 font-medium">
              <FontAwesomeIcon icon={faChevronLeft} /> Go back
            </Link>
          </div>
          <div className="col-span-12">
            <div className="transform ease-in duration-100 w-full bg-white rounded-2xl p-4 text-left">
              <div className="text-left">
                {successfulSubmission ? (
                  <div className="text-center py-12 px-5">
                    <h1 className="text-3xl font-semibold text-gray-900 leading-none mb-3">
                      Tack!
                    </h1>
                    <p>
                      Innan vi laddar upp din review så kommer den att granskas.
                      Kom tillbaka snart!
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 leading-none ">
                      Submit your GPT
                    </p>
                    <p className="text-lg mb-6 mt-2">
                      Before publishing your GPT we'll review it to avoid spam.{" "}
                    </p>

                    <form ref={form} onSubmit={sendEmail}>
                      <div className="mt-3">
                        <label
                          class="mt-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          Name of your GPT
                        </label>
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                          type="textbox"
                          placeholder="Fastighetsnamn, bostadsområde etc"
                          name="rental"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          class="mt-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          GPT URL
                        </label>
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                          type="textbox"
                          placeholder="Lund"
                          name="city"
                        />
                      </div>

                      <div>
                        <label
                          class="mt-5 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                          for="grid-state"
                        >
                          Description (max X characters)
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
                          Category
                        </label>
                        <div class="relative">
                          <select
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-green"
                            name="type"
                          >
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
                          Your email
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
                        value="Submit"
                        className="cursor-pointer mt-6 px-5 py-2 border border-transparent font-medium rounded-md text-white bg-green text-lg transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg"
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
