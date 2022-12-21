import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import BtnCancel from "../../components/BtnCancel";
import BtnAccept from "../../components/BtnAccept";
import RequestList from "../../components/RequestList";
import Header2 from "../../components/Header2";

const index = () => {
  return (
    <div>
      <Head>
        <title>Daycare | Request </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      
      <div className="ml-40">
      <h2 className="pageTitle">คำขอดูแล</h2>

{/*request list */}
<div className="divide-y  divide-yellow-700">
  {/*list #1*/}
  <div className="flex flex-col gap-2 m-5 font-noto ">
    <div className="font-semibold text-[#6C5137]">
      จันทร์ 25 มิถุนายน 2565
    </div>

    <div className=" flex flex-row gap-2 justify-start content-center">
      <div className="basis-1">
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
        <div className="grid grid-col-6  gap-2 ">
          <div className="col-start-1 col-end-7">
            <span className="font-bold text-lg">สมศรี สมใจ</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เบอร์โทรศัพท์:</span>
            <span> 095-1236545 </span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">ประเภทกายภาพบำบัด:</span>
            <span>ระบบประสาท</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">สถานที่ดูแล:</span>
            <span> 67/4 หมู่ 6 ต.สุเทพ อ.เมือง จ. เชียงใหม่ 52000</span>
          </div>

          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เริ่ม:</span>
            <span> จันทร์ 27 มิถุนายน 2565 08.00 น.</span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">สิ้นสุด:</span>
            <span> จันทร์ 27 มิถุนายน 2565 17.00 น.</span>
          </div>
        </div>
      </div>

      <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
        <div>
          <BtnAccept />
        </div>
        <div>
          <BtnCancel />
        </div>
      </div>
    </div>
  </div>
  {/*list #2*/}
  <div className="flex flex-col gap-2 m-5 font-noto ">
    <div className="font-semibold text-[#6C5137]">
      อังคาร 26 มิถุนายน 2565
    </div>

    <div className="flex flex-row gap-2 justify-center content-center">
      <div className="basis-1">
        <Image
          className="rounded-full "
          src="/User4.jpeg"
          alt="User4 Request list"
          width="55"
          height="55"
          layout="fixed"
        />
      </div>

      <div className="basis-9/12">
        <div className="grid grid-col-6  gap-2 ">
          <div className="col-start-1 col-end-7">
            <span className="font-bold text-lg">สมยศ เปี่ยมสุข</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เบอร์โทรศัพท์:</span>
            <span> 084-5674325 </span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">ประเภทกายภาพบำบัด:</span>
            <span>ผู้สูงวัย</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">สถานที่ดูแล:</span>
            <span> 4 หมู่ 3 ต.หางดง อ.ฮอด จ. เชียงใหม่ 50240</span>
          </div>

          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เริ่ม:</span>
            <span> พุธ 27 มิถุนายน 2565 13.00 น.</span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">สิ้นสุด:</span>
            <span> พุธ 27 มิถุนายน 2565 16.00 น.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap basis-1/5  gap-4 justify-center content-center">
        <div>
          <BtnAccept />
        </div>
        <div>
          <BtnCancel />
        </div>
      </div>
    </div>
  </div>
  {/*list #3*/}
  <div className="flex flex-col gap-2 m-5 font-noto ">
    <div className="font-semibold text-[#6C5137]">
      อังคาร 26 มิถุนายน 2565
    </div>

    <div className="flex flex-row gap-2 justify-center content-center">
      <div className="basis-1">
        <Image
          className="rounded-full "
          src="/User2.jpg"
          alt="User4 Request list"
          width="55"
          height="55"
          layout="fixed"
        />
      </div>

      <div className="basis-9/12">
        <div className="grid grid-col-6  gap-2 ">
          <div className="col-start-1 col-end-7">
            <span className="font-bold text-lg">มานี มีใจ</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เบอร์โทรศัพท์:</span>
            <span> 096-456-7612 </span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">ประเภทกายภาพบำบัด:</span>
            <span>กระดูกและกล้ามเนื้อ</span>
          </div>
          <div className="col-start-1 col-span-3">
            <span className="font-semibold">สถานที่ดูแล:</span>
            <span> 46/6 หมู่ 8 ต.สุเทพ อ.สุเทพ จ. เชียงใหม่ 50200</span>
          </div>

          <div className="col-start-1 col-span-3">
            <span className="font-semibold">เริ่ม:</span>
            <span> พุธ 27 มิถุนายน 2565 08.00 น.</span>
          </div>
          <div className="col-start-4 col-span-4">
            <span className="font-semibold">สิ้นสุด:</span>
            <span> พุธ 27 มิถุนายน 2565 11.00 น.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap basis-1/5  gap-4 justify-center content-center">
        <div>
          <BtnAccept />
        </div>
        <div>
          <BtnCancel />
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
