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
        <title>Olive | Pysiotherapy Clinic</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main h-screen overflow-scroll scrollbar-hide">
          <div
            className="flex space-x-3 justify-center  items-center overflow-scroll scrollbar-hide    
        "
          >
            <section className="pt-28 sm:pt-52 sm:landscape:pt-12 sm:landscape:pr-25 tablet:pt-80
            lg:pt-72 xl:pt-24" >
              <h2
                className=" items-center text-5xl py-8 text-black text-opacity-30 sm:text-2xl sm:pb-2
              
            "
              >
                You have no Clinic
              </h2>
              <Link href="/create">
                <div className="buttonPrimary">
                  <span className="text-xl font-medium sm:text-base sm:landscape:text-lg 
                  tablet:text-md  ">
                    {" "}
                    Add Daycare{" "}
                  </span>
                  <AddHomeIcon className=" text-center ml-3 h-8 sm:h-6 sm: w-6 sm:ml-2" />
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
