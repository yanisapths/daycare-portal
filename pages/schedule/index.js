import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Head from "next/head";
import Calendar from "../../components/calendar/OLCalendar";

const Schedule = () => {
  return (
    <div>
      <Head>
        <title>Clinic | Schedule </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
      <Header />

      <div className="main">
        <div className="text-center">
          <h1 className="pageTitle">
            ตารางนัด
          </h1>
          <Calendar />
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Schedule;
