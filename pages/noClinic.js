import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";

const NoClinic = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    }
  });

  return (
    <>
      <Head>
        <title>Olive | Physiotherapy Clinic</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <main className="main ">
          <div
            className="flex space-x-3 justify-center  items-center overflow-scroll scrollbar-hide    
          "
          >
            <section
              className="pt-28 sm:pt-52 sm:landscape:pt-12 sm:landscape:pr-25 md:pt-80
                lg:pt-24 xl:pt-40 scOne:pt-40 xxxl:pt-56"
            >
              <h2
                className=" items-center text-5xl py-8 text-black text-opacity-30 
                  sm:text-2xl sm:pb-2 
                  md:text-4xl md:pb-3
                  lg:text-3xl lg:pb-3
                  xl:text-4xl xl:pb-3
                  xxl:text-4xl xxl:pb-3 xxxl:text-7xl xxxl:pb-6
                  "
              >
                You have no Clinic
              </h2>
              <Link href="/create">
                
                <div className="buttonPrimary">
                  <span
                    className="text-xl font-medium 
                      sm:landscape:text-base md:text-base sm:text-base lg:text-base xxl:text-lg xxxl:text-3xl   "
                  >
                    {" "}
                    Add Daycare{" "}
                  </span>
                  <AddHomeIcon className="xxxl:w-10 xxxl:h-10" />
                </div>
              </Link>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default NoClinic;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
