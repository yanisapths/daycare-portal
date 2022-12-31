import React, { useState, Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/dist/client/router";
import { signIn, signOut, useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar"

function Header({ placeholder }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <header
        className="sticky t-0 font-noto justify-between flex 
      flex-wrap  w-full bg-[#FFEAB2] shadow-lg" 
      >
        {/*Left */}
        <div className="flex gap-3 m-3 pt-1items-center ">
          <div>
            <SideBar  />
          </div>
          <div>
            <h1
              onClick={() => router.push("/")}
              className="cursor-pointer sticky my-auto text-[#6C5137] text-xl font-bold"
            >
              Physiotherapy Clinic Portal
            </h1>
          </div>
        </div>
        <div className="pr-3 pt-1 m-1">
          <Menu as="div" className=" inline-block text-left">
            <div>
              <Menu.Button className="flex border-[#6C5137] border-opacity-70 border-2 p-1 rounded-full">
                {/* className="flex border-[#6C5137] border-2 w-8 h-8 rounded-full" */}
                {/*Profile Picture */}
                {!session && (
                  <>
                    <Image
                      className="rounded-full cursor-pointer"
                      src="/Avatar.png"
                      alt="/Avatar.png"
                      width="30"
                      height="30"
                      layout="fixed"
                    />
                  </>
                )}
                {session && (
                  <>
                    {session.user.image && (
                      <Image
                        alt="/userLoginImage.png"
                        className="rounded-full cursor-pointer"
                        src={session.user.image}
                        layout="fixed"
                        width="30"
                        height="30"
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
              <Menu.Items className="absolute font-noto right-0 w-56  mt-2 origin-top-right bg-white divide-y divide-[gray]-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {!session && (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={signIn}
                            className={`${
                              active
                                ? "bg-[#A17851] bg-opacity-90 text-white"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-4 py-2 text-sm  md:text-lg`}
                          >
                            เข้าสู่ระบบ | ลงทะเบียน
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
                              active
                                ? "bg-[#A17851] bg-opacity-90 text-white "
                                : "text-gray-900 font-noto align-text-center"
                            } group flex  rounded-md items-center w-full px-4 py-2 text-sm md:text-lg`}
                          >
                            ออกจากระบบ
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
    </>
  );
}

export default Header;
