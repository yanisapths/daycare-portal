import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import BtnAdd from "../../components/common/BtnAdd";
import AddStaffForm from "./AddStaffForm";
import ListView from "./staff_view/ListView";

const Staff = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [clinic, setClinic] = useState({});
  const [staffData, setStaff] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  async function fetchData() {
    if (session.user.id) {
      const res = await fetch(
        `${process.env.dev}/clinic/owner/${session.user.id}`
      );
      try {
        const clinic = await res.json();
        if (clinic) {
          setClinic(clinic);
        } else return;
      } catch (err) {
        return router.push("/noClinic");
      }
    } else {
    }
  }
  async function fetchStaff() {
    const res = await fetch(`${process.env.dev}/staff/match/${clinic._id}`);
    try {
      const staffData = await res.json();
      setStaff(staffData);
      if (staffData) {
      } else return;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  if (clinic._id) {
    fetchStaff();
  }
  return (
    <div>
      <Head>
        <title>Clinic | Staff </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <div className="main xl:px-12 md:px-8 px-4 pb-40">
          <h2 className="pageTitle">พนักงาน</h2>
          <div className="flex mx-3 justify-end">
            <BtnAdd onClick={handleClickOpen} />
            <AddStaffForm
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              clinicData={clinic}
              id={clinic._id}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:gap-5">
            {staffData ? (
              staffData.map((data, index) => {
                return (
                  <div className="flex justify-center" key={index}>
                    <ListView
                      clinicData={clinic}
                      id={clinic._id}
                      key={data._id}
                      staffData={data}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center">
                <p className="h3 text-black/50">คุณยังไม่ได้เพิ่มพนักงาน</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;

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
