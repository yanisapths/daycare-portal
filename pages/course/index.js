import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import ListView from "./course_view/ListView";
import SideView from "./course_view/SideView";
import Popup from "reactjs-popup";
import AddIcon from "@mui/icons-material/Add";

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

  return (
    <div>
      <Head>
        <title>Clinic | Course </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main">
          <div className="pageTitle">คอร์ส</div>
          <div>
            <Popup
              trigger={
                <div className="flex justify-end  mx-4  ">
                  <div
                    className="cursor-pointer  bg-[#6C5137]/80 rounded-xl text-white py-1 px-2 text-xs xxl:text-sm
                   hover:bg-transparent hover:border-2 hover:border-[#6C5137] hover:text-[#6C5137] "
                  >
                    <AddIcon className="w-4 h-4" />
                    <span>เพิ่มคอร์ส</span>
                  </div>
                </div>
              }
              position="center"
            >
              <div className="bg-transparent scale-75 pt-10 ">
                <SideView clinicData={clinicData} />
              </div>
            </Popup>
          </div>
          <div className="overflow-scroll scrollbar-hide ">
            <div className="md:flex gap-5">
              <div className="= px-10 w-full ">
                <div className="md:w-6/6">
                  <ListView />
                </div>
              </div>
            </div>
          </div>
          <div>
            <FooterSocial />
          </div>
        </main>
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
