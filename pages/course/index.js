import React from "react";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

function Course() {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>Clinic | Course </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <main className="h-screen overflow-scroll scrollbar-hide">
        <div className="overflow-scroll scrollbar-hide p-3 -ml-3 h-screen mx-auto px-6 lg:px-8">
        <div className="py-10 px-24">
         <Typography variant="h2">คอร์ส</Typography>
        </div>
        </div>
        <FooterSocial />
      </main>
    </div>
  );
}

export default Course;
