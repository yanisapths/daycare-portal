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
import AddAppointmentForm from "./AddAppointmentForm";

const Appointment = ({ user }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);
  const [open, setOpen] = useState(false);
  const [clinicData, setData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [availData, setAvailData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

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

  const fetchData = async () => {
    let isSubscribed = true;
    const clinicurl = `${process.env.url}/clinic/owner/${user.id}`;
    const courseurl = `${process.env.url}/course/match/owner/${user.id}`;
    const availurl = `${process.env.url}/available/match/owner/${user.id}`;
    const patienturl = `${process.env.url}/patient/match/${user.id}`;
    const appointmenturl = `${process.env.url}/appointment/match/owner/${user.id}`;

    const appointment = await fetch(appointmenturl);
    const patient = await fetch(patienturl);
    const course = await fetch(courseurl);
    const avail = await fetch(availurl);
    const clinic = await fetch(clinicurl);

    const appointmentData = await appointment.json();
    const courseData = await course.json();
    const availData = await avail.json();
    const patientData = await patient.json();
    const clinicData = await clinic.json();
    if (isSubscribed) {
      setData(clinicData);
      setAppointmentData(appointmentData);
      setCourseData(courseData);
      setAvailData(availData);
      setPatientData(patientData);
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

  return (
    <div>
      <Head>
        <title>Daycare | Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30 sm:divide-opacity-70">
        <Header />
        <div className="main xl:px-12 md:px-8 px-4">
          <p className="h4 pageTitle">นัดหมายดูแล</p>
          <div className="font-semibold text-[#6C5137] flex justify-end">
            <div className="pt-2 xl:px-12">
              <BtnAdd onClick={handleClickOpen} />
              <AddAppointmentForm
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                patientData={patientData}
                clinicData={clinicData}
                user={user}
                courseData={courseData}
                availData={availData}
              />
            </div>
          </div>
          <ListView data={appointmentData} />
        </div>
      </div>
    </div>
  );
};

export default Appointment;

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
