import { Fragment } from "react";
import { getAuth, signOut } from "@firebase/auth";
import { Menu, Transition } from "@headlessui/react";
import { logOut } from "../authentication";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const { user } = useAuthState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
    logOut();
  };

  return (
    <div className="text-right ">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="flex relative">
            {user?.photoURL ? (
              <img
                className="h-10 w-10 rounded-full"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-secondary">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white absolute bottom-3 left-3"
                />
              </div>
            )}

            <FontAwesomeIcon
              icon={faCaretDown}
              className="ml-1 bottom-0 mt-5"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-8 z-50 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-3 py-3">
              <Menu.Item>
                <button
                  className="flex items-center text-left p-2 w-full transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
