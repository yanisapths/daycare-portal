import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import ListView from "./course_view/ListView";
import SideView from "./course_view/SideView";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Course() {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clinicData, setData] = useState({});

  async function fetchData() {
    await delay(1000);
    if(session.user.id) {
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
    }else {
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
      <Header />

      <main className="h-screen overflow-scroll scrollbar-hide">
        <div className="overflow-scroll scrollbar-hide">
          <div className="xl:flex gap-4">
            <div className="pt-10 p-10 w-full xl:pl-60 xl:w-4/6">
              <Typography variant="h2">คอร์ส</Typography>
              <div className="pb-10" />
              <div className="xl:w-6/6">
              <ListView />
              </div>
            </div>
            <div className="xl:w-2/6 xl:pt-40 xl:pr-4">
            <SideView />
            </div>
          </div>
        </div>
        <FooterSocial />
      </main>
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
