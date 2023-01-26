import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import SideView from "./SideView";
import Modal from "../../../components/Modal";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView({ clinicData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchCourseData();
    }
  }, [status]);

  //course
  async function fetchCourseData() {
    await delay(1000);
    const url = `${process.env.dev}/course/match/owner/${session.user.id}`;

    if (session.user.id) {
      const res = await fetch(url);
      try {
        const courseData = await res.json();
        if (courseData) {
          setCourseData(courseData);
          console.log(url);
          console.log(courseData);
        } else return;
      } catch (err) {
        console.log(err);
      }
    } else {
      await delay(3000);
    }
  }

  if (courseData.length >= 1) {
    return (
      <div className="main">
       
          <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer  bg-[#6C5137]/80 rounded-full text-white py-2 px-3 text-xs xxl:text-sm
                   hover:bg-transparent hover:border-2 hover:border-[#6C5137] hover:text-[#6C5137] shadow-xl
                   "
          >
            <AddIcon className="w-4 h-4" />
            <span>เพิ่มคอร์ส</span>
          </button>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"เพิ่มคอร์ส"}
            children={<SideView clinicData={clinicData} />}
          ></Modal>
          </div>

        <div
          className="grid grid-cols-3 my-4 h-fit gap-4 justify-start sm:grid-cols-1 md:grid-cols-2 xxl:grid-cols-4"
        >
          {courseData?.map((course) => (
            <HoverCard
              key={course._id}
              name={course.courseName}
              amount={course.amount}
              duration={course.duration}
              totalPrice={course.totalPrice}
              procedures={course.procedures}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col sm:pt-24 md:pt-24 lg:pt-24 xxl:pt-40">
        <div>
          <p className="h3 font-medium sm:h6 md:h4 xxl:h2 text-center  text-black/30 ">
            คลินิกคุณยังไม่มีคอร์ส
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="buttonPrimary my-2 sm:w-2/5 sm:left-24  md:w-3/12 md:left-[290px] lg:left-[410px] xl:left-[500px] xxl:left-[600px]"
          >
            สร้างคอร์ส
            <AddIcon className="sm:w-4 sm:h-5 md:w-5 md:h-5 xxxl:w-10 xxxl:h-10" />
          </button>
          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={"เพิ่มคอร์ส"}
            children={<SideView clinicData={clinicData} />}
          ></Modal>
        </div>
      </div>
    );
  }
}

export default ListView;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
