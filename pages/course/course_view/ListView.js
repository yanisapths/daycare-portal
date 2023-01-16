import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import SideView from "./SideView";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [clinicData, setData] = useState({});


  //clinic
  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `https://olive-service-api.vercel.app/clinic/owner/${session.user.id}`
      );
      try {
        const clinicData = await res.json();
        if (clinicData) {
          setData(clinicData);
          console.log(clinicData);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
      await delay(3000);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

   

  async function fetchData() {
    await delay(1000);
    const url = `https://olive-service-api.vercel.app/course/match/owner/${session.user.id}`;
    //course
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
    console.log(courseData);
    return (
      //overflow-y-hidden  overflow-x-hidden
      <div className="grid grid-cols-3 my-4 h-fit gap-4 justify-start
      sm:grid-cols-1
      md:grid-cols-2
      xxl:grid-cols-4">
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
    );
  } else {
    return (
      <div className="overflow-hidden">
        <p className="h3 font-medium  text-center text-black/50 ">
          คลินิกคุณยังไม่มีคอร์ส
        </p>
        <div>
          <Popup
            trigger={
              <div className="buttonPrimary my-3">
                <span
                  className="text-xl font-medium sm:text-base md:text-base 
          lg:text-base xxl:text-lg xxxl:text-3xl "
                >
                  {" "}
                  เพิ่มคอร์ส{" "}
                </span>
                <AddIcon className="xxxl:w-10 xxxl:h-10" />
              </div>
            }
            position="center"
          >
            <div
              className="flex justify-center items-center h-full w-full 
            rounded-lg border-2 border-[#AD8259] bg-white"
            >
              <SideView clinicData={clinicData} />
            </div>
          </Popup>
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

