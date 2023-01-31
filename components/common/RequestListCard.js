import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BtnCancel from "../BtnCancel";
import BtnAccept from "../BtnAccept";
import FormModal from "../../pages/request/FormModal";
import RequestModal from "../OLModal/RequestModal";
import Overlay from "../OLLayout/Overlay";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { motion } from "framer-motion";

function RequestListCard({ data, request }) {
  const [course, setCourse] = useState({});
  const [p, setPatient] = useState({});
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
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
    const courseData = await fetch(
      `${process.env.dev}/course/${request.course_id}`
    );

    const course = await courseData.json();
    if (isSubscribed) {
      setCourse(course);
      console.log(course);
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
        data.map((r) => {
          const patienturl = `${process.env.dev}/patient/${r.patient_id}`;
          if (r.patient_id) {
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
    const courseurl = `${process.env.dev}/course/${request.course_id}`;
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
         <div className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-3">
        <motion.div
          key={request._id}
          layoutId={request._id}
          onClick={() => setSelectedId(request._id)}
           className="cursor-pointer"
          
        >
          <div className="flex flex-row gap-3 justify-start content-center text-sm pt-4 px-12">
            <div className="basis-12/12">
              <div className="grid grid-col-6 gap-1 mt-4">
                <div className="col-start-1 col-end-7 lg:flex">
                  <div className="w-fit h-fit pb-2">
                    <p className="text-xs text-black/40 truncate">
                    วันที่ขอ <span>{new Date(request.createdAt).toUTCString()}</span>
                    </p>
                  </div>
                </div>

                <div className="col-start-1 col-end-7 font-semibold pb-2">
                  <span className="text-base md:text-lg xxl:text-2xl xxxl:text-3xl">
                    คุณ{" "}
                  </span>
                  <div className="inline-block text-base sm:text-lg md:text-lg xxl:text-2xl xxxl:text-3xl">
                    {" "}
                    <p>
                      ( {request.nickName} ) {request.firstName}{" "}
                      {request.lastName}
                    </p>
                  </div>
                </div>
                <div className="col-start-1 col-span-6">
                  <span className="xxl:text-lg xxxl:text-xl sm:hidden">
                    วัน:
                  </span>
                  <span className="text-[#969696] lg:hidden md:hidden">
                    <CalendarMonthIcon />
                  </span>
                  <span className="mx-2 font-semibold xxl:text-lg xxxl:text-xl">
                      {new Date(request.appointmentDate).toLocaleDateString(
                        "th-TH",
                        {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                </div>
                <div className="col-start-1 col-span-6">
                  <span className="xxl:text-lg xxxl:text-xl sm:hidden">
                    เวลา:
                  </span>
                  <span className="text-[#969696] lg:hidden md:hidden">
                    <AccessTimeIcon />
                  </span>
                  {request.endTime ? (
                    <span className="mx-2 font-semibold xxl:text-lg  xxxl:text-xl">
                      <span className="">
                        {new Date(request.appointmentTime).toLocaleTimeString(
                          "th-TH",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          }
                        )}{" "}
                        {"-"}{" "}
                        {new Date(request.endTime).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </span>
                    </span>
                  ) : (
                    <span className="mx-2 font-semibold xxl:text-lg xxxl:text-xl">
                      {new Date(request.appointmentTime).toLocaleTimeString(
                        "th-TH",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
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
                  <span className="font-semibold mx-2 xxl:mx-4 xxl:text-lg xxxl:text-xl">
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
                  <span className="font-semibold mx-2 xxl:mx-4 xxl:text-lg xxxl:text-xl">
                  {request.staff ? request.staff : <span className="text-sm text-black/40">ไม่ได้กรอก</span>} 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          <div className="flex flex-wrap basis-1/5 gap-2 justify-end content-center mx-5 sm:justify-center my-3  pb-5 px-5">
            <div>
              <BtnAccept
                text="ยอมรับ"
                onClick={() =>
                  Swal.fire({
                    title: "รับคำขอนี้?",
                    text: "รับคำขอแล้วเพิ่มลงในนัดหมาย",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "ยอบรับ",
                    cancelButtonText: "ยกเลิก",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      acceptRequest(request._id, request.status).then(() =>
                        Swal.fire({
                          title: "รับคำขอแล้ว",
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
            <div>
              <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
            </div>
            <FormModal
              open={open}
              handleClose={handleClose}
              request={request}
            />
          </div>
         </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default RequestListCard;
