import React, { useState, useEffect } from "react";
import Router from "next/router";
import BtnDetails from "../BtnDetails";
import Overlay from "../OLLayout/Overlay";
import AppointmentModal from "../OLModal/AppointmentModal";
import BtnCancel from "../BtnCancel";
import RoundTextIcon from "../OLIcon/RoundTextIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function EventListCard({ clinic,data, d, index, user, staffs }) {
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [course, setCourse] = useState({});
  const [eventList, setEvent] = useState([]);
  const [appointment, setAppointment] = useState({});
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
    const res = await fetch(`${process.env.url}/event/delete/${eid}`, {
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
    const res = await fetch(`${process.env.url}/event/update/${eid}`, option) 
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
    const eventUrl = `${process.env.url}/event/match/${d.appointment_id}`;
    const patienturl = `${process.env.url}/patient/${d.patient_id}`;
    const appointmenturl = `${process.env.url}/appointment/${d.appointment_id}`;
    const courseurl = `${process.env.url}/course/${d.course_id}`;

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
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <>
      {selectedId && (
        <Overlay close={handleClose}>
          <AppointmentModal
            eventList={eventList}
            user={user}
            data={appointment}
            patient={p}
            setSelectedId={setSelectedId}
            course={course}
            close={handleClose}
            clinic={clinic}
          ></AppointmentModal>
        </Overlay>
      )}
      {d.status == "Approved" &&
      d.status != "Done" &&
      data.status != "Done" &&
      appointment.status != "Rejected" ? (
        <>
          <article
            key={d._id}
            className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white px-4 lg:pl-10 md:pl-10 xl:pl-10"
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
                    <div className="flex gap-4 sm:gap-12 sm:col-start-1 sm:col-span-6">
                      <div className="font-semibold pb-2 text-base xl:text-lg  sm:truncate">
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
                    </div>
                    <div className="sm:w-full sm:col-start-1 sm:pb-1">
                        <RoundTextIcon
                          icon={<BookmarksIcon className="w-5 h-5" />}
                          text={course.courseName}
                        />
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
                          <span>
                            {staffs.map(
                              (input) =>
                                input._id == appointment.staff &&
                                appointment.staff != "none" && (
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
            <div className="flex  justify-end content-center mx-2  sm:mb-4 sm:mx-0  sm:justify-center lg:pb-2 md:pb-3 xl:pb-3">
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
              <div>
              <button
                className="w-40  text-sm h-9 rounded-full bg-[#AD8259]/20 text-[#6C5137] hover:bg-[#AD8259] hover:text-white hover:shadow-xl"
                
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
                }>
                  เสร็จสิ้นบริการนัดครั้งนี้
                </button>
              </div>
              
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
