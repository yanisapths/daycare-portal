import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { HomeIcon } from "@heroicons/react/solid";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { ReactDOM } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [showSidebar, setShowSidebar] = useState(false);
  const sideBar = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    //only add the event listener when sidebar is opend
    if (!showSidebar) return;
    function handleClick(event) {
      if (sideBar.current && !sideBar.current.contains(event.target)) {
        setShowSidebar(false);
        setIsActive(!isActive);
      }
    }
    window.addEventListener("click", handleClick);
    //clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showSidebar]);

  function Icon() {
    return (
      <div onClick={() => setIsActive(!isActive)}>
        {isActive ? <closeIcon /> : <menuIcon />}
      </div>
    );
  }

  return (
    <div>
      {!isActive ? (
        <MenuIcon
          onClick={() => {
            setShowSidebar((x) => !x);
            setIsActive(!isActive);
          }}
          className="cursor-pointer  text-[#6C5137] hover:text-[#AD8259] m-3 xxxl:w-12 xxxl:h-12"
        />
      ) : (
        <CloseIcon
          onClick={() => {
            setIsOpen(!isOpen);
            setIsActive(!isActive);
          }}
          className="m-3 cursor-pointer bg-transparent
           text-[#6C5137] hover:text-[#AD8259 ] xxxl:w-12 xxxl:h-12"
        />
      )}

      {showSidebar && (
        <div
          className="left-0 md:w-40 absolute bg-white
            ease-in-out duration-300 drop-shadow-lg
            sm:h-screen sm:w-3/5 sm:landscape:w-2/5
            lg:h-screen t-0 lg:shadow-2xl lg:w-1/4 
            "
          ref={sideBar}
        >
          <div className="divide-y divide-[#AD8259] lg:px-3 xxxl:px-6">
            <Link href="/">
              <div
                className={
                  'sideBarTabContainer2 ${currentRoute === "/" ? "active":""}'
                }
              >
                <HomeIcon className="sideBarTabIcon2" />
                <h2 className="sideBarTabText2">หน้าหลัก</h2>
              </div>
            </Link>
            {/* Appointment */}
            <Link href="/appointment">
              <div className="sideBarTabContainer2">
                <BookOnlineIcon className="sideBarTabIcon2" />
                <h2 className="sideBarTabText2">นัดหมายดูแล</h2>
              </div>
            </Link>
            {/* Request */}
            <Link href="/request">
              <div className="sideBarTabContainer2">
                <PersonAddIcon className="sideBarTabIcon2" />
                <h2 className="sideBarTabText2">คำขอรับเข้าบริการ</h2>
              </div>
            </Link>
            {/* Appointment */}
            <Link href="/schedule">
              <div className="sideBarTabContainer2">
                <CalendarMonthIcon className=" sideBarTabIcon2" />
                <h2 className="sideBarTabText2">ตารางนัด</h2>
              </div>
            </Link>

            {/* Courses */}
            <Link href="/course">
              <div className="sideBarTabContainer2">
                <BookmarksIcon className=" sideBarTabIcon2" />
                <h2 className="sideBarTabText2">คอร์ส</h2>
              </div>
            </Link>

            {/* Employees */}
            <Link href="/staff">
              <div className="sideBarTabContainer2">
                <PeopleIcon className=" sideBarTabIcon2" />
                <h2 className="sideBarTabText2">พนักงาน</h2>
              </div>
            </Link>

            {/* Reviews */}
            <Link href="/review">
              <div className="sideBarTabContainer2">
                <RateReviewIcon className=" sideBarTabIcon2" />
                <h2 className="sideBarTabText2">รีวิวและคะแนน</h2>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
