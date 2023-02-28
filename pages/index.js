import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Dashboard from "./dashboard";
import BannerCard from "../components/common/BannerCard";
import FooterSocial from "../components/FooterSocial";
import Image from "next/image";

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clinicData, setData] = useState({});

  async function fetchData() {
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
      <div>
        <Head>
          <title>Olive | Physiotherapy Clinic </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="max-w-screen mb-72 md:px-12 xl:mx-24 ">
          <div className="p-3 mx-auto">
            {session ? (
              <BannerCard username={session.user.name} className="static" />
            ) : (
              <></>
            )}
          </div>
          <Dashboard data={clinicData} />
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
