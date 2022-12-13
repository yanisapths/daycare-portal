import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    }
  }, [status]);
  return (
    <div className="">
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <main className="main h-screen overflow-scroll scrollbar-hide">
        <div className="flex space-x-3 justify-center overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12">
          <section className="pt-28">
            <h2 className="text-5xl py-8 text-gray-400 ">
              You have no daycare
            </h2>

            <Link href="/create">
              <div className="cursor-pointer inline-flex items-center buttonPrimary">
                <span className="text-xl font-medium"> Add Daycare </span>
                <AddHomeIcon className="ml-3 h-8 w-8" />
              </div>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
