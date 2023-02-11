import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import AppointmentListCard from "../../components/OLCard/AppointmentListCard";
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Schedule = ({ user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clinic, setData] = useState([]);
  const [course, setCourseData] = useState([]);
  const [appointment, setAppointmentData] = useState([]);
  const [event, setEventData] = useState([]);
  const [id, setId] = useState("");

  const fetchData = async () => {
    let isSubscribed = true;
    const clinicurl = `${process.env.dev}/clinic/owner/${user.id}`;
    const courseurl = `${process.env.dev}/course/match/owner/${user.id}`;
    const appointmenturl = `${process.env.dev}/appointment/match/owner/${user.id}`;
    const eventurl = `${process.env.dev}/event/match/owner/${user.id}`;

    const appointments = await fetch(appointmenturl);
    const courses = await fetch(courseurl);
    const clinics = await fetch(clinicurl);
    const events = await fetch(eventurl);

    const appointment = await appointments.json();
    const course = await courses.json();
    const clinic = await clinics.json();
    const event = await events.json();
    if (isSubscribed) {
      setData(clinic);
      setAppointmentData(appointment);
      setCourseData(course);
      setEventData(event);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

  const handleChange = (event) => {
    setId(event.target.value);
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
          <div className="flex mx-auto items-center justify-end px-12 pt-8">
            <Box sx={{ minWidth: 350 }}>
              <FormControl fullWidth>
                <InputLabel>เลขที่นัดหมาย</InputLabel>
                <Select
                  sx={{ borderRadius: "32px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="เลขที่นัดหมาย"
                  value={id}
                  onChange={handleChange}
                >
                  {appointment.map((input) => {
                    return (
                      <MenuItem key={input._id} value={input._id}>
                        {input._id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="max-w-screen-xl mx-auto items-center justify-center pt-2">
            {appointment
              .filter(({ _id }) => {
                if (_id == "") {
                  return "Not found";
                }
                const escaped = escapeRegExp(_id);
                const re = new RegExp(`.*${escaped}$`);
                return re.test(id);
              })
              .map(
                ({
                  _id,
                }) => (
                 <div>{_id}</div>
                )
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
  if (!session) {
    return {
      props: {},
    };
  }
  const { user } = session;
  return {
    props: { user },
  };
}
