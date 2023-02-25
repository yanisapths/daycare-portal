import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import React from "react";
import Image from "next/image";
import BtnLogin from "../../components/BtnLogin";
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
      <div className="mx-auto  h-screen bg-cover overflow-hidden flex justify-center items-center align-middle bg-[#A17851]  max-w-screen-md">
        <div className="flex flex-col justify-center text-center xxl:w-2/5 xxl:h-5/6 xl:w-2/5 xl:h-3/4 lg:w-2/5 lg:h-3/4 md:w-3/5 md:h-3/4 sm:w-5/6 sm:h-3/4
        bg-white backdrop-blur-sm drop-shadow-lg rounded-xl align-middle">
          <div className="">
            <Image
              src="/asset/OLlogo.png"
              className=""
              width="100"
              height="120"
              alt="/Avatar.png"
            />
            <p className=" font-bold text-3xl font-mono ">Welcome</p>

            <p className="mt-4 text-gray-800 fonts-mono text-lg lg:text-base md:text-base md:mt-5 sm:text-sm">
              เข้าสู่ระบบเพื่อใช้งาน
              <p className="block ">Olive Physiotherapy Clinic Management</p>
            </p>
          </div>
          <div className="mt-8 mb-0 grid grid-rows-3 gap-5">
            <div className="flex justify-center h-auto lg:h-10 md:h-10 sm:h-10">
              <div className="flex cursor-pointer h-auto rounded-full bg-gradient-to-r from-orange-50 via-red-100 to-pink-100
               hover:text-red-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.google} />
                <Image
                  src="/google.png"
                  alt="/Avatar.png"
                  width={55}
                  height={10}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex cursor-pointer rounded-full bg-gradient-to-r from-teal-50 via-blue-100 to-sky-100 hover:text-blue-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.facebook} />
                <Image
                  src="/facebook.png"
                  alt="/Avatar.png"
                  width={55}
                  height={10}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex cursor-pointer rounded-full bg-gradient-to-r from-green-50 via-green-100 to-teal-100 hover:text-emerald-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl">
                <BtnLogin provider={providers.line} />
                <Image
                  src="/line.png"
                  alt="/Avatar.png"
                  width={55}
                  height={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
