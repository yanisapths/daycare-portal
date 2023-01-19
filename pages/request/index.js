import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ListView from "./request_view/ListView";
import BtnAdd from "../../components/common/BtnAdd";
import IconButton from "../../components/common/OLIconButton";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";
import TableView from "./request_view/TableView";

const Request = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinicData, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [view, setView] = useState([]);

  const list = [
    {
      id: "listView",
      icon: <ViewListIcon className="w-8 h-8" />,
      title: "List View",
    },
    {
      id: "tableView",
      icon: <GridOnIcon className="w-8 h-8" />,
      title: "Table View",
    },
  ];

  useEffect(() => {
    switch (selected) {
      case "listView":
        setView(clinicData);
      case "tableView":
        setView(clinicData);
      default:
        setView(clinicData);
    }
  }, [selected]);

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
    };

    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }

    return () => (isSubscribed = false);
  }, [status]);

  return (
    <div>
      <Head>
        <title>Clinic | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <div className="main ">
          <h2 className="pageTitle">คำขอดูแล</h2>
          <div className="flex flex-col gap-1 m-3 font-noto text-sm ">
            <div className="font-semibold text-[#6C5137] flex max-auto space-x-8">
              <div className="pt-2">
                <BtnAdd />
              </div>
              {list.map((item) => (
                <div key={item.id} className="inline-flex transition duration-300 ease-in-out">
                  <IconButton
                    active={selected === item.id}
                    setSelected={setSelected}
                    id={item.id}
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>
          {selected == "tableView" ? (
           <TableView data={clinicData} />
          ) : (
            <ListView data={clinicData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
