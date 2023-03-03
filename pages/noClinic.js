import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import FooterSocial from "../components/FooterSocial";

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
      <Header />
      <div className="static divide-y h-screen divide-[#A17851] bg-[#FFFBF2] divide-opacity-30">
        <main className="max-w-screen mb-72 md:px-12 xl:mx-24 items-center bg-[#FFFBF2] ">
          <div className="p-3 mx-auto">
            <section
              className="pt-28 sm:pt-52 sm:landscape:pt-12 sm:landscape:pr-25 
                lg:pt-24 xl:pt-40 scOne:pt-40 xxxl:pt-56"
            >
              <h2
                className="text-center text-5xl py-8 text-black text-opacity-30 
                  sm:text-2xl sm:pb-2 
                  md:text-4xl md:pb-10
                  lg:text-3xl lg:pb-10
                  xl:text-4xl xl:pb-10
                  xxl:text-4xl xxl:pb-10 xxxl:text-7xl xxxl:pb-10
                  "
              >
                คุณยังไม่มีคลินิก
              </h2>
              <div className="flex justify-center">
                <Link href="/create">
                  <div
                    className="cursor-pointer flex gap-1 sm:w-40 w-60 py-3 md:py-4  justify-center
                    rounded-full hover:border-2  hover:border-[#AD8259] bg-[#ffdf8e] shadow-lg
                    hover:bg-transparent text-[#AD8259] "
                  >
                    <span
                      className="text-xl font-medium 
                      sm:landscape:text-base md:text-base sm:text-base lg:text-base xxl:text-lg xxxl:text-3xl"
                    >
                      {" "}
                      สร้างคลินิก{" "}
                    </span>
                    <AddHomeIcon className="xxxl:w-10 xxxl:h-10" />
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
      <FooterSocial/>
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
