import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import BtnDetails from "../../../components/BtnDetails";
import FormModal from "../../request/FormModal";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function ListView({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  async function finishTask(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = await fetch(`https://olive-service-api.vercel.app/appointment/accept/${appointmentId}`, option)
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }

  return (
    <div>
      {/*request list */}
      {data &&
        data?.map((d, index) => (
          <>
            {d.status == "Approved" && data.status != "Done" ? (
              <>
                <div className="ml-3 mb-5 mt-6 lg:mt-12">
                  <span className="text-[#463220] font-semibold lg:text-3xl">
                    {" "}
                    {new Date(d.appointmentDate).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                    })}
                  </span>
                </div>

                <article
                  key={d._id}
                  className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3"
                >
                  <div className=" flex flex-row gap-3 justify-start content-center text-sm  mx-4 pt-4">
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
                          <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                            {" "}
                            {d.nickName ? <p>{d.nickName}</p> : ""}
                          </span>
                        </div>
                        <div className="col-start-1 col-end-7  ">
                          <span className="font-bold text-base text-[#6C5137] md:text-lg sm:text-lg xxl:text-2xl xxxl:text-3xl">
                            คุณ
                          </span>
                          <span className="font-bold text-base text-[#6C5137] sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                            {" "}
                            {d.firstName} {d.lastName}
                          </span>
                        </div>
                        <div className="col-start-1 col-span-5 xxxl:col-start-1 xxl:col-span-3 xxxl:col-span-3 ">
                          <span className="xxl:text-lg xxxl:text-xl sm:hidden">
                            รายละเอียดเพิ่มเติม:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden">
                            <HealthAndSafetyIcon />
                          </span>
                          <span className="mx-2 xxl:mx-4 font-semibold xxl:text-lg xxxl:text-xl">
                            {" "}
                            {d.description ? d.description : "-"}{" "}
                          </span>
                        </div>
                        <div className="col-start-1 col-span-4 sm:col-span-4 xxl:col-span-1">
                          <span className="xxl:text-lg xxxl:text-xl sm:hidden">
                            เวลา:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden ">
                            <AccessTimeIcon />
                          </span>
                          <strong className="mx-2 xxl:mx-4 bg-[#ffe898]/50 text-[#6C5137] p-1 xxl:px-3 xxl:py-1.5 rounded">
                            <span className="font-semibold text-[#8E6947] xxl:text-lg xxxl:text-xl ">
                              {new Date(d.appointmentTime).toLocaleTimeString(
                                "en-EN",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </span>
                          </strong>
                        </div>
                        <div className="col-start-1 col-span-3 sm:col-span-7 xxl:col-start-5 xxxl:col-start-4">
                          <span className="sm:hidden xxl:text-lg  xxxl:text-xl">
                            เบอร์โทรศัพท์:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden ">
                            <PhoneIcon />
                          </span>
                          <span className="mx-2 xxl:mx-4 font-semibold xxl:text-lg xxxl:text-xl xl:pl-2">
                            {" "}
                            {d.phoneNumber}
                          </span>
                        </div>

                        <div className="col-start-1 col-span-3">
                          <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                            สถานที่ดูแล:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden ">
                            <HomeIcon />
                          </span>
                          <span className="mx-2 xxl:mx-4 font-semibold lg:text-lg xxxl:text-xl">
                            {" "}
                            {d.appointmentPlace}
                          </span>
                        </div>
                        <div className="col-start-5 col-span-4 sm:col-start-1 md:col-start-1 xxl:col-start-5 xxxl:col-start-4">
                          <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                            ที่อยู่:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden ">
                            <PlaceIcon />
                          </span>
                          <span className="font-semibold  xxl:text-lg xxxl:text-xl">
                            {" "}
                            {d.location ? <p>{d.location}</p> : ""}
                          </span>
                        </div>
                        <div className="col-start-1 col-span-3 sm:col-span-8">
                          <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                            พนักงานผู้ดูแล:
                          </span>
                          <span className="text-[#969696] lg:hidden md:hidden ">
                            <PermIdentityIcon />
                          </span>
                          <span className="mx-2 xxl:mx-4 font-semibold xxl:text-lg xxxl:text-xl">
                            {" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-wrap basis-1/5  gap-2 justify-end content-center mx-5 sm:justify-center sm:my-3 pb-5 px-5 ">
                    <div>
                      <BtnDetails
                        text="สำเเร็จ"
                        onClick={() =>
                          Swal.fire({
                            title: "เสร็จงานนี้?",
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: "ใช่",
                            cancelButtonText: "ยกเลิก",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              finishTask(d._id).then(() =>
                              Swal.fire({
                                title: "งานสำเร็จแล้ว",
                                showConfirmButton: false,
                                icon: "success",
                                timer: 1000,
                              }));
                            } else if (
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              Swal.fire({
                                title: "ยกเลิก",
                                showConfirmButton: false,
                                icon: "error",
                                timer: 800,
                              });
                            }
                          })
                        }
                      />
                    </div>
                    <button
                      onClick={handleClickOpen}
                      className="text-[#FF2F3B] hover:bg-[#FF2F3B]/5 hover:rounded-2xl w-20 h-9 
                    sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
                    >
                      ยกเลิก
                    </button>
                    <FormModal
                      open={open}
                      handleClose={handleClose}
                      request={d}
                    />
                  </div>
                </article>
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      {!data || data.length < 1 && (
        <div className="text-center px-10 pt-40">
          <p className="h4 lg:h2 text-black/30">คุณไม่มีนัดหมายเร็วๆนี้</p>
        </div>
      )}
    </div>
  );
}

export default ListView;
