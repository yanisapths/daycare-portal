import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import ListView from "./request_view/ListView";
import IconButton from "../../components/common/OLIconButton";
import TableView from "./request_view/TableView";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";

const Request = ({clinicData}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const list = [
    {
      id: "listView",
      icon: <ViewListIcon className="w-8 h-8" />,
      title: "คำขอใหม่",
    },
    {
      id: "tableView",
      icon: <GridOnIcon className="w-8 h-8" />,
      title: "คำขอทั้งหมด",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "listView":
        setView(clinicData);
      case "tableView":
        setView(clinicData);
      default:
        setView(clinicData);
    }
  }, [selected]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if(!clinicData){
        return router.push("/noClinic");
       }
       fetchDatails();
    }
  }, [status]);

  async function fetchDatails() {
    if(session && clinicData){
      const appointmenturl = `${process.env.url}/appointment/match/${clinicData._id}`;
      const staffurl = `${process.env.url}/staff/match/${clinicData._id}`;
      const appointment = await fetch(appointmenturl);
      const staff = await fetch(staffurl);
      try {
      const appointmentData = await appointment.json();
      const staffs = await staff.json();
      setAppointmentData(appointmentData);
      setStaffs(staffs);
      } catch (err) {
        console.log(err);
      }
    }
  } 

  return (
    <div>
      <Head>
        <title>Clinic | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30 sm:divide-opacity-70">
        <Header />
        <div className="main xl:px-12 md:px-8 px-4">
          <h2 className="pageTitle">คำขอดูแล</h2>
          <div className="font-semibold text-[#6C5137] flex justify-end">
            {list.map((item) => (
              <div
                key={item.id}
                className="mx-2 transition duration-300 ease-in-out"
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
          {selected == "tableView" ? (
            <TableView data={appointmentData} staffs={staffs} />
          ) : (
            <ListView data={appointmentData} staffs={staffs}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.url}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinicData = await res.json();
      if (!clinicData) {
        return router.push("/noClinic");
      }
      return { props: { clinicData } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}