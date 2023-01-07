import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <div className=" navBarContainer">
        <Link href="/">
          <div className="navbarItem">หน้าหลัก</div>
        </Link>

        <Link href="/appointment">
          <div className="navbarItem">นัดหมายดูแล</div>
        </Link>

        <Link href="/request">
          <div className="navbarItem">คำขอรับบริการ</div>
        </Link>
        <Link href="schedule">
          <div className="navbarItem">ตารางนัด</div>
        </Link>
        <Link href="/course">
          <div className="navbarItem">คอร์ส</div>
        </Link>
        <Link href="/staff">
          <div className="navbarItem">พนักงาน</div>
        </Link>
        <Link href="/review">
          <div className="navbarItem">รีวิว/คะแนน</div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
