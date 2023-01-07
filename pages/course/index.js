import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import ListView from "./course_view/ListView";
import SideView from "./course_view/SideView";

function Course() {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Clinic | Course </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      
      <div className="divide-y divide-[#A17851] divide-opacity-30">
      <Header />

      <main className="main ">
      <div className="pageTitle">คอร์ส</div>
        <div className="overflow-scroll scrollbar-hide top-0">
          <div className="md:flex gap-5">
            <div className="= px-10 w-full md:pl-60 md:w-4/6">
              <div className="md:w-6/6">
                <ListView />
              </div>
            </div>
            <div className="md:w-2/6">
              <SideView />
            </div>
          </div>
        </div>
        <FooterSocial />
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
