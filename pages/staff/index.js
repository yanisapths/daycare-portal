import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import BtnAdd from "../../components/common/BtnAdd";
import AddStaffForm from "./AddStaffForm";
import ListView from "./staff_view/ListView";

const Staff = ({ clinic }) => {
  const [open, setOpen] = useState(false);
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
  async function fetchStaff() {
    if (session && clinic) {
      const res = await fetch(`${process.env.url}/staff/match/${clinic._id}`);
      try {
        const staffData = await res.json();
        setStaff(staffData);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!clinic) {
        return router.push("/noClinic");
      }
      fetchStaff();
    }
  }, [status]);

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
            <BtnAdd click={handleClickOpen} />
            {session && clinic && (
              <AddStaffForm
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                clinicData={clinic}
                id={clinic._id}
              />
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:gap-5">
            {staffData ? (
              staffData.length > 0?(
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
              ):(
                <div className=" col-span-2 text-center pt-36">
                <div className="h3 font-light sm:h5 text-black/30 ">
                  คุณยังไม่ได้เพิ่มพนักงาน
                </div>
              </div>
              )
            ) : (
               <div className=" col-span-2 text-center pt-36">
              <div className="h3 font-light sm:h5 text-black/30 ">
                คุณยังไม่ได้เพิ่มพนักงาน
              </div>
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
  if (session) {
    const url = `${process.env.url}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinic = await res.json();
      if (!clinic) {
        return router.push("/noClinic");
      }
      return { props: { clinic } };
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
