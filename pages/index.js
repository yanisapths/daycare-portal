import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Dashboard from "./dashboard";
import BannerCard from "../components/common/BannerCard";
import FooterSocial from "../components/FooterSocial";

function Home({ clinicData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!clinicData) {
        router.push("/noClinic");
      }
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
        <main className="max-w-screen mb-72 sm:mx-4 md:px-12 lg:mx-14 xl:mx-24">
          <div className="p-3 mx-auto">
            {session ? (
              <BannerCard username={session.user.name} className="static" />
            ) : (
              <></>
            )}
          </div>
          <Dashboard data={clinicData} clinicId={clinicData._id} />
        </main>
        <FooterSocial />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default withRouter(Home);

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.dev}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinicData = await res.json();
      if (!clinicData) {
        return router.push("/noClinic");
      }
      return { props: { clinicData } };
    } catch (error) {
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
