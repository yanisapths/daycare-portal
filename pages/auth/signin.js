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
      <div className="mx-auto  h-screen bg-cover overflow-hidden flex justify-center items-center align-middle bg-[#A17851] max-w-screen-md">
        <div
          className="px-4 pt-4 flex flex-col justify-center text-center xxl:w-1/3 xxl:h-5/6 xl:w-2/5 xl:h-5/6 lg:w-2/5 lg:h-5/6 md:w-3/5 md:h-3/4 sm:w-5/6 sm:h-5/6
        bg-white backdrop-blur-sm drop-shadow-lg rounded-xl align-middle"
        >
          <div className="">
            <Image
              src="/asset/OLlogo.png"
              className=""
              width="100"
              height="120"
              alt="/Avatar.png"
            />
            <p className="xl:text-3xl font-bold text-2xl font-mono">Welcome</p>

            <p className="mt-4 text-gray-800 fonts-mono text-lg sm:text-xs md:text-lg lg:text-base md:mt-5 xxl:text-lg">
              เข้าสู่ระบบเพื่อใช้งาน
              <p className="block ">Olive Physiotherapy Clinic Management</p>
            </p>
          </div>
          <div className="mt-6 mb-0 grid grid-rows-3 gap-5 content-center mx-auto">
            <div
              className="grid grid-col-2 content-center cursor-pointer rounded-full bg-gradient-to-r from-orange-50 via-red-100 to-pink-100
               hover:text-red-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl "
            >
              <div>
                <BtnLogin provider={providers.google} />
              </div>
              <div className="col-start-2 flex justify-end items-center">
                <Image
                  src="/google.png"
                  alt="/Avatar.png"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div
              className="grid grid-col-2 content-center cursor-pointer rounded-full bg-gradient-to-r from-green-50
               via-green-100 to-teal-100 hover:text-emerald-600 active:text-opacity-75 focus:outline-none focus:ring shadow-gray-200 shadow-xl"
            >
              <div>
                <BtnLogin provider={providers.line} />
              </div>
              <div className="col-start-2 flex justify-end  items-center">
                <Image
                  src="/line.png"
                  alt="/Avatar.png"
                  width={40}
                  height={40}
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
