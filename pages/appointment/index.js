import React from "react";
import Head from "next/head";
import BtnCancel from "../../components/BtnCancel";
import BtnDetails from "../../components/BtnDetails";
import Image from "next/image";
import Header from "../../components/Header";

const index = () => {
  return (
    <div>
      <Head>
        <title>Daycare | Appointment </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="divide-y divide-[#A17851] divide-opacity-30">
      <Header />
      <div className="main ">
        <h2 className="pageTitle">นัดหมายดูแล</h2>

        <div className="font-semibold text-md text-[#6C5137] ml-3 mb-5">
          วันนี้ -
          <span
            className="cursor-pointer underline-offset-2 hover:text-[#463220] 
         hover:underline"
          >
            {" "}
            จันทร์ 25 มิถุนายน 2565
          </span>
        </div>
        {/*request list */}
        <div className="divide-y  divide-yellow-700 ml-3 ">
          {/*List 1 */}
          <div className=" flex flex-row gap-2 justify-start content-center text-sm pb-2">
            <div className="basis-1 pt-2">
              <Image
                className="rounded-full "
                src="/User1.jpg"
                alt="User1 Request list"
                width="55"
                height="55"
                layout="fixed"
              />
            </div>
            <div className=" basis-9/12">
              <div className="grid grid-col-6   ">
                <div className="col-start-1 col-end-7">
                  <span className="font-bold text-base text-[#6C5137]">
                    คุณ
                  </span>
                  <span className="font-bold text-base text-[#6C5137]">
                    {" "}
                    สมศรี สมใจ
                  </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">ประเภทการดูแล:</span>
                  <span> กิจวัตรประจำวันทั่วไป </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">ผู้ติดต่อ:</span>
                  <span> ติดต่อมาเอง </span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold ">เวลา:</span>
                  <span className="font-semibold text-[#8E6947]">
                    {" "}
                    จันทร์ 27 มิถุนายน 2565 08.00 น. - 11:00 น.
                  </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span> 095-1236545</span>
                </div>

                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">สถานที่ดูแล:</span>
                  <span> บ้าน</span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold">ที่อยู่:</span>
                  <span> 67/4 หมู่ 6 ต.สุเทพ อ.เมือง จ. เชียงใหม่ 52000</span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">พนักงานผู้ดูแล:</span>
                  <span> สมหญิ วิมล</span>
                </div>
              </div>
            </div>

            <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
              <div>
                <BtnDetails />
              </div>
              <div>
                <BtnCancel className="border-0" />
              </div>
            </div>
          </div>

          {/*List 2*/}
          <div className=" flex flex-row gap-2 justify-start content-center text-sm">
            <div className="basis-1 pt-2">
              <Image
                className="rounded-full "
                src="/User4.jpeg"
                alt="User1 Request list"
                width="55"
                height="55"
                layout="fixed"
              />
            </div>
            <div className=" basis-9/12">
              <div className="grid grid-col-6   ">
                <div className="col-start-1 col-end-7">
                  <span className="font-bold text-base text-[#6C5137]">
                    คุณ
                  </span>
                  <span className="font-bold text-base text-[#6C5137]">
                    {" "}
                    สมยศ เปี่ยมสุข
                  </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">ประเภทการดูแล:</span>
                  <span> แขนบำบัด </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">ผู้ติดต่อ:</span>
                  <span> ติดต่อมาเอง </span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold ">เวลา:</span>
                  <span className="font-semibold text-[#8E6947]">
                    {""} พุธ 27 มิถุนายน 2565 13.00 - 16:00 น.
                  </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span> 084-5674325</span>
                </div>

                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">สถานที่ดูแล:</span>
                  <span> บ้าน</span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold">ที่อยู่:</span>
                  <span> 64 หมู่ 3 ต.หางดง อ.ฮอด จ. เชียงใหม่ 50240</span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">พนักงานผู้ดูแล:</span>
                  <span> พรนิภา สามารถ</span>
                </div>
              </div>
            </div>

            <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
              <div>
                <BtnDetails />
              </div>
              <div>
                <BtnCancel className="border-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      

      
    </div>
  );
};

export default index;
