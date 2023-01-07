import React from "react";
import Header from "../../components/Header";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Head>
        <title>Clinic | Review </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <div className="main"></div>
      </div>
    </div>
  );
};

export default index;
