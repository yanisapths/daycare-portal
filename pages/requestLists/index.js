import React from 'react';
import Head from 'next/head'
import {getSession} from "next-auth/react";
import { useSession} from "next-auth/react";
import signIn from "../auth/signin";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import Header from '../../components/Header';
import Table from './view/Table';
import { ArrowLeftIcon } from  '@heroicons/react/solid';
import Link from "next/link"


function RequestLists( ) {

  const {data: session,status} = useSession();
  const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/auth/signin/");
        }
      }, [status])

        return (
        <div className="">
          <Head>
            <title>Olive |  Daycare Dashboard</title>
            <link rel="icon" href="favicon.ico" />
          </Head>
        <Header />

        <main  className="main bg-amber-50">
          <section className="pt-6">
          <nav className="flex text-sm font-medium border-b border-gray-100 lg:max-w-xl">
                <Link href='/'>
                  <ArrowLeftIcon className="rounded-full w-8 h-8 mb-8 cursor-pointer" />
                </Link>
            </nav>
          </section>
            <h1 className="text-3xl font-bold align-center item-center">Request Lists</h1>
            <Table />
        </main>

        </div>
      );

}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session}
  }
}

export default RequestLists;
