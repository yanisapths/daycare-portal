import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import BtnAdd from "../../components/common/BtnAdd";
import TableView from "./patient_view/TableView";
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
          <section className="min-w-screen-md m-3">
            <div className="pt-2">
              <BtnAdd />
            </div>
            <div className="">
              <TableView />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Patient;
