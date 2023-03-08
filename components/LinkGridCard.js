import React from "react";
import Link from "next/link";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

function LinkGridCard({ data }) {
  return (
    <section className="">
      <div className="mt-10 grid grid-cols-1 gap-8 sm:mx-4 sm:gap-6  md:grid-cols-2  lg:grid-cols-3">
        <Link href="/appointment">
          <div className="linkGridCardContainer">
            <BookOnlineIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">Upcoming Appointment</h2>
            <p className="mt-4 h6 text-black/60">ดูนัดที่กำลังมาถึง</p>
          </div>
        </Link>

        <Link href="/request">
          <div className="linkGridCardContainer">
            <PersonAddIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">New Request</h2>
            <p className="mt-4 h6 text-black/60">คำขอใหม่</p>
          </div>
        </Link>

        <Link href="/course">
          <div className="linkGridCardContainer">
            <BookmarksIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">Course</h2>
            <p className="mt-4 h6 text-black/60">คอร์สทั้งหมด</p>
          </div>
        </Link>

        <Link href="/availability">
          <div className="linkGridCardContainer">
            <EventAvailableIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">Available Slot</h2>
            <p className="mt-4 h6 text-black/60">วันเวลารับนัด</p>
          </div>
        </Link>

        <Link href="/staff">
          <div className="linkGridCardContainer">
            <PeopleIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">Clinic Staff</h2>
            <p className="mt-4 h6 text-black/60">ดูรายชื่อพนักงานคลินิก</p>
          </div>
        </Link>

        <Link href="/patient">
          <div className="linkGridCardContainer">
            <FolderSharedIcon className="h-10 w-10" />
            <h2 className="mt-4 text-xl font-bold ">Patient Report</h2>
            <p className="mt-4 h6 text-black/60">แบบบันทึกรายงานผู้ป่วย</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default LinkGridCard;
