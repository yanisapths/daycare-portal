import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import BtnAdd from "../../components/common/BtnAdd";
import TableView from "./patient_view/TableView";
import Head from "next/head";
import AddPatientForm from "./AddPatientForm";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Patient() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinicData, setData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `${process.env.url}/clinic/owner/${session.user.id}`
      );
      try {
        const clinicData = await res.json();
        if (clinicData) {
          setData(clinicData);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
      await delay(3000);
    }
  }

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
        <title>Clinic | Patient Report </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main">
          <div className="pageTitle">แบบบันทึกรายงานผู้ป่วย</div>
          <section className="min-w-screen-md m-3">
            <div className="pt-2 flex justify-end">
              <BtnAdd onClick={handleClickOpen} />
              <AddPatientForm
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
              />
            </div>
            <div className="">
              <TableView />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Patient;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
