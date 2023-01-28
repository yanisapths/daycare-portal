import React from "react";
import Image from "next/image";
import BtnDetails from "../../../components/BtnDetails";
import BtnEdit from "../../../components/BtnEdit";
import WorkIcon from "@mui/icons-material/Work";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoIcon from "@mui/icons-material/Info";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function ListView({ staffData }) {
  if (staffData) {
    return (
      <>
        <article className="w-full md:w-5/6 lg:w-5/6 xl:w-3/6 overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white m-4 lg:p-10">
          <div className="flex flex-col gap-2 m-3 font-noto mt-2 text-sm">
            <div className="flex flex-row gap-2 justify-start content-center">
              <div className="basis-1/5 pt-2 md:basis-16 lg:basis-16 lg:mx-4">
                {" "}
                <Image
                  className="rounded-full"
                  src="/staff.jpg"
                  alt="/staff.jpg"
                  width="240"
                  height="240"
                  objectFit="cover"
                />
              </div>
              <div className="basis-9/12">
                <div className="grid grid-col-6 sm:grid-col-2 pt-4 lg:gap-4">
                  <div className="col-start-1 col-end-7 lg:pb-4">
                    {staffData.firstName ? (
                      <p className="font-bold text-base text-[#6C5137] sm:text-lg md:text-xl lg:text-2xl">
                        {staffData.firstName} {staffData.lastName}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      ชื่อเล่น:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696]">
                      <WorkIcon />
                    </span>
                    {staffData.firstName ? (
                      <p className="lg:text-xl"> {staffData.nickName}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-start-1 col-span-3 ">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      ตำแหน่ง:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696]">
                      <WorkIcon />
                    </span>
                    {staffData.position ? (
                      <p className="lg:text-xl"> {staffData.position}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-start-4 col-span-4 sm:col-start-1">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      อายุ:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696] ">
                      <HowToRegIcon />
                    </span>
                    <span className="lg:text-xl"> {staffData.age}</span>
                  </div>
                  <div className="col-start-1 col-span-3 sm:col-start-1">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      เพศ:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696] ">
                      <VerifiedIcon />
                    </span>
                    <span className="lg:text-xl"> {staffData.sex}</span>
                  </div>
                  <div className="col-start-4 col-span-2 sm:col-start-1">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      LINE ID:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696] ">
                      <InfoIcon />
                    </span>
                    <span className="lg:text-xl"> {staffData.lineId}</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className=" lg:text-lg font-semibold sm:hidden">
                      เบอร์โทรศัพท์:
                    </span>
                    <span className="lg:hidden md:hidden text-[#969696] ">
                      <LocalPhoneIcon />
                    </span>
                    <span className="lg:text-xl"> {staffData.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center">
              <div>
                <BtnDetails text="ดูเพิ่มเติม" />
              </div>
              <div>
                <BtnEdit />
              </div>
            </div>
          </div>
        </article>
      </>
    );
  } else {
    return <></>;
  }
}

export default ListView;
