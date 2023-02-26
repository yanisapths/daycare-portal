import React, { useState, useEffect } from "react";
import Router from "next/router";
import BtnDetails from "../BtnDetails";
import FormModal from "../../pages/request/FormModal";
import AppointmentModal from "../OLModal/AppointmentModal";
import Overlay from "../OLLayout/Overlay";
import BtnCancel from "../BtnCancel";
import RoundTextIcon from "../OLIcon/RoundTextIcon";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function AppointmentListCard({ clinic,data, d, index, user, staffs }) {
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [course, setCourse] = useState({});
  const [eventList, setEvent] = useState([]);
  const left = (eventList.length + 1) % course.amount;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  async function markAsDone(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progressStatus: "Done" }),
    };
    const res = await fetch(
      `${process.env.dev}/appointment/markdone/${appointmentId}`,
      option
    )
      .then(async (res) => {
        toast.success("สำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }
  const fetchData = async () => {
    let isSubscribed = true;
    const eventUrl = `${process.env.dev}/event/match/${d._id}`;
    const patienturl = `${process.env.dev}/patient/${d.patient_id}`;
    const courseurl = `${process.env.dev}/course/${d.course_id}`;

    const res = await fetch(eventUrl);
    const patientRes = await fetch(patienturl);
    const courses = await fetch(courseurl);

    const eventList = await res.json();
    const p = await patientRes.json();
    const course = await courses.json();

    if (isSubscribed) {
      setEvent(eventList);
      setPatient(p);
      setCourse(course);
    }

    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData();
    {
      eventList.map((e) => {
        e.status == "Done" &&
          d.status == "Approved" &&
          d.progressStatus == "Done" &&
          left == 0 && (Finalized(e.appointment_id));
      });
    }
    {
      d.status == "Approved" &&
        d.progressStatus == "Done" &&
        left == 0 && (Finalized(d._id));
    }
  }, []);

  useEffect(() => {
    const courseurl = `${process.env.dev}/course/${d.course_id}`;
    fetch(courseurl, {
      method: "GET",
    })
      .then(async (res) => {
        const course = await res.json();
        setCourse(course);
      })
      .catch((err) => console.log(err));
  }, []);

  function Finalized(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = fetch(
      `${process.env.dev}/appointment/accept/${appointmentId}`,
      option
    )
      .then((res) => {})
      .catch((err) => {
        console.log("ERROR: ", err);
      });
    }

  return (
    <>
      {selectedId && (
        <Overlay close={handleClose}>
          <AppointmentModal
            eventList={eventList}
            user={user}
            data={d}
            patient={p}
            setSelectedId={setSelectedId}
            course={course}
            close={handleClose}
            clinic={clinic}
          ></AppointmentModal>
        </Overlay>
      )}
      {d.status == "Approved" && d.status != "Done" && d.progressStatus != "Done" ? (
        <>
          <article
            key={d._id}
            className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-3 px-4 lg:pl-10 md:pl-10 xl:pl-10 "
          >
            <motion.div
              key={d._id}
              layoutId={d._id}
              onClick={() => setSelectedId(d._id)}
              className="cursor-pointer"
            >
              <div className="flex flex-row gap-3 justify-start content-center text-sm pt-4">
                <div className="basis-12/12">
                  <div className="grid grid-col-6 gap-1 mt-4">
                    <div className="col-start-1 col-end-7 lg:flex gap-4 items-center ">
                      <div className="w-fit h-fit pb-2">
                        <p className="text-xs text-black/40 truncate">
                          No. <span>{d._id}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 sm:gap-12 sm:col-start-1 sm:col-span-6">
                      <div className="font-semibold pb-2 text-base xl:text-lg sm:truncate">
                        <span className="text-base">คุณ </span>
                        {d.firstName ? (
                          <span>
                            ( {d.nickName} ) {d.firstName} {d.lastName}
                          </span>
                        ) : (
                          <span>
                            {d.patient_id && p.firstName ? (
                              <>
                                ( {p.nickName} ) {p.firstName} {p.lastName}
                              </>
                            ) : (
                              ""
                            )}
                          </span>
                        )}
                      </div>
                      <div className="sm:w-full sm:col-start-1 sm:pb-1">
                        <RoundTextIcon
                          icon={<BookmarksIcon className="w-5 h-5" />}
                          text={course.courseName}
                        />
                      </div>
                    </div>
                    <div className="col-start-1 col-span-6">
                      <span className="text-[#969696]">
                        <AccessTimeIcon />
                      </span>
                      {d.endTime ? (
                        <span className="mx-2 text-[#969696] text-lg">
                          <span className="">
                            {new Date(d.appointmentTime).toLocaleTimeString(
                              "th-TH",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}{" "}
                            {"-"}{" "}
                            {new Date(d.endTime).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </span>
                      ) : (
                        <span className="mx-2 font-semibold text-lg">
                          {new Date(d.appointmentTime).toLocaleTimeString(
                            "th-TH",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <div className="col-start-1 col-span-3">
                      <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                        สถานที่นัด:
                      </span>
                      <span className="text-[#969696] lg:hidden md:hidden ">
                        <HomeIcon />
                      </span>
                      <span className="text-[#969696] mx-2 xxl:mx-4 text-lg">
                        {" "}
                        {d.appointmentPlace}
                      </span>
                    </div>
                    <div className="col-start-1 col-span-3 sm:col-span-8">
                      <span className="sm:hidden xxl:text-lg xxxl:text-xl">
                        พนักงานผู้ดูแล:
                      </span>
                      <span className="text-[#969696] lg:hidden md:hidden ">
                        <PermIdentityIcon />
                      </span>
                      <span className="font-semibold mx-2 xxl:mx-4 xxl:text-lg xxxl:text-xl">
                        {d.staff ? (
                          <span>
                            {staffs.map(
                              (input) =>
                                input._id == d.staff &&
                                d.staff != "none" && (
                                  <span key={input._id}>
                                    ( {input.nickName} ) {input.firstName}{" "}
                                    {input.lastName}
                                  </span>
                                )
                            )}
                          </span>
                        ) : (
                          <span className="text-sm text-black/40">-</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-wrap  justify-end sm:justify-center content-center mx-2  sm:mb-4 sm:mx-0 lg:pb-2 md:pb-3 xl:pb-3">
              {d.progressStatus != "Done" && (
                <>
                  <div>
                    <BtnCancel text="ยกเลิก" onClick={handleClickOpen} />
                    <FormModal
                      open={open}
                      handleClose={handleClose}
                      request={d}
                    />
                  </div>
                  <button
                    className="w-36 text-sm h-9 rounded-full bg-[#AD8259]/20 text-[#6C5137] hover:bg-[#AD8259] hover:text-white hover:shadow-xl"
                    onClick={() =>
                      Swal.fire({
                        title: "เสร็จสิ้นการให้บริการนัดครั้งนี้?",
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "ใช่",
                        cancelButtonText: "ยกเลิก",
                        reverseButtons: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          markAsDone(d._id).then(() =>
                            Swal.fire({
                              title: "ให้บริการนัดครั้งนี้เสร็จสิ้นแล้ว",
                              showConfirmButton: false,
                              icon: "success",
                              timer: 1000,
                            })
                          );
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
                    }>
                      เสร็จสิ้นบริการนัดครั้งนี้
                    </button>
                  
                </>
              )}
            </div>
          </article>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AppointmentListCard;
