import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faLock } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { logOut, signInWithGoogle } from "../authentication";
import { Link } from "react-router-dom";
import { useAuthState } from "../firebase";

export default function UpvoteButton({ upvote_count, upvotes }) {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthState();

  function closeModal() {
    setIsOpen(false);
  }

  function handleUpvote() {
    if (user) {
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <button
        className="cursor-pointer px-5 py-2 border-2  hover:border-orange-400 hover:bg-orange-400 hover:text-white font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
        onClick={() => handleUpvote()}
      >
        <FontAwesomeIcon
          icon={faArrowUp}
          className="mr-1.5 group-hover:animate-bounce transform ease-in-out"
        />{" "}
        {upvote_count}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-70"
            leave="ease-in duration-200"
            leaveFrom="opacity-70"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-10 align-middle shadow-xl transition-all text-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-5xl mb-4 opacity-10"
                  />
                  <h1 className="text-3xl mb-4 font-semibold">
                    Sign up to vote!
                  </h1>
                  <p className="mb-6 text-lg">
                    Join our community of people who wants to discover, share
                    and discuss the latest GPTs.{" "}
                  </p>
                  <div className="flex gap-3 mx-auto justify-center">
                    <button
                      onClick={() => signInWithGoogle()}
                      className="md:flex hidden gap-2 text-center justify-center transition duration-150 cursor-pointer text-lg  rounded-lg  bg-darkGray text-mediumBrown font-semibold px-6 py-2"
                    >
                      <img
                        className="w-6 h-6"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google logo"
                      />
                      <span>Log in with Google</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
