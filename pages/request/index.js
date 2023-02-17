import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import ListView from "./request_view/ListView";
import BtnAdd from "../../components/common/BtnAdd";
import IconButton from "../../components/common/OLIconButton";
import TableView from "./request_view/TableView";
import AddRequestForm from "./AddRequestForm";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";

const Request = ({user}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinicData, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);
  const [open, setOpen] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [availData, setAvailData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [staffs, setStaffs] = useState([]);

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

  const fetchData = async () => {
    let isSubscribed = true;
    const clinicurl = `${process.env.url}/clinic/owner/${user.id}`;
    const courseurl = `${process.env.url}/course/match/owner/${user.id}`;
    const availurl = `${process.env.url}/available/match/owner/${user.id}`;
    const patienturl = `${process.env.url}/patient/match/${user.id}`;
    const appointmenturl = `${process.env.url}/appointment/match/owner/${user.id}`;
    const staffurl = `${process.env.url}/staff/owner/${user.id}`;

    const appointment = await fetch(appointmenturl);
    const patient = await fetch(patienturl);
    const course = await fetch(courseurl);
    const avail = await fetch(availurl);
    const clinic = await fetch(clinicurl);
    const staff = await fetch(staffurl);

    const appointmentData = await appointment.json();
    const courseData = await course.json();
    const availData = await avail.json();
    const patientData = await patient.json();
    const clinicData = await clinic.json();
    const staffs = await staff.json();
    if (isSubscribed) {
      setData(clinicData);
      setAppointmentData(appointmentData);
      setCourseData(courseData);
      setAvailData(availData);
      setPatientData(patientData);
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
        <title>Clinic | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30 sm:divide-opacity-70">
        <Header />
        <div className="main xl:px-12 md:px-8 px-4">
          <h2 className="pageTitle">คำขอดูแล</h2>
          <div className="font-semibold text-[#6C5137] flex justify-end">
            <div className="pt-2 xl:px-6">
              <BtnAdd onClick={handleClickOpen}/>
              <AddRequestForm
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

