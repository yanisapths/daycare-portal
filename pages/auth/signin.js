import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import BtnLogin from "../../components/BtnLogin";
import Link from "next/link";
import Head from "next/head";

function signIn({ providers }) {
  return (
    <div>
      {/* <Header /> */}
      <Head>
        <title>Olive | SignIn </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      {/* main */}
      <main className="justify-items-center h-full sm:mt-10 md:mt-24 xl:mt-36">
        <div className="max-w-screen-xl h-full  mx-auto  ">
          <div className="max-w-lg mx-auto text-center ">
            <Image
              src="/olivelogo.png"
              className=""
              width="100%"
              height="100%"
              alt="/Avatar.png"
              //    layout="fill"
              objectFit="contain"
            />
            <h1 className="md:text-5xl font-bold text-3xl font-mono ">
              เข้าสู่ระบบ
            </h1>

            <p className="mt-4 text-gray-800 fonts-mono text-lg md:text-2xl md:mt-5">
              แหล่งรวมศูนย์ดูแลเพื่อคนที่คุณรัก
            </p>
          </div>
          <div className="mt-8 mb-0 space-y-6 md:space-y-8">
            <div className="flex justify-center">
              <div className="flex  md:pr-4  sm:pr-8 rounded-full bg-gradient-to-r from-orange-50 via-red-100 to-pink-100 hover:text-red-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.google} />
                <Image
                  src="/google.png"
                  alt="/Avatar.png"
                  width="60%"
                  height={5}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex  md:pr-4 sm:pr-8  rounded-full bg-gradient-to-r from-teal-50 via-blue-100 to-sky-100 hover:text-blue-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.facebook} />
                <Image
                  src="/facebook.png"
                  alt="/Avatar.png"
                  width="60%"
                  height={5}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex  md:pr-4  sm:pr-8  rounded-full bg-gradient-to-r from-green-50 via-green-100 to-teal-100 hover:text-emerald-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.line} />
                <Image
                  src="/line.png"
                  alt="/Avatar.png"
                  width="60%"
                  height={5}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default signIn;
