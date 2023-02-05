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

function AppointmentListCard({ data, d, index }) {
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [course, setCourse] = useState({});

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

  async function finishTask(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = await fetch(
      `${process.env.dev}/appointment/accept/${appointmentId}`,
      option
    )
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }
  useEffect(() => {
    {
      data &&
        data.map((d) => {
          const patienturl = `${process.env.dev}/patient/${d.patient_id}`;
          if (d.patient_id) {
            fetch(patienturl, {
              method: "GET",
            })
              .then(async (res) => {
                const p = await res.json();
                setPatient(p);
              })
              .catch((err) => console.log(err));
          }
        });
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

  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <AppointmentModal
            data={d}
            patient={p}
            setSelectedId={setSelectedId}
            close={closeModal}
            course={course}
          ></AppointmentModal>
        </Overlay>
      )}

      {d.status == "Approved" && data.status != "Done" ? (
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
                    <div className="col-start-1 col-end-7 lg:flex">
                      <div className="w-fit h-fit pb-2">
                        <p className="text-xs text-black/40 truncate">
                          No. <span>{d._id}</span>
                        </p>
                      </div>
                    </div>

                    <div className="col-start-1 col-end-7 font-semibold pb-2">
                      <span className="text-base md:text-lg xxl:text-2xl xxxl:text-3xl">
                        คุณ{" "}
                      </span>
                      <div className="inline-block text-base sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                        {" "}
                        {d.firstName ? (
                          <p>
                            ( {d.nickName} ) {d.firstName} {d.lastName}
                          </p>
                        ) : (
                          <>
                            {d.patient_id && p.firstName ? (
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
                          d.staff
                        ) : (
                          <span className="text-sm text-black/40">
                            ไม่ได้กรอก
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-2 md:justify-end xl:justify-end content-center mx-5 justify-center sm:my-3 md:pb-5 xl:pb-5">
              <div>
                <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
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

export default AppointmentListCard;
