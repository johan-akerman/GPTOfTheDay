import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { getCurrentUser, logOut, signInUserGoogle } from "../firebase";

export default function MobileMenu({ user, setUser }) {
  const buttonRef = useRef();

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <div className="lg:hidden block">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              className="lg:hidden block text-white group md:py-2 py-1 rounded-md  items-center  text-lg font-semibold hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <FontAwesomeIcon
                className="text-3xl text-white"
                icon={open ? faTimes : faBars}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="lg:hidden block absolute -left-24  z-10 w-60  max-w-sm mt-2 transform -translate-x-1/2  sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-2xl">
                  <div className="relative bg-white p-3">
                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/leaderboard"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Leaderboard
                    </Link>

                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/directory"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Browse all GPTs
                    </Link>

                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/submit"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Submit GPT
                    </Link>

                    {user ? (
                      <button
                        onClick={() => handleLogOut}
                        className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                      >
                        Log out
                      </button>
                    ) : (
                      <>
                        <Link
                          onClick={() => buttonRef.current?.click()}
                          to="/log-in"
                          className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                        >
                          Log in
                        </Link>

                        <Link
                          onClick={() => buttonRef.current?.click()}
                          to="/sign-up"
                          className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
