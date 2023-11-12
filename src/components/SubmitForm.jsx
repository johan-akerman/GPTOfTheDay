import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function SubmitForm() {
  const categories = [
    "-",
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

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [email, setEmail] = useState("");

  const [missingInfo, setMissingInfo] = useState(false);

  function handleSubmit() {
    if (url.length == 0 || category == "-" || email.length == 0) {
      setMissingInfo(true);
    } else {
      let obj = {
        url: url,
        title: title,
        description: description,
        category: category,
        creator: creator,
        email: email,
      };

      console.log(obj);

      setUrl("");
      setTitle("");
      setDescription("");
      setCreator("");
      setCategory(categories[0]);
      setEmail("");
      setMissingInfo(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold mb-8">
          Submit your GPT
        </h1>

        <div className="flex flex-col gap-2 mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            GPT URL
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
            Title
          </label>

          <input
            className="py-2 pl-2 pr-4 rounded-lg  focus:outline-none bg-gray-100 grow border-2"
            placeholder="Title goes here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
            Description
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
            Name of creator
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
            <p className="text-center text-red-400 text-sm">
              Something is missing! Please fill in all fields above
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
      </div>
      <p className="text-black text-xs opacity-70 pt-4 text-center">
        We will review your GPT before publishing it to avoid spam.
      </p>
    </div>
  );
}
