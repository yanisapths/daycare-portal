import React from "react";
import Image from "next/image";
import BtnCancel from "../../../components/BtnCancel";
import BtnAccept from "../../../components/BtnAccept";

function ListView({ data }) {
  return (
    <>
      <div className="flex flex-col gap-1 m-3 font-noto text-sm ">
        <div className="font-semibold text-[#6C5137] ">
          จันทร์ 25 มิถุนายน 2565
        </div>

        {data?.map((request) => (
          <div
            className=" flex flex-row gap-2 justify-start content-center  "
            key={request._id}
          >
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
              <div className="grid grid-col-6">
                <div className="col-start-1 col-end-7">
                  <span className="font-bold text-base text-[#6C5137]">
                    {request.customerName}
                  </span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span> {request.phoneNumber} </span>
                </div>
                <div className="col-start-4 col-span-4">
                  <span className="font-semibold">ประเภทกายภาพบำบัด:</span>
                  <span>ระบบประสาท</span>
                </div>
                <div className="col-start-1 col-span-3">
                  <span className="font-semibold">สถานที่ดูแล:</span>
                  <span> {request.appointmentPlace}</span>
                </div>

                <div className="col-start-1 col-span-3">
                  <span className="font-semibold ">วันนัดหมาย</span>
                  <span className=" text-[#8E6947]"> {new Date(request.appointmentDate).toDateString()} </span>
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
        ))}
      </div>
    </>
  );
}

export default ListView;
