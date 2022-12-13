import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { HomeIcon } from "@heroicons/react/solid";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen ? (
        <div>
          <MenuIcon
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer top-0 sticky text-yellow-800 pr-6 w-20 h-20"
          />
        </div>
      ) : (
        <div
          className={`top-0 left-0 fixed w-96 h-full bg-[#F9F6F0] shadow-2xl shadow-black/35
          ease-in-out duration-300`}
        >
          <CloseIcon
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-2 left-2 text-yellow-800 pl-6 w-20 h-20 cursor-pointer "
          />

          {/* Tabs */}
          {/* home */}
          <div className="pt-24 bg-[#FFEAB2]"></div>
          <div className="divide-y divide-yellow-700">
            <Link href="/">
            <div className="sideBarTabContainer">
              <HomeIcon className=" sideBarTabIcon" />
              <h2 className="sideBarTabText">หน้าหลัก</h2>
            </div>
            </Link>
            {/* Request */}
            <div className="sideBarTabContainer">
              <PersonAddIcon className="sideBarTabIcon " />
              <h2 className="sideBarTabText">คำขอรับเข้าบริการ</h2>
            </div>
            {/* Appointment */}
            <div className="sideBarTabContainer">
              <CalendarMonthIcon className=" sideBarTabIcon" />
              <h2 className="sideBarTabText">ตารางนัด</h2>
            </div>
            {/* Employees */}
            <div className="sideBarTabContainer">
              <PeopleIcon className=" sideBarTabIcon " />
              <h2 className="sideBarTabText">พนักงาน</h2>
            </div>
            {/* Reviews */}
            <div className="sideBarTabContainer">
              <RateReviewIcon className=" sideBarTabIcon" />
              <h2 className="sideBarTabText">รีวิวและคะแนน</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Drawer;
