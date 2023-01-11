import React from "react";
import Head from "next/head";
import Image from "next/image";
import BtnDetails from "../../components/BtnDetails";
import BtnEdit from "../../components/BtnEdit";
import Header from "../../components/Header";
import WorkIcon from "@mui/icons-material/Work";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AddBtn from "../../components/AddBtn";
import TuneIcon from "@mui/icons-material/Tune";

const index = () => {
  return (
    <div>
      <Head>
        <title>Clinic | Staff </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <div className="main">
          <h2 className="pageTitle">พนักงาน</h2>

          <div className="flex mx-3 justify-end">
            <AddBtn />
          </div>

          {/*staff list */}
          {/*list #1 */}
          <article className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 ">
            <div className="flex flex-col gap-2 m-3 font-noto mt-2 text-sm">
              <div className="flex flex-row gap-2 justify-start content-center">
                <div className="basis-1/5 pt-2 md:basis-16 lg:basis-16">
                  <Image
                    className="rounded-full "
                    src="/staff.jpg"
                    alt="staff1 pic"
                    width={250}
                    height={250}
                    objectFit="cover"
                  />
                </div>
                <div className=" basis-9/12">
                  <div className="grid grid-col-6 sm:grid-col-2 ">
                    <div className="col-start-1 col-end-7">
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        นาง{" "}
                      </span>
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        พิศมัย ใจรื่น
                      </span>
                    </div>
                    <div className="col-start-1 col-span-3 ">
                      <span className=" lg:text-lg font-semibold sm:hidden">ตำแหน่ง:</span>
                      <span className="lg:hidden md:hidden text-[#969696]">
                        <WorkIcon />
                      </span>
                      <span className="lg:text-lg"> พนักงานชำนาญงานพิเศษ</span>
                    </div>
                    <div className="col-start-4 col-span-4 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ความเชี่ยวชาญ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <HowToRegIcon />
                      </span>
                      <span className="lg:text-lg">ระบบประสาท</span>
                    </div>
                    <div className="col-start-1 col-span-3 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ใบประกอบอนุญาติ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <VerifiedIcon />
                      </span>
                      <span className="text-[#17c11c] lg:text-lg "> มีใบประกอบ</span>
                    </div>
                    <div className="col-start-4 col-span-2 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">เลขที่:</span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <InfoIcon />
                      </span>
                      <span className="lg:text-lg"> 123-23453-6543</span>
                    </div>
                    <div className="col-start-1 col-span-3">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        เบอร์โทรศัพท์:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <LocalPhoneIcon />
                      </span>
                      <span className="lg:text-lg"> 097-453-2134</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center">
                <div >
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
                </div>
              </div>
            </div>
          </article>

          {/*list #2 */}
          <article className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 ">
            <div className="flex flex-col gap-2 m-3 font-noto mt-2 text-sm">
              <div className="flex flex-row gap-2 justify-start content-center">
                <div className="basis-1/5 pt-2 md:basis-16 lg:basis-16">
                  <Image
                    className="rounded-full "
                    src="/staff2.jpg"
                    alt="staff1 pic"
                    width={250}
                    height={250}
                    objectFit="cover"
                  />
                </div>
                <div className=" basis-9/12">
                  <div className="grid grid-col-6 sm:grid-col-2 ">
                    <div className="col-start-1 col-end-7">
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        นางสาว{" "}
                      </span>
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        อารี จารุวรรณ
                      </span>
                    </div>
                    <div className="col-start-1 col-span-3 ">
                      <span className=" lg:text-lg font-semibold sm:hidden">ตำแหน่ง:</span>
                      <span className="lg:hidden md:hidden text-[#969696]">
                        <WorkIcon />
                      </span>
                      <span className="lg:text-lg"> พนักงานทั่วไป</span>
                    </div>
                    <div className="col-start-4 col-span-4 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ความเชี่ยวชาญ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <HowToRegIcon />
                      </span>
                      <span className="lg:text-lg"> -</span>
                    </div>
                    <div className="col-start-1 col-span-3 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ใบประกอบอนุญาติ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <VerifiedIcon />
                      </span>
                      <span className="text-[#c11717] lg:text-lg "> ไม่มีใบประกอบ</span>
                    </div>
                    <div className="col-start-4 col-span-2 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">เลขที่:</span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <InfoIcon />
                      </span>
                      <span className="lg:text-lg"> -</span>
                    </div>
                    <div className="col-start-1 col-span-3">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        เบอร์โทรศัพท์:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <LocalPhoneIcon />
                      </span>
                      <span className="lg:text-lg"> 084-561-4935</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center">
                <div >
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
                </div>
              </div>
            </div>
          </article>

          {/*list #3 */}
          <article className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 ">
            <div className="flex flex-col gap-2 m-3 font-noto mt-2 text-sm">
              <div className="flex flex-row gap-2 justify-start content-center">
                <div className="basis-1/5 pt-2 md:basis-16 lg:basis-16">
                  <Image
                    className="rounded-full "
                    src="/staff3.jpg"
                    alt="staff1 pic"
                    width={250}
                    height={250}
                    objectFit="cover"
                  />
                </div>
                <div className=" basis-9/12">
                  <div className="grid grid-col-6 sm:grid-col-2 ">
                    <div className="col-start-1 col-end-7">
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        นาย{" "}
                      </span>
                      <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl
                      lg:text-2xl">
                        วุฒิพงษ์ คงรัก
                      </span>
                    </div>
                    <div className="col-start-1 col-span-3 ">
                      <span className=" lg:text-lg font-semibold sm:hidden">ตำแหน่ง:</span>
                      <span className="lg:hidden md:hidden text-[#969696]">
                        <WorkIcon />
                      </span>
                      <span className="lg:text-lg"> พนักงานชำนาญงานพิเศษ</span>
                    </div>
                    <div className="col-start-4 col-span-4 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ความเชี่ยวชาญ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <HowToRegIcon />
                      </span>
                      <span className="lg:text-lg">โรคเบาหวาน</span>
                    </div>
                    <div className="col-start-1 col-span-3 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        ใบประกอบอนุญาติ:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <VerifiedIcon />
                      </span>
                      <span className="text-[#17c11c] lg:text-lg "> มีใบประกอบ</span>
                    </div>
                    <div className="col-start-4 col-span-2 sm:col-start-1">
                      <span className=" lg:text-lg font-semibold sm:hidden">เลขที่:</span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <InfoIcon />
                      </span>
                      <span className="lg:text-lg"> 353-7643-12423</span>
                    </div>
                    <div className="col-start-1 col-span-3">
                      <span className=" lg:text-lg font-semibold sm:hidden">
                        เบอร์โทรศัพท์:
                      </span>
                      <span className="lg:hidden md:hidden text-[#969696] ">
                        <LocalPhoneIcon />
                      </span>
                      <span className="lg:text-lg"> 098-671-5737</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center">
                <div >
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default index;
