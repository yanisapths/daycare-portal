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

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(`${process.env.dev}/clinic/owner/${user.id}`);
    const staff = await fetch(`${process.env.dev}/staff/owner/${user.id}`);

    const staffData = await staff.json();

    const clinic = await res.json();
    if (isSubscribed) {
      setClinic(clinic);
      setStaff(staffData);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  if (clinic) {
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
            <div className="lg:flex xl:grid xl:grid-cols-2 gap-5">
            {staffData ? (
              staffData.map((data,index) => {
                return (
                  <div className="flex justify-center"  key={index}>
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
  } else {
    return <></>;
  }
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
