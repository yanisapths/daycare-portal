import React, { useState, useEffect } from "react";
import Router from "next/router";
import BtnDetails from "../BtnDetails";
import FormModal from "../../pages/request/FormModal";
import AppointmentModal from "../OLModal/AppointmentModal";
import Overlay from "../OLLayout/Overlay";
import BtnCancel from "../BtnCancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
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
    const res = await fetch(eventUrl);
    const patientRes = await fetch(patienturl);
    const appointments = await fetch(appointmenturl);

    const eventList = await res.json();
    const p = await patientRes.json();
    const appointment = await appointments.json();

    if (isSubscribed) {
      setEvent(eventList);
      setPatient(p);
      setAppointment(appointment);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    fetchData();
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

  return (
    <>
      {d.status == "Approved" && data.status != "Done"  && appointment.status != "Rejected" ? (
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
                        <div className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-center text-xs w-fit h-fit px-4 py-1.5">
                          {d.status}
                        </div>
                    </div>

                    <div className="col-start-1 col-end-7 font-semibold pb-2">
                      <span className="text-base md:text-lg xxl:text-2xl xxxl:text-3xl">
                        คุณ{" "}
                      </span>
                      <div className="inline-block text-base sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                        {" "}
                        {appointment.firstName ? (
                          <p>
                            ( {appointment.nickName} ) {appointment.firstName} {appointment.lastName}
                          </p>
                        ) : (
                          <>
                            {d.patient_id ? (
                              <>
                                ( {p.nickName} ) {p.firstName} {p.lastName}
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        )}
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
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-2 md:justify-end xl:justify-end content-center mx-5 justify-center sm:my-3 md:pb-5 xl:pb-5">
              <div>
                <BtnCancel text="ยกเลิก" onClick={handleClickOpen} />
                <FormModal open={open} handleClose={handleClose} request={d} />
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
