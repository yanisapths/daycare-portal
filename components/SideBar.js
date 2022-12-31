import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { HomeIcon } from "@heroicons/react/solid";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";
import  BookOnlineIcon  from "@mui/icons-material/BookOnline";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter()
  const currentRoute = router.pathname

  return (
    <>
      {!isOpen ? (
        <MenuIcon
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer my-auto text-[#6C5137]"
        />
      ) : (
        <div>
          <MenuIcon
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer bg-transparent text-[#6C5137]"
          />
          <div
            className="left-0 w-40 h-screen t-0 absolute shadow-2xl bg-[#FFEAB2] 
        ease-in-out duration-300"
          >
            <div className="divide-y divide-yellow-700 ">
                <div className="pt-3">
                <Link href="/">
                <div className={'sideBarTabContainer2 ${currentRoute === "/" ? "active":""}'}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
