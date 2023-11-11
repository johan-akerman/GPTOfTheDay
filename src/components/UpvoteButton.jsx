import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faLock } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function UpvoteButton() {
  let [isOpen, setIsOpen] = useState(false);
  let [signedIn, setSignedIn] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function handleUpvote() {
    if (signedIn) {
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <button
        className="cursor-pointer px-5 py-2 border-2  hover:border-green hover:bg-green hover:text-white font-medium rounded-md text-gray-900 bg-gray-100 text-lg transform ease-in duration-100 group"
        onClick={() => handleUpvote()}
      >
        <FontAwesomeIcon
          icon={faArrowUp}
          className="mr-1.5 group-hover:animate-bounce transform ease-in-out"
        />{" "}
        531
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
                    <Link
                      to="/log-in"
                      className="cursor-pointer px-5 py-1.5  font-medium rounded-md text-gray-900 border-2 bg-transparent border-gray-900 text-lg transform ease-in duration-100 hover:bg-gray-900 hover:text-white "
                    >
                      Log in
                    </Link>
                    <Link
                      to="/sign-up"
                      className="cursor-pointer px-5 py-1.5 border-2 border-transparent font-medium rounded-md text-white bg-green text-lg transform ease-in duration-100 hover:bg-opacity-80 "
                    >
                      Sign up
                    </Link>
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
