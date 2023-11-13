import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { addGptRequest } from "../firestore";
import { Link } from "react-router-dom";

export default function SubmitForm() {
  const categories = [
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
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [email, setEmail] = useState("");

  const [missingInfo, setMissingInfo] = useState(false);

  function checkValidEntry() {
    let validURL = url.length > 0 && url.startsWith("https://chat.openai.com");
    let validTitle = title.length > 0;
    let validDescription = 0 < description.length < 100;
    let validCreator = creator.length > 0;
    let validCategory = category.length > 0;
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
      const sfTimeZone = "America/Los_Angeles";
      const sfTime = new Date().toLocaleString("en-US", {
        timeZone: sfTimeZone,
      });

      let obj = {
        url: url,
        title: title,
        description: description,
        category: category,
        creator: creator,
        email: email,
        submittedAt: sfTime,
      };

      addGptRequest(obj);
      console.log("Added gpt to db:", obj);

      setUrl("");
      setTitle("");
      setDescription("");
      setCreator("");
      setCategory(categories[0]);
      setEmail("");
      setMissingInfo(false);
      setSuccessfulSubmit(true);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <div className="flex flex-col">
        {!successfulSubmit ? (
          <>
            {" "}
            <h1 className="text-3xl text-center font-semibold mb-8">
              Submit your GPT for free!
            </h1>
            <div className="flex flex-col gap-2 mb-5">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
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
            <div className="flex flex-col gap-2 mb-5">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                GPT URL
              </label>

              <label class="block tracking-wide text-gray-400 text-xs font-bold">
                Must include https://chat.openai.com
              </label>

              <input
                className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                placeholder="GPT URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Description
              </label>

              <label class="block tracking-wide text-gray-400 text-xs font-bold">
                Must be less than 100 charachters
              </label>

              <input
                className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                placeholder="Description goes here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3">
                Category
              </label>

              <Listbox value={category} onChange={setCategory}>
                <div className="relative mt-1 z-10">
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
            <div className="flex flex-col gap-2 mb-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3">
                Name of GPT creator
              </label>

              <input
                className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
                placeholder="Name of creator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3">
                Your Email
              </label>
              <label class="block tracking-wide text-gray-400 text-xs font-bold">
                Will not be publicly visible
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
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl mb-4 opacity-70 text-green"
            />
            <h1 className="text-3xl font-semibold mb-3">Thank you!</h1>
            <span>You submission was successful.</span>
            <div className="flex gap-3 mx-auto justify-center mt-4">
              <button
                onClick={() => setSuccessfulSubmit(false)}
                className="md:flex hidden gap-2 text-center justify-center transition duration-150 cursor-pointer text-lg  rounded-lg  bg-darkGray text-mediumBrown font-semibold px-6 py-2"
              >
                <span>Submit another GPT</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
