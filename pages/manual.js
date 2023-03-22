import React from "react";
import Head from "next/head";
import ManualCanvas from "../components/ManualCanvas";
import Header from "../components/Header";
import FooterSocial from "../components/FooterSocial";

function Manual() {
  return (
    <div>
      <Head>
        <title>Olive | Physiotherapy Clinic </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="lg:min-w-screen lg:h-screen mb-36 sm:mx-2 md:px-12 lg:mx-14 xl:mx-24 pt-8">
        <div className="sm:px-8 lg:px-48">
        <ManualCanvas />
        </div>
      </main>
    </div>
  );
}

export default Manual;
