import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import BtnAdd from "../../components/common/BtnAdd";
import IconButton from "../../components/common/OLIconButton";
import Header from "../../components/Header";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListView from "./appointment_view/ListView";
import CalendarView from "./appointment_view/CalendarView";

const Appointment = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinicData, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);

  const list = [
    {
      id: "listView",
      icon: <ViewListIcon className="w-8 h-8" />,
      title: "List View",
    },
    {
      id: "calendarView",
      icon: <CalendarMonthIcon className="w-8 h-8" />,
      title: "Calendar View",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "listView":
        setView(clinicData);
      case "calendarView":
        setView(clinicData);
      default:
        setView(clinicData);
    }
  }, [selected]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.dev}/appointment/match/owner/${session.user.id}`
      );
      const clinicData = await res.json();

      if (isSubscribed) {
        setData(clinicData);
      }
    };

    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [status]);

  return (
    <div>
      <Head>
        <title>Daycare | Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30 sm:divide-opacity-70">
        <Header />
        <div className="main">
          <p className="h4 pageTitle">นัดหมายดูแล</p>
          <div className="flex flex-col gap-1 m-3 font-noto text-sm ">
            <div className="font-semibold text-[#6C5137] flex max-auto space-x-8">
              <div className="pt-2">
                <BtnAdd />
              </div>
              {list.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex transition duration-300 ease-in-out"
                >
                  <IconButton
                    active={selected === item.id}
                    setSelected={setSelected}
                    id={item.id}
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
            {selected == "calendarView" ? (
              <CalendarView data={clinicData} />
            ) : (
              <ListView data={clinicData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
