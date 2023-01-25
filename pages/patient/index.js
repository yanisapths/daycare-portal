import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import Head from "next/head";

function Patient() {
  return (
    <div>
      <Head>
        <title>Clinic | Patient Report </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main">
          <div className="pageTitle">แบบบันทึกรายงานผู้ป่วย</div>
          <div></div>
        </main>
      </div>
    </div>
  );
}

export default Patient;
