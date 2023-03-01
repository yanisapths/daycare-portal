import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  return (
    <>
      <div className=" navBarContainer">
        <Link href="/">
          <div className={router.pathname == "/" ? "active" : ""}>
            <div className="navbarItem">หน้าหลัก</div>
          </div>
        </Link>
        <Link href="/request">
          <div className={router.pathname == "/request" ? "active" : ""}>
            <div className="navbarItem">คำขอรับบริการ</div>
          </div>
        </Link>

        <Link href="/appointment">
          <div className={router.pathname == "/appointment" ? "active" : ""}>
            <div className="navbarItem">นัดหมายดูแล</div>
          </div>
        </Link>
        <Link href="availability">
          <div className={router.pathname == "/availability" ? "active" : ""}>
            <div className="navbarItem">จัดการวันว่าง</div>
          </div>
        </Link>
        <Link href="/course">
          <div className={router.pathname == "/course" ? "active" : ""}>
            <div className="navbarItem">คอร์ส</div>
          </div>
        </Link>
        <Link href="/staff">
          <div className={router.pathname == "/staff" ? "active" : ""}>
            <div className="navbarItem">พนักงาน</div>
          </div>
        </Link>
        <Link href="/patient">
          <div className={router.pathname == "/patient" ? "active" : ""}>
            <div className="navbarItem">แบบบันทึกรายงานผู้ป่วย</div>
          </div>
        </Link>
        <Link href="/review">
          <div className={router.pathname == "/review" ? "active" : ""}>
            <div className="navbarItem">รีวิว/คะแนน</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
