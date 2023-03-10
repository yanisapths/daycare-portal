import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import ListView from "../course/course_view/listView";
import axios from "axios";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Course({ clinicData }) {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);

  async function fetchCourseData() {
    if (session && clinicData) {
      const url = `${process.env.dev}/course/match/${clinicData._id}`;
      const res = await fetch(url, { method: "GET" });
      try {
        const courseData = await res.json();
        if (courseData) {
          setCourseData(courseData);
        } else return;
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!clinicData) {
        return router.push("/noClinic");
      }
      fetchCourseData();
    }
  }, [status]);

  return (
    <div>
      <Head>
        <title>Clinic | Course </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <div className="main ">
          <div className="pageTitle">คอร์ส</div>
          <div className="overflow-scroll scrollbar-hide ">
              
                <div className="mx-10 ">
                  <ListView
                    clinicData={clinicData}
                    courseData={courseData}
                  />
                </div>
              
            
          </div>
        </div>
        <FooterSocial />
      </div>
    </div>
  );
}

export default Course;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.dev}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinicData = await res.json();
      if (!clinicData) {
        return router.push("/noClinic");
      }
      return { props: { clinicData } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
