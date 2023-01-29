import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import ListView from "./course_view/ListView";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Course() {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [clinicData, setData] = useState({});

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
          console.log(clinicData._id);
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

  return (
    <div>
      <Head>
        <title>Clinic | Course </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <div className="main">
          <div className="pageTitle">คอร์ส</div>
          <div className="overflow-scroll scrollbar-hide ">
            <div className="md:flex gap-5">
              <div className="= px-10 w-full ">
                <div className="">
                  {" "}
                  <ListView clinicData={clinicData} />{" "}
                </div>
              </div>
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

  return {
    props: { session },
  };
}
