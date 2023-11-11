import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function SubmitForm() {
  const categories = [
    "Productivity",
    "DALL-E",
    "Writing",
    "Programming",
    "Data Analysis",
    "Education",
    "Lifestyle",
    "Just for fun",
    "Miscellaneous",
  ];

  const [gpt, setGpt] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [email, setEmail] = useState("");
  const [tagline, setTagline] = useState("");
  const [missingInfo, setMissingInfo] = useState(false);

  function handleSubmit() {
    if (
      gpt.length == 0 ||
      category.length == 0 ||
      email == 0 ||
      tagline.length == 0
    ) {
      setMissingInfo(true);
    } else {
      let obj = {
        gpt: gpt,
        category: category,
        email: email,
        tagline: tagline,
      };

      console.log(obj);

      setGpt("");
      setCategory(categories[0]);
      setEmail("");
      setTagline("");
      setMissingInfo(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl w-96 mx-auto p-6">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold mb-8">
          Submit your GPT!
        </h1>

        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm font-medium text-gray-900">
            Your GPTs URL
          </label>

          <input
            className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow"
            name="url"
            placeholder="Your GPT URL"
            value={gpt}
            onChange={(e) => setGpt(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm font-medium text-gray-900">Category</label>

          <Listbox value={category} onChange={setCategory}>
            <div className="relative mt-1 z-10">
              <Listbox.Button className="relative w-full cursor-default text-left focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow">
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {categories.map((c) => (
                    <Listbox.Option
                      key={c}
                      className={({ active }) =>
                        `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
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
          <label className="text-sm font-medium text-gray-900">
            Your email
          </label>

          <input
            className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm font-medium text-gray-900">Tagline</label>

          <textarea
            rows="3"
            className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow"
            name="tagline"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="h-6">
          {missingInfo ? (
            <p className="text-center text-red-400 text-sm">
              Something is missing! Please fill in all fields above
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          className="cursor-pointer px-5 py-2 border border-transparent font-medium rounded-md text-white bg-green text-lg transform ease-in duration-100"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
      <p className="text-black text-xs opacity-70 pt-4 text-center">
        We will review your GPT before publishing it to avoid spam.
      </p>
    </div>
  );
}
