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
    const clinicurl = `${process.env.dev}/clinic/owner/${user.id}`;
    const clinic = await fetch(clinicurl);
    if (isSubscribed) {
      try {
        const clinicData = await clinic.json();
        if (clinicData) {
          setData(clinicData);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
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

  async function fetchDatails() {
    const courseurl = `${process.env.dev}/course/match/${clinicData._id}`;
    const availurl = `${process.env.dev}/available/match/${clinicData._id}`;
    const patienturl = `${process.env.dev}/patient/match/clinic/${clinicData._id}`;
    const appointmenturl = `${process.env.dev}/appointment/match/${clinicData._id}`;
    const staffurl = `${process.env.dev}/staff/match/${clinicData._id}`;
    const appointment = await fetch(appointmenturl);
    const patient = await fetch(patienturl);
    const course = await fetch(courseurl);
    const avail = await fetch(availurl);
    const staff = await fetch(staffurl);
    try {
    const appointmentData = await appointment.json();
    const courseData = await course.json();
    const availData = await avail.json();
    const patientData = await patient.json();
    const staffs = await staff.json();
    setAppointmentData(appointmentData);
    setCourseData(courseData);
    setAvailData(availData);
    setPatientData(patientData);
    setStaffs(staffs);
    } catch (err) {
      console.log(err);
    }
  } 
  if (clinicData._id) {
    fetchDatails();
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

