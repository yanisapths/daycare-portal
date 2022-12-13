import React, { useState, Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/dist/client/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Drawer from "./Drawer";

function Header({ placeholder }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="font-noto justify-between flex flex-wrap sticky top-0 z-50  shadow-2xl shadow-black/10 p-1 md:px-10 rounded-b-2xl bg-[#FFEAB2]">
      {/* Left */}
      <div className="flex pt-2">
        <div>
          <Drawer />
        </div>
        <div
          onClick={() => router.push("/")}
          className=" cursor-pointer my-auto"
        >
          <h1 className="text-3xl font-bold text-yellow-800">Happy Elders</h1>
        </div>
      </div>
      <div className=" items-end justify-between text-teal-900">
        {/* Right */}
        <Menu as="div" className="relative inline-block text-left">
          <div className="pt-2 right-0 justify-end">
            <Menu.Button className="flex border-2 p-1 rounded-full">
              {/* Profile Pic */}
              {!session && (
                <>
                  <Image
                    className="rounded-full cursor-pointer"
                    src="/Avatar.png"
                    alt="/Avatar.png"
                    width="55"
                    height="55"
                    layout="fixed"
                  />
                </>
              )}
              {session && (
                <>
                  {session.user.image && (
                    <Image
                      alt="/Avatar.png"
                      className="rounded-full cursor-pointer"
                      src={session.user.image}
                      layout="fixed"
                      width="55"
                      height="55"
                    />
                  )}
                </>
              )}
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {!session && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signIn}
                          className={`${
                            active ? "bg-teal-500 text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm  md:text-lg`}
                        >
                          Sign In | Register
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
                {session && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signOut}
                          className={`${
                            active ? "bg-teal-500 text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm md:text-lg`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
export default Header;

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}
