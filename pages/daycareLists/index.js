import React from 'react';
import Head from 'next/head'
import {getSession} from "next-auth/react";
import { useSession} from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import Header from '../../components/Header';
import { ArrowLeftIcon } from  '@heroicons/react/solid';
import Link from "next/link"


function DaycareLists({data}) {

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
            <title>Olive | Daycare Dashboard</title>
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
            <h1 className="text-3xl font-bold align-center item-center">Daycare Lists</h1>
            <div className="mt-12 bg-white shadow-lg">
        <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="sticky left-0 p-4 text-left bg-white">
                        <label className="sr-only" htmlFor="row_all">Select All</label>
                      
                        </th>
                        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                            Name
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1.5 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        </th>
                        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                            Address
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1.5 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        </th>
                        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                            Owner
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1.5 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                               fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        </th>
                        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                            Phone Number
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1.5 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        </th>
                        <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                           Email Address
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1.5 text-gray-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                    {data?.map(daycare => 
                    <tr>
                        <td className="sticky left-0 p-4 bg-white">
                        <label className="sr-only" htmlFor="row_1">Row 1</label>
                        <input
                            className="w-5 h-5 border-gray-200 rounded"
                            type="checkbox"
                            id="row_1"
                        />
                        </td>
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                        {daycare.name}
                        </td>
                        <td className="p-4 text-gray-700 whitespace-nowrap"> {daycare.address}</td>
                        <td className="p-4 text-gray-700 whitespace-nowrap">
                        <strong
                            className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium"
                        >
                             {daycare.owner}
                        </strong>
                        </td>
                        <td className="p-4 text-gray-700 whitespace-nowrap"> {daycare.phoneNumber}</td>
                        <td className="p-4 text-gray-700 whitespace-nowrap"> {daycare.email}</td>
                    </tr>
                    )}
                    </tbody>
                </table>
                </div>
    </div>
        </main>

        </div>
      );

}

export async function getServerSideProps(context) {
  const session = await getSession(context);
   // Fetch data from external API
   const res = await fetch(process.env.baseUrl)
   const data = await res.json()

  return {
    props: { data, session}
  }
}
export default DaycareLists;
