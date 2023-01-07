import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HoverCard from "../../../components/common/HoverCard";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ListView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);

  async function fetchData() {
    await delay(1000);
    const url = `https://olive-service-api.vercel.app/course/match/owner/${session.user.id}`;

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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

  if (courseData.length >= 1) {
    console.log(courseData);
    return (
      <div className="overflow-scroll overflow-y-auto space-y-10 overflow-x-hidden">
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
        <p className="h3 font-medium text-black/50">คลินิกคุณยังไม่มีคอร์ส</p>
      </div>
    );
  }
}

export default ListView;
