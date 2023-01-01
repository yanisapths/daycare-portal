import React from "react";
import Head from "next/head";
import Image from "next/image";
import BtnDetails from "../../components/BtnDetails";
import BtnEdit from "../../components/BtnEdit";
import Header from "../../components/Header";

const index = () => {
  return (
    <div>
      <Head>
        <title>Clinic | Staff </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />

      <div className="ml-40">
        <h2 className="pageTitle">พนักงาน</h2>

        {/*staff list */}
        <div className="divide-y divide-yellow-700 ">
          {/*list #1 */}
          <div className="flex flex-col gap-2 m-5 font-noto mt-2 text-sm">
            <div className="flex flex-row gap-2 justify-start content-center">
              <div className="basis-1 pt-2">
                <Image
                  className="rounded-full "
                  src="/staff.jpg"
                  alt="staff1 pic"
                  width="55"
                  height="55"
                  layout="fixed"
                />
              </div>
              <div className=" basis-9/12">
                <div className="grid grid-col-6  ">
                  <div className="col-start-1 col-end-7">
                    <span className="font-bold text-base text-[#6C5137]">
                      นาง{" "}
                    </span>
                    <span className="font-bold text-base text-[#6C5137]">
                      พิศมัย ใจรื่น
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ตำแหน่ง:</span>
                    <span> พนักงานชำนาญงานพิเศษ</span>
                  </div>
                  <div className="col-start-4 col-span-4">
                    <span className="font-semibold">ความเชี่ยวชาญ:</span>
                    <span>ระบบประสาท</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ใบประกอบอนุญาติ:</span>
                    <span className="text-[#17c11c]"> มีใบประกอบ</span>
                  </div>
                  <div className="col-start-4 col-span-2">
                    <span className="font-semibold">เลขที่:</span>
                    <span> 123-23453-6543</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">เบอร์โทรศัพท์:</span>
                    <span> 097-453-2134</span>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
                <div>
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
                </div>
              </div>
            </div>
          </div>

          {/*list #2 */}
          <div className="flex flex-col gap-2 m-5 font-noto text-sm">
            <div className="flex flex-row gap-2 justify-start content-center">
              <div className="basis-1 pt-2">
                <Image
                  className="rounded-full "
                  src="/staff2.jpg"
                  alt="staff2pic"
                  width="55"
                  height="55"
                  layout="fixed"
                />
              </div>
              <div className=" basis-9/12">
                <div className="grid grid-col-6  gap-1 ">
                  <div className="col-start-1 col-end-7">
                    <span className="font-bold text-base text-[#6C5137]">
                      นางสาว{" "}
                    </span>
                    <span className="font-bold text-base text-[#6C5137]">
                      อารี จารุวรรณ
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ตำแหน่ง:</span>
                    <span> พนักงานทั่วไป</span>
                  </div>
                  <div className="col-start-4 col-span-4">
                    <span className="font-semibold">ความเชี่ยวชาญ:</span>
                    <span>กิจวัตรทั่วไป</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ใบประกอบอนุญาติ:</span>
                    <span className="text-[#c11717]"> ไม่มีใบประกอบ</span>
                  </div>
                  <div className="col-start-4 col-span-2">
                    <span className="font-semibold">เลขที่:</span>
                    <span> -</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">เบอร์โทรศัพท์:</span>
                    <span> 084-345-5431</span>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
                <div>
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
                </div>
              </div>
            </div>
          </div>

          {/*list #3 */}
          <div className="flex flex-col gap-2 m-5 font-noto text-sm">
            <div className="flex flex-row gap-2 justify-start content-center">
              <div className="basis-1 pt-2">
                <Image
                  className="rounded-full "
                  src="/staff3.jpg"
                  alt="staff3pic"
                  width="55"
                  height="55"
                  layout="fixed"
                />
              </div>
              <div className=" basis-9/12">
                <div className="grid grid-col-6  gap-1 ">
                  <div className="col-start-1 col-end-7">
                    <span className="font-bold text-base text-[#6C5137]">
                      นาย
                    </span>
                    <span className="font-bold text-base text-[#6C5137]">
                      {" "}
                      วุฒิพงษ์ คงรัก
                    </span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ตำแหน่ง:</span>
                    <span> พนักงานชำนาญงานพิเศษ</span>
                  </div>
                  <div className="col-start-4 col-span-4">
                    <span className="font-semibold">ความเชี่ยวชาญ:</span>
                    <span>โรคเบาหวาน</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">ใบประกอบอนุญาติ:</span>
                    <span className="text-[#17c11c]"> มีใบประกอบ</span>
                  </div>
                  <div className="col-start-4 col-span-2">
                    <span className="font-semibold">เลขที่:</span>
                    <span> 234-65467-8976</span>
                  </div>
                  <div className="col-start-1 col-span-3">
                    <span className="font-semibold">เบอร์โทรศัพท์:</span>
                    <span> 084-345-5431</span>
                  </div>
                </div>
              </div>
              <div className=" flex flex-wrap basis-1/5  gap-4 justify-center content-center">
                <div>
                  <BtnDetails />
                </div>
                <div>
                  <BtnEdit />
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
