import React, { useState, Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/dist/client/router";
import { signIn, signOut, useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Dropdown } from "react-multi-select-component";
function Header({ placeholder }) {

  const { data: session } = useSession();
  const router = useRouter();
  


  return (
    <>
      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <header
          className="sticky t-0 justify-between item-center flex
      flex-wrap  w-full bg-[#FFFBF2] sm:h-12 sm:landscape:h-12 sm:landscape:items-center tablet:h-16 tablet:items-center 
       "
        >
          {" "}
          {/* Left */}
          <div>
            <div className="sm:landscape:pt-0">
              <SideBar />
            </div>
          </div>
          
          {/* Middle */}
          <div>
            <div>
              <h1
                onClick={() => router.push("/")}
                className="cursor-pointer sticky lg:pt-3 lg:text-2xl  text-[#6C5137] sm:invisible sm:landscape:visible w-30  md:text-xl font-bold
               sm:text-base tablet:text-xl "
              >
                Physiotherapy Clinic
              </h1>
            </div>
          </div>
          {/* Right */}
          <div className="pr-3 pt-1 m-1">
            <Menu as="div" className="inline-block text-left ">
              <div className="relative ">
                <Menu.Button className="flex border-[#6C5137] border-opacity-70 border-2 p-1 rounded-full">
                  {/*Profile Picture */}
                  {!session && (
                    <>
                      <Image
                        className="rounded-full cursor-pointer"
                        src="/Avatar.png"
                        alt="/Avatar.png"
                        width="40"
                        height="40"
                        layout="fixed"
                      />
                    </>
                  )}
                  {session && (
                    <>
                      {session.user.image && (
                        <Image
                          alt="/userLoginImage.png"
                          className="rounded-full cursor-pointer tablet:w-50 tablet:h-50
                        "
                          src={session.user.image}
                          layout="fixed"
                          width="35"
                          height="35"
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
                <Menu.Items
                  className="absolute font-noto right-0 w-56  mt-2 origin-top-right bg-white divide-y divide-[gray]-100
               rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none smartphone:w-32 
               "
                >
                  <div className="px-1 py-1  ">
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
                              } group flex rounded-md items-center w-full px-4 py-2 text-sm 
                            md:text-lg`}
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
                              } group flex  rounded-md items-center w-full px-4 py-2 text-sm 
                            md:text-lg`}
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
        <NavBar />
      </div>
    </>
  );
}

export default Header;
