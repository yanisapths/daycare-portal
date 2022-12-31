import React from "react";
import Link from "next/link";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

function LinkGridCard({ data }) {
  return (
    <section className="px-4 pt-8">
      <p className="h2">{data.clinic_name}</p>
        <p className="mt-2 text-xl font-bold text-black/75">{data.address}</p>
        <p className="mt-4 text-lg text-black/75 sm:truncate ">{data.description}</p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/appointment">
            <a className="linkGridCardContainer">
              <BookOnlineIcon className="h-10 w-10" />
              <h2 className="mt-4 text-xl font-bold ">
                Upcoming Appointment
              </h2>
              <p className="mt-4 h6 text-black/60">
                ดูนัดที่กำลังมาถึง
              </p>
            </a>
          </Link>

          <Link href="/request">
            <a className="linkGridCardContainer">
              <PersonAddIcon className="h-10 w-10" />
              <h2 className="mt-4 text-xl font-bold ">
                New Request
              </h2>
              <p className="mt-4 h6 text-black/60">
                คำขอใหม่
              </p>
            </a>
          </Link>
          <Link href="/staff">
            <a className="linkGridCardContainer">
              <PeopleIcon className="h-10 w-10" />
              <h2 className="mt-4 text-xl font-bold ">
                 Clinic Staff
              </h2>
              <p className="mt-4 h6 text-black/60">
                ดูรายชื่อพนักงานคลินิก
              </p>
            </a>
          </Link>
        </div>
    </section>
  );
}

export default LinkGridCard;
