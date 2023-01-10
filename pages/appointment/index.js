import React from "react";
import Head from "next/head";
import BtnCancel from "../../components/BtnCancel";
import BtnDetails from "../../components/BtnDetails";
import Image from "next/image";
import Header from "../../components/Header";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";

const index = () => {
  return (
    <div>
      <Head>
        <title>Daycare | Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30 sm:divide-opacity-70">
        <Header />
        <div className="main">
          <h2 className="pageTitle">นัดหมายดูแล</h2>

          <div className="font-semibold text-md text-black ml-3 mb-5">
            วันนี้ -
            <span
              className="cursor-pointer underline-offset-2 hover:text-[#463220] 
         hover:underline"
            >
              {" "}
              จันทร์ 27 มิถุนายน 2565
            </span>
          </div>

          {/*request list */}
          {/*List 1 */}
          <article className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 ">
            <div className=" flex flex-row gap-3 justify-start content-center text-sm  mx-4 ">
              <div className="basis-1/5 mt-5 rounded-full self-start md:basis-16 lg:basis-16">
                <Image
                  className="rounded-full"
                  src="/user1.jpg"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <div className="basis-9/12">
                <div className="grid grid-col-6 gap-1 mt-4">
                  <div className="col-start-1 col-end-7  ">
                    <span className="font-bold text-base text-[#6C5137] md:text-lg sm:text-lg xxl:text-2xl xxxl:text-3xl">
                      คุณ
                    </span>
                    <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                      {" "}
                      สมศรี สมใจ
                    </span>
                  </div>
                  <div className="col-start-1 col-span-5 xxxl:col-start-1 xxl:col-span-3 xxxl:col-span-3 ">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      การดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden">
                      <HealthAndSafetyIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      กิจวัตรประจำวันทั่วไป{" "}
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-6 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      ผู้ติดต่อ:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <AccountCircleIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      ติดต่อมาเอง{" "}
                    </span>
                  </div>
                  <div className="col-start-1 col-span-4 sm:col-span-4 xxl:col-span-3 xxxl:col-span-3">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      เวลา:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <AccessTimeIcon />
                    </span>
                    <span className="font-semibold text-[#8E6947] xxl:text-lg xxxl:text-xl ">
                      {" "}
                      จันทร์ 27 มิถุนายน 2565 08.00 น. - 11:00 น.
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-7 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold sm:hidden xxl:text-lg  xxxl:text-xl">
                      เบอร์โทรศัพท์:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PhoneIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      095-123-6545
                    </span>
                  </div>

                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      สถานที่ดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <HomeIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl"> บ้าน</span>
                  </div>
                  <div className="col-start-5 col-span-4 sm:col-start-1 md:col-start-1 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      ที่อยู่:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PlaceIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      67/4 หมู่ 6 ต.สุเทพ อ.เมือง จ. เชียงใหม่ 52000
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-8">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      พนักงานผู้ดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PermIdentityIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      สมหญิง วิมล
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center mx-5 sm:justify-center sm:my-3 pb-5 px-5 ">
              <div>
                <BtnDetails />
              </div>
              <div>
                <BtnCancel />
              </div>
            </div>
          </article>

          {/*List 2*/}
          <article className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 ">
            <div className=" flex flex-row gap-3 justify-start content-center text-sm  mx-4 ">
              <div className="basis-1/5 mt-5 rounded-full self-start md:basis-16 lg:basis-16">
                <Image
                  className="rounded-full"
                  src="/user3.jpg"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <div className="basis-9/12">
                <div className="grid grid-col-6 gap-1 mt-4">
                  <div className="col-start-1 col-end-7  ">
                    <span className="font-bold text-base text-[#6C5137] md:text-lg sm:text-lg xxl:text-2xl xxxl:text-3xl">
                      คุณ
                    </span>
                    <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                      {" "}
                      สมยศ เปี่ยมสุข
                    </span>
                  </div>
                  <div className="col-start-1 col-span-5 xxxl:col-start-1 xxl:col-span-3 xxxl:col-span-3 ">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      การดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden">
                      <HealthAndSafetyIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      ลดปวดแขนด้วยไฟฟ้า{" "}
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-6 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      ผู้ติดต่อ:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <AccountCircleIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      ติดต่อมาเอง{" "}
                    </span>
                  </div>
                  <div className="col-start-1 col-span-4 sm:col-span-4 xxl:col-span-3 xxxl:col-span-3">
                    <span className="font-semibold xxl:text-lg xxxl:text-xl sm:hidden">
                      เวลา:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <AccessTimeIcon />
                    </span>
                    <span className="font-semibold text-[#8E6947] xxl:text-lg xxxl:text-xl ">
                      {" "}
                      จันทร์ 29 มิถุนายน 2565 13:00 น. - 14:00 น.
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-7 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold sm:hidden xxl:text-lg  xxxl:text-xl">
                      เบอร์โทรศัพท์:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PhoneIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      065-546-8612
                    </span>
                  </div>

                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      สถานที่ดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <HomeIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl"> คลีนิค</span>
                  </div>
                  <div className="col-start-5 col-span-4 sm:col-start-1 md:col-start-1 xxl:col-start-5 xxxl:col-start-4">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      ที่อยู่:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PlaceIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      -
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-span-8">
                    <span className="font-semibold sm:hidden xxl:text-lg xxxl:text-xl">
                      พนักงานผู้ดูแล:
                    </span>
                    <span className="text-[#969696] lg:hidden md:hidden ">
                      <PermIdentityIcon />
                    </span>
                    <span className="xxl:text-lg xxxl:text-xl">
                      {" "}
                      ภรนิภา สามารถ
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center mx-5 sm:justify-center sm:my-3  pb-5 px-5 ">
              <div>
                <BtnDetails />
              </div>
              <div>
                <BtnCancel />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default index;
