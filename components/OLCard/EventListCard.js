import React, { useState, useEffect } from "react";
import Router from "next/router";
import BtnDetails from "../BtnDetails";
import FormModal from "../../pages/request/FormModal";
import BtnCancel from "../BtnCancel";
import RoundTextIcon from "../OLIcon/RoundTextIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function EventListCard({ data, d, index, user }) {
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [course, setCourse] = useState({});
  const [eventList, setEvent] = useState([]);
  const [appointment, setAppointment] = useState([]);
  console.log(course.totalPrice);
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
  async function deleteEvent(eid) {
    const res = await fetch(`${process.env.dev}/event/delete/${eid}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        toast.success("ยกเลิกนัดแล้ว");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สามารถยกเลิกนัดได้");
      });
  }
  async function finishTask(eid) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = await fetch(`${process.env.dev}/event/update/${eid}`, option)
      .then(async (res) => {
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
    const appointmenturl = `${process.env.dev}/appointment/${d.appointment_id}`;
    const courseurl = `${process.env.dev}/course/${d.course_id}`;

    const res = await fetch(eventUrl);
    const patientRes = await fetch(patienturl);
    const appointments = await fetch(appointmenturl);
    const courses = await fetch(courseurl);

    const eventList = await res.json();
    const p = await patientRes.json();
    const appointment = await appointments.json();
    const course = await courses.json();

    if (isSubscribed) {
      setEvent(eventList);
      setPatient(p);
      setAppointment(appointment);
      setCourse(course);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {d.status == "Approved" &&
      data.status != "Done" &&
      appointment.status != "Rejected" ? (
        <>
          <article
            key={d._id}
            className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-3 px-4 md:pl-12 xl:pl-12"
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
                    <div className="col-start-1 col-end-7 lg:flex gap-4 items-center">
                      <div className="w-fit h-fit pb-2">
                        <p className="text-xs text-black/40 truncate">
                          No. <span>{d._id}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 sm:gap-12">
                      <div className="font-semibold pb-2 text-base xl:text-lg sm:w-4/6 sm:truncate">
                        <span className="text-base">คุณ </span>
                        {appointment.firstName ? (
                          <span>
                            ( {appointment.nickName} ) {appointment.firstName}{" "}
                            {appointment.lastName}
                          </span>
                        ) : (
                          <span>
                            {appointment.patient_id ? (
                              <>
                                ( {p.nickName} ) {p.firstName} {p.lastName}
                              </>
                            ) : (
                              ""
                            )}
                          </span>
                        )}
                      </div>
                      <div className="sm:w-full">
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
                            {new Date(d.startTime).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
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
                        {appointment.appointmentPlace}
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
                        {appointment.staff ? (
                          appointment.staff
                        ) : (
                          <span className="text-sm text-black/40">-</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-2 md:justify-end xl:justify-end content-center mx-5 justify-center sm:my-3 md:pb-5 xl:pb-5">
              <div>
                <BtnCancel
                  text="ยกเลิก"
                  onClick={() =>
                    Swal.fire({
                      title: "ยกเลิกนัดนี้?",
                      text: "หากยกเลิกแล้วจะไม่สามารถย้อนกลับได้",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "ใช่ ลบเลย!",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteEvent(d._id).then(() =>
                          Swal.fire({
                            title: "ยกเลิกแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ไม่ได้ยกเลิกนัด :)",
                          showConfirmButton: false,
                          icon: "error",
                          timer: 1000,
                        });
                      }
                    })
                  }
                />
              </div>
              <BtnDetails
                text="เสร็จสิ้น"
                onClick={() =>
                  Swal.fire({
                    title: "เสร็จสิ้นการให้บริการ?",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "ใช่",
                    cancelButtonText: "ยกเลิก",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      finishTask(d._id).then(() =>
                        Swal.fire({
                          title: "ให้บริการเสร็จสิ้นแล้ว",
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
                        timer: 800,
                      });
                    }
                  })
                }
              />
            </div>
          </article>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EventListCard;
