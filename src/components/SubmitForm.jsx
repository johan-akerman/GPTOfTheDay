import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { addGptRequest, submitGpt } from "../firestore";
import { Link } from "react-router-dom";
import { getSfMostRecentMidnight, getSfTime } from "../utils/times";

export default function SubmitForm() {
  const categories = [
    "Select...",
    "Miscellaneous",
    "Productivity",
    "DALL-E",
    "Writing",
    "Programming",
    "Data Analysis",
    "Education",
    "Lifestyle",
    "Just for fun",
  ];

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docRef, setDocRef] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [email, setEmail] = useState("");

  const [missingInfo, setMissingInfo] = useState(false);

  function checkValidEntry() {
    let validURL =
      url.length > 0 &&
      url.toUpperCase().startsWith("https://chat.openai.com".toUpperCase());
    let validTitle = title.length > 0;
    let validDescription = 0 < description.length < 100;
    let validCreator = creator.length > 0;
    let validCategory = category.length > 0 && category != "Select...";
    let validEmail = email.length > 0;

    return (
      validURL &&
      validTitle &&
      validDescription &&
      validCreator &&
      validCategory &&
      validEmail
    );
  }

  function handleSubmit() {
    if (!checkValidEntry()) {
      setMissingInfo(true);
    } else {
      const sfTime = getSfTime();

      const mostRecentMidnight = getSfMostRecentMidnight();

      let obj = {
        url: url,
        title: title,
        description: description,
        category: category,
        creator: creator,
        email: email,
        upvotes: [],
        comments: [],
        upvote_count: 0,
        submittedAt: sfTime,
        mostRecentMidnight: mostRecentMidnight,
      };

      submitGpt(obj).then((res) => {
        setDocRef(res.id);
        setSuccessfulSubmit(true);
        setUrl("");
        setTitle("");
        setDescription("");
        setCreator("");
        setCategory(categories[0]);
        setEmail("");
        setMissingInfo(false);
      });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl py-6 px-6">
      <div className="flex flex-col">
        {!successfulSubmit ? (
          <>
            {" "}
            <h1 className="text-4xl text-center font-semibold mb-8">
              Share your GPTs for FREE
            </h1>
            <div className="grid grid-cols-12 gap-3">
              <div className="md:col-span-6 col-span-12 flex flex-col gap-2 mb-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  GPT Title
                </label>

                <input
                  className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                  placeholder="Title goes here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="md:col-span-6 col-span-12 flex flex-col gap-2 mb-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Category
                </label>

                <Listbox value={category} onChange={setCategory}>
                  <div className="relative z-10">
                    <Listbox.Button className="border-2 relative w-full cursor-default text-left focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300  py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow">
                      <span className="block truncate">{category}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none ">
                        {categories.map((c) => (
                          <Listbox.Option
                            key={c}
                            className={({ active }) =>
                              `relative select-none py-2 pl-2 pr-4 cursor-pointer ${
                                active ? "bg-gray-100" : "text-gray-900"
                              }`
                            }
                            value={c}
                          >
                            {({ category }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    category ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {c}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 md:mb-2 mb-0">
              <div className="md:col-span-6 col-span-12 flex flex-col gap-2 ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3">
                  Creator name
                </label>

                <input
                  className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                  placeholder="Name of creator"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="md:col-span-6 col-span-12 flex flex-col gap-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold md:mt-3 mt-1">
                  Email
                </label>

                <input
                  className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-5 mt-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                GPT URL (Must include https://chat.openai.com)
              </label>

              <input
                className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                placeholder="GPT URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 mb-3 mt-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Description ({"<"} 100 characters)
              </label>

              <input
                className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                placeholder="Description goes here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="h-6">
              {missingInfo ? (
                <p className="text-center text-orange-400 text-sm">
                  Something is missing! Please fill in all fields above.
                </p>
              ) : (
                ""
              )}
            </div>
            <button
              className="cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-white bg-orange-400 hover:bg-orange-300 text-lg transform ease-in duration-100"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </>
        ) : (
          <div className="text-center mx-auto">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl mb-4 opacity-70 text-green"
            />
            <h1 className="text-3xl font-semibold mb-3">Thank you!</h1>
            <p className="text-lg mb-1">
              You submission was successful. It is available here:
            </p>

            <Link
              to={`/gpts/${docRef}`}
              className="text-lg underline hover:opacity-70"
            >
              www.gptoftheday/gpts/{docRef}
            </Link>

            <button
              onClick={() => setSuccessfulSubmit(false)}
              className="text-center mt-6 transition duration-150 cursor-pointer text-lg  rounded-lg  bg-darkGray text-mediumBrown font-semibold px-6 py-2"
            >
              <span>Submit another GPT</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
