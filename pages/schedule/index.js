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
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[#6C5137] font-extrabold text-3xl md:text-5xl pb-4">
            Calendar
          </h1>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
