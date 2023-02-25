import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BtnCancel from "../BtnCancel";
import BtnAccept from "../BtnAccept";
import FormModal from "../../pages/request/FormModal";
import RequestModal from "../OLModal/RequestModal";
import Overlay from "../OLLayout/Overlay";
import RoundTextIcon from "../OLIcon/RoundTextIcon";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { motion } from "framer-motion";

function RequestListCard({ data, request, staffs }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [p, setPatient] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    setOpen(false);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  const fetchData = async () => {
    let isSubscribed = true;
    const patientData = await fetch(
      `${process.env.url}/patient/${request.patient_id}`
    );

    const courseData = await fetch(
      `${process.env.url}/course/${request.course_id}`
    );

    const course = await courseData.json();
    const p = await patientData.json();
    if (isSubscribed) {
      setCourse(course);
      setPatient(p);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  async function acceptRequest(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    };
    const res = await fetch(
      `${process.env.url}/appointment/accept/${appointmentId}`,
      option
    )
      .then(async (res) => {
        toast.success("ยอมรับคำขอสำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }

  useEffect(() => {
    const courseurl = `${process.env.url}/course/${request.course_id}`;
    fetch(courseurl, {
      method: "GET",
    })
      .then(async (res) => {
        const course = await res.json();
        setCourse(course);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <RequestModal
            data={request}
            patient={p}
            setSelectedId={setSelectedId}
            close={closeModal}
            course={course}
          ></RequestModal>
        </Overlay>
      )}
      {request.status == "pending" ? (
        <div>
          <div className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white">
            <motion.div
              key={request._id}
              layoutId={request._id}
              onClick={() => setSelectedId(request._id)}
              className="cursor-pointer"
            >
              <div className="flex flex-row gap-3 justify-start content-center text-sm pt-4 px-12">
                <div className="basis-12/12">
                  <div className="grid grid-col-6 gap-1 mt-4">
                    <div className="flex gap-4 sm:gap-12">
                      <div className="font-semibold pb-2 text-base xl:text-lg sm:w-4/6 sm:truncate">
                        <span className="text-base">คุณ </span>
                        {request.patient_id ? (
                          <span>
                            ( {p.nickName} ) {p.firstName} {p.lastName}
                          </span>
                        ) : (
                          <span>
                            ( {request.nickName} ) {request.firstName}{" "}
                            {request.lastName}
                          </span>
                        )}
                      </div>
                      <div className="sm:w-full">
                        <RoundTextIcon className="text-sm"
                          icon={<BookmarksIcon className="w-4 h-4" />}
                          text={course.courseName}
                        />
                      </div>
                    </div>
                    <div className="col-start-1 col-span-6 ">
                      <span className="  justify-center">
                        {/* <CalendarMonthIcon/> */}
                        วันที่ขอรับบริการ:
                      </span>
                      <span className="text-[#969696] mx-2 xxl:mx-4 text-base">
                        {new Date(request.appointmentDate).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="col-start-1 col-span-6">
                      <span className="">
                       {/*  <AccessTimeIcon /> */}
                       เวลา:
                      </span>
                      {request.endTime ? (
                        <span className="text-[#969696] mx-2 xxl:mx-4 text-base">
                          <span className="">
                            {new Date(
                              request.appointmentTime
                            ).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            {"-"}{" "}
                            {new Date(request.endTime).toLocaleTimeString(
                              "th-TH",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                            {" "}{"น."}
                          </span>
                        </span>
                      ) : (
                        <span className="text-[#969696] mx-2 xxl:mx-4 text-lg">
                          {new Date(request.appointmentTime).toLocaleTimeString(
                            "th-TH",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <div className="col-start-1 col-span-3">
                      <span className="sm:hidden xxl:text-lg xxxl:text-base">
                        สถานที่นัด:
                      </span>
                      <span className="text-[#969696] lg:hidden md:hidden ">
                        <HomeIcon />
                      </span>
                      <span className="text-[#969696] mx-2 xxl:mx-4 text-base">
                        {" "}
                        {request.appointmentPlace}
                      </span>
                    </div>
                    <div className="col-start-1 col-span-3 sm:col-span-8">
                      <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                        พนักงานผู้ดูแล:
                      </span>
                      <span className="text-[#969696] lg:hidden md:hidden ">
                        <PermIdentityIcon />
                      </span>
                      <span className="mx-2 xxl:mx-4 xxl:text-lg xxxl:text-xl text-black/40">
                        {request.staff ? (
                          <span>
                            {staffs.map(
                              (input) =>
                                input._id == request.staff &&
                                request.staff != "none" && (
                                  <span key={input._id}>
                                    ( {input.nickName} ) {input.firstName}{" "}
                                    {input.lastName}
                                  </span>
                                )
                            )}
                          </span>
                        ) : (
                          <span>
                            {request.staff == "none" ? (
                              <span className="text-sm text-black/40"> -</span>
                            ) : (
                              <span className="text-sm text-black/40">-</span>
                            )}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-end content-center sm:justify-center px-5 mt-[-24px] pb-4 sm:pt-8">
              <div>
                <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
              </div>
              <FormModal
                open={open}
                handleClose={handleClose}
                request={request}
              />
              <div>
                <BtnAccept
                  text="ยืนยัน"
                  onClick={() =>
                    Swal.fire({
                      title: "ยืนยันรับคำขอนี้?",
                      text: "ยืนยันรับคำขอแล้วเพิ่มลงในนัดหมาย",
                      icon: "success",
                      showCancelButton: true,
                      confirmButtonText: "ยอบรับ",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        acceptRequest(request._id, request.status).then(() =>
                          Swal.fire({
                            title: "ยืนยันรับคำขอแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ยกเลิก",
                          showConfirmButton: false,
                          icon: "error",
                          timer: 1000,
                        });
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default RequestListCard;
