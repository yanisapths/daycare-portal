import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ListView from "./request_view/ListView";

const Request = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinicData, setData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
       const res = await fetch(
      `https://olive-service-api.vercel.app/appointment/match/owner/${session.user.id}`
    );
      const clinicData = await res.json();

      if (isSubscribed) {
        setData(clinicData);
      }
    }

    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
     fetchData()
      .catch(console.error);
    }

    return () => isSubscribed = false;
  }, [status])

  return (
    <div>
      <Head>
        <title>Clinic | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <div className="lg:ml-40">
        <h2 className="pageTitle">คำขอดูแล</h2>
        {clinicData ? <ListView data={clinicData} /> : <div></div>}
      </div>
    </div>
  );
};

export default Request;
