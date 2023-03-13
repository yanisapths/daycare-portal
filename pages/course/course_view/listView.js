import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
import AddCourse from "../../../components/OLModal/AddCourse";
import BtnAdd from "../../../components/common/BtnAdd";
import DetailView from "../../../components/OLModal/DetailView";
import { resolve } from "styled-jsx/css";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView({ clinicData, courseData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [detialViewOpen, setDetialViewOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  if (courseData.length >= 1) {
    return (
      <div className="h-screen w-full  pb-10 ">
        <div className="flex justify-end">
          <BtnAdd click={handleClickOpen} />
          <AddCourse
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            clinicData={clinicData}
          />
        </div>

        <div className="grid grid-cols-3  my-4  gap-4  sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2 ">
          {courseData?.map((course, index) => (
            <div key={index} >
              <HoverCard
                id={course._id}
                name={course.courseName}
                amount={course.amount}
                duration={course.duration}
                totalPrice={course.totalPrice}
                procedures={course.procedures}
                type={course.type}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="sm:pt-24 md:pt-24 lg:pt-24 xxl:pt-40">
        <div>
          <p className="h3 font-medium sm:h6 md:h4 xxl:h2 text-center text-black/30 ">
            คลินิกคุณยังไม่มีคอร์ส
          </p>
        </div>
        <div className="flex justify-center m-6">
          <BtnAdd click={handleClickOpen} />
          <AddCourse
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            clinicData={clinicData}
          />
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
