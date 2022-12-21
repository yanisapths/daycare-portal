import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Link from "next/link";
import { withRouter } from "next/router";
import Dashboard from "./dashboard";
import NoClinic from "../components/NoClinic";

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cid, setCid] = useState([]);
  const [clinicData, setData] = useState({});
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    const ownerName = localStorage.getItem("owner");
    if (ownerName) {
      setOwner(ownerName);
    }
  }, [owner]);

  useEffect(async () => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      const res = await fetch(
        `https://olive-service-api.vercel.app/clinic/owner/${session.user.name}`
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
    }
  }, [status]);

  if (clinicData) {
    return (
      <div className="">
        <Head>
          <title>Olive | Happy places for Elders</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />

        <main className="main h-screen overflow-scroll scrollbar-hide">
          <div className="flex space-x-3 justify-center overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12">
            <Dashboard data={clinicData} />
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Home);

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
