import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Dashboard from "./dashboard";
import BannerCard from "../components/common/BannerCard";
import FooterSocial from "../components/FooterSocial";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clinicData, setData] = useState({});

  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `${process.env.dev}/clinic/owner/${session.user.id}`
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

  if (clinicData) {
    return (
      <div className="">
        <Head>
          <title>Olive | Physiotherapy Clinic </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />

        <main className="h-screen mb-72 max-w-screen md:px-12 xl:mx-24">
          <div className="p-3 -ml-3 h-screen mx-auto px-6 lg:px-8">
            {session ? <BannerCard username={session.user.name} /> : <></>}
            <div className="" />
            <Dashboard data={clinicData} />
          </div>
        </main>
          <FooterSocial />
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
