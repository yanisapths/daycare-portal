import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
import SideView from "./SideView";
import BtnAdd from "../../../components/common/BtnAdd";
import detailView from "./detailView";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView({ clinicData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchCourseData();
    }
  }, [status]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  //course
  async function fetchCourseData() {
    await delay(1000);
    const url = `${process.env.url}/course/match/owner/${session.user.id}`;

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
          <BtnAdd onClick={handleClickOpen} />
          <SideView
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            clinicData={clinicData}
          />
          </div>

        <div
          className="grid grid-cols-3 my-4 h-fit gap-4 justify-start sm:grid-cols-1 md:grid-cols-2 xxl:grid-cols-4"
          onClick={handleClickOpen}
        >
          {courseData?.map((course) => (
            <HoverCard
              key={course._id}
              name={course.courseName}
              amount={course.amount}
              duration={course.duration}
              totalPrice={course.totalPrice}
              procedures={course.procedures}
              type={course.type}
              
            />
            
          ))}
         <detailView
            open={open}
            setOpen={setOpen}
            handleClose={handleClose} 
          />
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
          <BtnAdd onClick={handleClickOpen} />
          <SideView
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
