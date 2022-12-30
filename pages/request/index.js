import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ListView from "./request_view/ListView";

const Request = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cid, setCid] = useState([]);
  const [clinicData, setData] = useState([]);
  const [owner, setOwner] = useState([]);

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
      `https://olive-service-api.vercel.app/appointment/match/${cid}`
    );
      const clinicData = await res.json();

      if (isSubscribed) {
        setData(clinicData);
        console.log(clinicData);
      }
    }

    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
     fetchData()
      .catch(console.error);
    }

    return () => isSubscribed = false;
  }, [status,cid])

  return (
    <div>
      <Head>
        <title>Daycare | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <div className="ml-40">
        <h2 className="pageTitle">คำขอดูแล</h2>
        {clinicData ? <ListView data={clinicData} /> : <div></div>}
      </div>
    </div>
  );
};

export default Request;
