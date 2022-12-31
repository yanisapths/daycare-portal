import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import Dashboard from "./dashboard";
import BannerCard from "../components/common/BannerCard";
import FooterSocial from "../components/FooterSocial";

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cid, setCid] = useState([]);
  const [clinicData, setData] = useState({});
  const [requestData, setRequestData] = useState({});

  useEffect(() => {
    const cid = localStorage.getItem("cid");
    if (cid) {
      setCid(cid);
    }
  }, [cid]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const res = await fetch(
        `https://olive-service-api.vercel.app/clinic/owner/${session.user.name}`
      );
      const clinicData = await res.json();



      if (isSubscribed && clinicData) {
        setData(clinicData);
        console.log(clinicData);
      } else {
        return router.push("/noClinic");
      }
    };

    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [status]);

  if (clinicData) {
    return (
      <div className="">
        <Head>
          <title>Olive | Happy places for Elders</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />

        <main className="h-screen overflow-scroll scrollbar-hide">
          <div className="overflow-scroll scrollbar-hide p-3 -ml-3 h-screen mx-auto px-6 lg:px-8">
            <BannerCard username={session.user.name} />
            <div className="pb-6"/>
            <Dashboard data={clinicData} />
          </div>
        <FooterSocial />
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
