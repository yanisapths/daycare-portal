import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import BtnAdd from "../../components/common/BtnAdd";
import IconButton from "../../components/common/OLIconButton";
import Header from "../../components/Header";
import ListView from "../../components/AppointmentView/ListView";
import CalendarView from "./appointment_view/CalendarView";
import AddAppointmentForm from "../../components/OLForm/AddAppointmentForm"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ViewListIcon from "@mui/icons-material/ViewList";

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
  const [eventData, setEventData] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const list = [
    {
      id: "calendarView",
      icon: <CalendarMonthIcon className="w-8 h-8" />,
      title: "ปฏิทิน",
    },
    {
      id: "listView",
      icon: <ViewListIcon className="w-8 h-8" />,
      title: "นัดทั้งหมด",
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
    const clinicurl = `${process.env.dev}/clinic/owner/${user.id}`;
    const courseurl = `${process.env.dev}/course/match/owner/${user.id}`;
    const availurl = `${process.env.dev}/available/match/owner/${user.id}`;
    const patienturl = `${process.env.dev}/patient/match/${user.id}`;
    const appointmenturl = `${process.env.dev}/appointment/match/owner/${user.id}`;
    const eventurl = `${process.env.dev}/event/match/owner/${user.id}`;
    const staffurl = `${process.env.dev}/staff/owner/${user.id}`;

    const appointment = await fetch(appointmenturl);
    const patient = await fetch(patienturl);
    const course = await fetch(courseurl);
    const avail = await fetch(availurl);
    const clinic = await fetch(clinicurl);
    const events = await fetch(eventurl);
    const staff = await fetch(staffurl);

    const appointmentData = await appointment.json();
    const courseData = await course.json();
    const availData = await avail.json();
    const patientData = await patient.json();
    const clinicData = await clinic.json();
    const eventData = await events.json();
    const staffs = await staff.json();
    if (isSubscribed) {
      setData(clinicData);
      setAppointmentData(appointmentData);
      setCourseData(courseData);
      setAvailData(availData);
      setPatientData(patientData);
      setEventData(eventData);
      setStaffs(staffs);
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
        <div className="main">
          <p className="h4 pageTitle">นัดหมายดูแล</p>
          <div className="font-semibold text-[#6C5137] flex justify-end px-12">
            <div className="pt-2 xl:px-6">
              <BtnAdd onClick={handleClickOpen} />
              <AddAppointmentForm
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                patientData={patientData}
                clinicData={clinicData}
                user={user}
                courseData={courseData}
                availables={availData}
              />
            </div>
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
          {selected == "listView" ? (
            <ListView data={appointmentData} events={eventData} user={user} staffs={staffs} />
          ) : (
            <CalendarView
              data={appointmentData}
              event={eventData}
              user={user}
              staffs={staffs}
            />
          )}
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
