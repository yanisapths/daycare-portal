import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Header from '../components/Header';
import MediumCard from '../components/MediumCard';
import {getSession,useSession} from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const {data: session,status} = useSession();
  const router = useRouter();
  const cardsData = [
    {
      img: '/ed1.jpg', 
      title: 'Daycare Lists',
      link: '/daycareLists/',
    },
    {
      img: '/daycare/bg.png', 
      title: 'Create New Daycare',
      link: '/create/',
    },
  ];

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/auth/signin/");
        }
      }, [status])
  return (
    <div className="">
      <Head>
        <title>Olive | Happy places for Elders</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
     <Header />

    <main  className="main h-screen overflow-scroll scrollbar-hide">
      <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 lg:pt-12">
          <section className="pt-6">
    
              
              <h2 className="text-3xl font-semibold py-8 text-teal-900">Admin Services</h2>
              <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
                {cardsData?.map(({ img, title, link }) => (
                  <MediumCard key={img} img={img} title={title} link={link}/>
                ))} 
              </div>
          </section>
        </div>
    </main>
    </div>
  );

}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {session}
  }
}
