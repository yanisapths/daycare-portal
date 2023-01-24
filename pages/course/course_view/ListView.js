import React, { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import SideView from "./SideView";
import Modal from "../../../components/Modal";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [clinicData, setData] = useState({});
  const [showModal,setShowModal]= useState(false);

  //clinic
  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `${process.env.dev}/clinic/owner/${session.user.id}`
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
    const url = `${process.env.dev}/course/match/owner/${session.user.id}`;
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
    return (
      <>
        <div>
          <Popup
            trigger={
              <div className="flex justify-end">
                <div
                  className="cursor-pointer  bg-[#6C5137]/80 rounded-full text-white py-2 px-3 text-xs xxl:text-sm
                   hover:bg-transparent hover:border-2 hover:border-[#6C5137] hover:text-[#6C5137] "
                >
                  <AddIcon className="w-4 h-4" />
                  <span>เพิ่มคอร์ส</span>
                </div>
              </div>
            }
            position="center"
          >
            <div
              className="relative h-screen  sm:scale-75  sm:top-20 md:top-16 md:scale-75 md:left-8  
            md:w-11/12 xxl:top-48 xxl:scale-90 lg:top-14 lg:scale-75  "
            >
              <SideView clinicData={clinicData} className="" />
            </div>
          </Popup>
        </div>
        <div
          className="grid grid-cols-3 my-4 h-fit gap-4 justify-start
        sm:grid-cols-1
        md:grid-cols-2
        xxl:grid-cols-4"
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
      </>
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
          <button onClick={()=>setShowModal(true)}
          className="buttonPrimary my-2 sm:w-2/5 sm:left-24  md:w-3/12 md:left-[290px] lg:left-[410px] xl:left-[500px] xxl:left-[600px]">
            สร้างคอร์ส
            <AddIcon className="sm:w-4 sm:h-5 md:w-5 md:h-5 xxxl:w-10 xxxl:h-10" />
            </button>
          <Modal onClose={()=> setShowModal(false)}
          show={showModal}
          title={'เพิ่มคอร์ส'}
          children={<SideView clinicData={clinicData}
          />}
         >
            
              {/* <SideView clinicData={clinicData}
               /> */}
            
          </Modal>
        </div>
        {/* <div>
          <Popup
            contentStyle={{ left: "0px" }}
            trigger={
              <div className="buttonPrimary my-2 sm:w-2/5 sm:left-24  md:w-3/12 md:left-[290px] lg:left-[410px] xxl:left-[600px]">
                <span
                  className="text-xl font-medium sm:text-sm md:text-sm 
                 lg:text-base xxl:text-lg xxxl:text-3xl "
                >
                  {" "}
                  เพิ่มคอร์ส{" "}
                </span>
                <AddIcon className="sm:w-4 sm:h-5 md:w-5 md:h-5 xxxl:w-10 xxxl:h-10" />
              </div>
            }
            position="center"
          >
            <div
              className="flex justify-center items-center sm:w-screen
            rounded-lg sm:scale-75 md:scale-75 lg:scale-75 xxl:scale-100 xxl:pt-20"
            >
              <SideView clinicData={clinicData} />
            </div>
          </Popup>
        </div> */}
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
