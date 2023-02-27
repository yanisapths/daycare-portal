import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import AppointmentListCard from "../../components/OLCard/AppointmentListCard";
import PatientItemList from "../../components/OLSelect/PatientItemList";
import EventListCard from "../../components/OLCard/EventListCard";

import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Schedule = ({ patient,clinic,user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourseData] = useState([]);
  const [appointment, setAppointmentData] = useState([]);
  const [event, setEventData] = useState([]);
  const [result, setResult] = useState("");
  const [staffs, setStaffs] = useState([]);

  const fetchData = async () => {
    let isSubscribed = true;
    if(session){
      const courseurl = `${process.env.url}/course/match/${clinic._id}`;
      const appointmenturl = `${process.env.url}/appointment/match/${clinic._id}/approved`;
      const eventurl = `${process.env.url}/event/match/clinic/${clinic._id}`;
      const staffurl = `${process.env.url}/staff/match/${clinic._id}`;
  
      const appointments = await fetch(appointmenturl);
      const courses = await fetch(courseurl);
      const events = await fetch(eventurl);
      const staff = await fetch(staffurl);
  
      const appointment = await appointments.json();
      const course = await courses.json();
      const event = await events.json();
      const staffs = await staff.json();
  
      if (isSubscribed) {
        setAppointmentData(appointment);
        setCourseData(course);
        setEventData(event);
        setStaffs(staffs);
      }
      return () => (isSubscribed = false);
    }
    else {
      router.push("/auth/signin/");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <div>
      <Head>
        <title>Clinic | Schedule </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main">
          <div className="text-center">
            <h1 className="pageTitle">ตารางนัด</h1>
          </div>
          <div className="flex mx-auto items-center justify-center lg:justify-end px-12 pt-8">
            <Box sx={{ minWidth: 350 }}>
              <FormControl fullWidth>
                <InputLabel>เลือกนัดจากชื่อ</InputLabel>
                <Select
                  sx={{ borderRadius: "32px" }}
                  label="เลือกนัดจากชื่อ"
                  value={result}
                  onChange={handleChange}
                >
                  {appointment.map((input, index) => {
                    return (
                      <MenuItem key={input._id} value={input._id}>
                        <PatientItemList input={input} key={index} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="max-w-screen-xl mx-auto items-center justify-center pt-2 px-6">
            {appointment
              .filter(({ _id }) => {
                if (_id == "") {
                  return "Not found";
                }
                const escaped = escapeRegExp(_id);
                const re = new RegExp(`.*${escaped}$`);
                return re.test(result);
              })
              .map((result) => {
                return (
                  <div key={result._id}>
                    <AppointmentListCard
                      clinic={clinic}
                      key={result._id}
                      data={appointment}
                      d={result}
                      user={user}
                      staffs={staffs}
                    />
                    {event &&
                      event?.map((e, index) => (
                        <div key={index}>
                          {e.appointment_id == result._id ? (
                            <EventListCard
                              clinic={clinic}
                              d={e}
                              index={index}
                              data={appointment}
                              event={e}
                              staffs={staffs}
                              user={user}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
          <div className="flex items-center justify-center pt-12 px-24">
            {!result && (
              <div className="text-center justify-center space-y-10">
                <Image
                  src="/asset/appointmentwithman.png"
                  width={120}
                  height={120}
                  className="opacity-60"
                />
                <p className="h5 lg:h2 text-black/50">
                  ดูนัดที่ยังคงดำเนินการอยู่
                </p>
              </div>
            )}
          </div>
        </main>
        <FooterSocial />
      </div>
    </div>
  );
};

export default Schedule;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const { user } = session;
    const url = `${process.env.url}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinic = await res.json();
      if (!clinic) {
        return router.push("/noClinic");
      }
      return { props: { clinic,user } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,user
        },
      };
    }
  }
  return {
    props: {
      error: true
    },
  };
}
