import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CircleIcon from "../../components/OLIcon/CircleIcon";
import StatusCheckIcon from "../../components/OLIcon/StatusCheckIcon";
import CircleIconButton from "../../components/OLButton/CircleIconButton";
import SimpleChip from "../OLButton/SimpleChip";
import FormModal from "../../pages/request/FormModal";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControl from "@mui/material/FormControl";
import ReactDatePicker from "react-datepicker";
import CheckIcon from "@mui/icons-material/Check";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentModal({
  clinic,
  user,
  eventList,
  patient,
  data,
  selectedId,
  setSelectedId,
  close,
  course,
  index,
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
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
  useEffect(() => {
    {
      eventList.map((e, index) => {
        e.status == "Done" ? Finalized(e.appointment_id) : "";
      });
    }
  }, []);
  async function Finalized(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = await fetch(
      `${process.env.dev}/appointment/accept/${appointmentId}`,
      option
    )
      .then(async (res) => {})
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  const onSubmit = async (req) => {
    console.log(req);

    req.status = "Approved";
    req.owner_id = user.id;
    req.course_id = course._id;
    req.patient_id = patient._id;
    req.clinic_id = data.clinic_id;
    const url = `${process.env.dev}/event/create/${data._id}`;
    const json = JSON.stringify(req);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(url, json, axiosConfig)
      .then(async (res) => {
        toast.success("กำลังเพิ่มนัด...🛠️🚧");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };

  async function finishTask(eid) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = await fetch(`${process.env.dev}/event/update/${eid}`, option)
      .then(async (res) => {
        toast.success("สำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }
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

  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto p-12 py-6 relative shadow-lg shadow-black/5 rounded-3xl w-[900px] overflow-y-scroll 
        h-[600px] scrollbar-hide"
        layoutId={selectedId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center xl:gap-60 gap-24">
          <motion.h6
            className="h6 pt-4 text-black/50"
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            ตารางนัด
          </motion.h6>
          <motion.div
            className=""
            onClick={() => setSelectedId(null)}
            animate={{ y: -8 }}
            transition={{
              duration: "0.3",
            }}
          >
            <IconButton>
              <CloseIcon className="w-10 h-10" />
            </IconButton>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: -10 }}
          transition={{
            duration: "0.6",
          }}
        >
          <div className="pt-4 text-[#121212]">
            {data.patient_id ? (
              <div className="h6 space-y-4 font-medium">
                <motion.h6>
                  <span className="h4">
                    ( {patient.nickName} ) {patient.firstName}{" "}
                    {patient.lastName}
                  </span>
                </motion.h6>
                <motion.h6 className="grid grid-cols-3 sm:grid-cols-2 xl:h6 md:h6 caption">
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<PersonIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold ">
                      อายุ{" "}
                    </span>
                    {patient.age ? (
                      patient.age
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {patient.sex ? (
                      patient.sex
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2  text-base sm:pt-4">
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold sm:hidden md:visible lg:visible xl:visible">
                      ข้อควรระวัง{" "}
                    </span>
                    {patient.precaution ? (
                      <span className="text-[#FF2F3B]">
                        {" "}
                        {patient.precaution}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="grid grid-cols-3 sm:grid-cols-1 sm:gap-2 xl:h6 md:h6 caption text-base">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {patient.phoneNumber ? (
                      patient.phoneNumber
                    ) : (
                      <span className="text-sm text-black/40"> -</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold sm:hidden md:visible lg:visible xl:visible">
                      LINE ID{" "}
                    </span>
                    {patient.lineId ? (
                      patient.lineId
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
                <motion.h6>
                  <div className="flex items-start align-start gap-2 xl:h6 md:h6 caption text-base">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold sm:w-20">
                      ที่อยู่{" "}
                    </span>
                    {patient.address ? (
                      patient.address
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
              </div>
            ) : (
              <div className="h6 space-y-4 font-medium">
                <motion.h6>
                  <span className="h4">
                    ( {data.nickName} ) {data.firstName} {data.lastName}
                  </span>
                </motion.h6>
                <motion.h6 className="grid grid-cols-3 sm:grid-cols-2 xl:h6 md:h6 caption">
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<PersonIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      อายุ{" "}
                    </span>
                    {data.age ? (
                      data.age
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {data.sex ? (
                      data.sex
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-base sm:pt-4">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold xl:w-20">
                      ข้อควรระวัง
                    </span>
                    {data.description ? (
                      <span className="text-[#FF2F3B]  flex items-start justify-start ">
                        {" "}
                        {data.description}
                      </span>
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="grid grid-cols-3 sm:grid-cols-1 xl:h6 md:h6 caption  text-base">
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {data.phoneNumber ? (
                      data.phoneNumber
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2 text-base">
                    {" "}
                    <CircleIcon icon={<ChatBubbleIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      LINE ID{" "}
                    </span>
                    {data.lineId ? (
                      data.lineId
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
                <motion.h6>
                  <div className="flex items-start align-start gap-2 xl:h6 md:h6 caption text-base">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ที่อยู่{" "}
                    </span>
                    {data.location ? (
                      data.location
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                </motion.h6>
              </div>
            )}
            <div className="pt-4 h6">
              <div className="flex items-center align-middle gap-2 text-base">
                {" "}
                <CircleIcon icon={<MeetingRoomIcon className="text-sm" />} />
                <span className="body2 text-[#A17851] font-bold">
                  สถานที่นัด{" "}
                </span>
                {data.appointmentPlace}
              </div>
            </div>
          </div>
          <div className="p-2">
            <Link href="/course">
              <div className="flex justify-center gap-2 cursor-pointer">
                <Tooltip placement="top" title="ดูข้อมูล">
                  <motion.h3 className="h4 text-center">
                    {course.courseName}
                  </motion.h3>
                </Tooltip>
                <div className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-center text-xs w-fit h-fit px-4 py-1.5">
                  {course.type}
                </div>
              </div>
            </Link>
            <motion.div className=" flex justify-center pt-2 gap-2 ">
              <div className="grid grid-cols-3 w-fit sm:grid-cols-2 sm:gap-2 ">
                <div className=" flex justify-center">
                  <SimpleChip
                    prefix="จำนวน"
                    text={course.amount}
                    quantify="ครั้ง"
                  />
                </div>
                <div className=" flex justify-center">
                  <SimpleChip
                    prefix="ราคา"
                    text={course.totalPrice}
                    quantify="บาท"
                  />
                </div>
                <div className=" flex justify-center sm:col-span-2">
                  <SimpleChip
                    prefix="ครั้งละ"
                    text={course.duration}
                    quantify="ชั่วโมง"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center text-black/60 align-middle gap-2 py-2">
            <Tooltip placement="top" title="Click To Copy">
              <Button
                sx={{ borderRadius: 16, px: 2 }}
                endIcon={<ContentCopyIcon size="small" />}
                onClick={() => {
                  navigator.clipboard.writeText(data._id);
                }}
              >
                <p className="text-xs">No. {data._id}</p>
              </Button>
            </Tooltip>
          </div>
          <section className="mb-2 pt-2 text-black/50 border-black/20 border-b-[1px] border-dashed  ">
            <div className="text-[#121212] grid grid-cols-4 text-center items-center mb-2 caption w-full gap-2">
              <div className="">
                <p>ครั้งที่</p>
              </div>
              <div className="">
                <p>วันนัด</p>
              </div>
              <div className="">
                <p>เวลานัด</p>
              </div>
              <div className="">
                <p>สถานะ</p>
              </div>
              <div>
                <p></p>
              </div>
            </div>
          </section>
          <div className="text-[#121212] grid grid-cols-4 text-center items-center mb-2 caption w-full gap-2">
            <div className=" text-lg md:text-base sm:text-xs ">
              <p className="flex justify-center">1</p>
            </div>
            <div className=" text-lg md:text-[20px] sm:text-xs flex justify-center items-center">
              <p className="md:hidden sm:hidden">
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="lg:hidden xl:hidden xxl:hidden">
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-lg sm:text-xs text-center">
              <p className="text-center">
                {new Date(data.appointmentTime).toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {data.endTime ? (
                  <>
                    {" - "}
                    {new Date(data.endTime).toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </>
                ) : (
                  <></>
                )}
              </p>
            </div>
            {data.progressStatus == "Done" && (
              <div className="flex justify-center items-center">
                <span className=" text-[#2ED477]/80 md:hidden lg:hidden xl:hidden xxl:hidden sm:text-xs flex justify-center">
                  {data.progressStatus ? data.progressStatus : data.status}
                </span>
                <div className="sm:hidden flex justify-center items-center">
                  <StatusCheckIcon
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                    text={
                      data.progressStatus ? data.progressStatus : data.status
                    }
                    bgColor={
                      data.progressStatus == "Done"
                        ? "#E0B186"
                        : data.status == "reviewed"
                        ? "#7879F1"
                        : data.status == "Rejected"
                        ? "#FF2F3B"
                        : "#2ED477"
                    }
                    textColor={
                      data.progressStatus == "Done"
                        ? "#E0B186"
                        : data.status == "reviewed"
                        ? "#7879F1"
                        : data.status == "Rejected"
                        ? "#FF2F3B"
                        : "#2ED477"
                    }
                  />
                </div>
              </div>
            )}
            {data.status == "Rejected" && (
              <div className="flex justify-center items-center">
                <span className=" text-[#2ED477]/80 md:hidden lg:hidden xl:hidden xxl:hidden sm:text-xs flex justify-center">
                  {data.progressStatus ? data.progressStatus : data.status}
                </span>
                <div className="sm:hidden flex justify-center items-center">
                  <StatusCheckIcon
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                    text={
                      data.progressStatus ? data.progressStatus : data.status
                    }
                    bgColor={
                      data.progressStatus == "Done"
                        ? "#E0B186"
                        : data.status == "reviewed"
                        ? "#7879F1"
                        : data.status == "Rejected"
                        ? "#FF2F3B"
                        : "#2ED477"
                    }
                    textColor={
                      data.progressStatus == "Done"
                        ? "#E0B186"
                        : data.status == "reviewed"
                        ? "#7879F1"
                        : data.status == "Rejected"
                        ? "#FF2F3B"
                        : "#2ED477"
                    }
                  />
                </div>
              </div>
            )}
            {data.progressStatus != "Done" &&
              data.status != "Rejected" &&
              data.status != "reviewed" &&
              data.status != "Done" && (
                <div className="flex  gap-2  justify-center">
                  <Tooltip title="เสร็จสิ้นการนัดครั้งนี้" placement="top">
                    <div className="border-[1px]  rounded-full w-fit h-fit hover:bg-[#0921FF]/20 border-[#0921FF]">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        className="text-[#0921FF]"
                        onClick={() =>
                          Swal.fire({
                            title: "เสร็จสิ้นนัดครั้งนี้?",
                            text: "ไม่สามารถย้อนกลับได้",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "ใช่ เสร็จสิ้น!",
                            cancelButtonText: "ยกเลิก",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              markAsDone(data._id).then(() =>
                                Swal.fire({
                                  title: "นัดครั้งนี้เสร็จสิ้นแล้ว",
                                  showConfirmButton: false,
                                  icon: "success",
                                  timer: 1000,
                                })
                              );
                            } else if (
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              Swal.fire({
                                title: "ยกเลิก)",
                                showConfirmButton: false,
                                icon: "error",
                                timer: 1000,
                              });
                            }
                          })
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                  <Tooltip title="ยกเลิกการนัดครั้งนี้" placement="top">
                    <div className="border-[1px]  rounded-full w-fit h-fit hover:bg-[#FF2F3B]/20 border-[#FF2F3B]">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        className="text-[#FF2F3B]"
                        onClick={handleClickOpen}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                  <FormModal
                    open={open}
                    handleClose={handleClose}
                    request={data}
                  />
                </div>
              )}
          </div>
          {data.status != "Rejected" &&
            eventList.map((event, index) => {
              return (
                <div
                  className="text-[#121212] grid grid-cols-4 text-center items-center text-lg mb-2 caption w-full gap-2"
                  key={index}
                >
                  <div className="flex justify-center sm:text-xs pt-0.5">
                    <p>{index + 2}</p>
                  </div>
                  <div className="sm:text-xs flex justify-center items-center ">
                    {event.date ? (
                      <>
                        <p className="md:hidden sm:hidden">
                          {new Date(event.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="lg:hidden xl:hidden xxl:hidden">
                          {new Date(event.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-center items-center sm:text-xs">
                    {event.startTime ? (
                      <p>
                        {new Date(event.startTime).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {event.endTime ? (
                          <>
                            {" - "}
                            {new Date(event.endTime).toLocaleTimeString(
                              "th-TH",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  {event.status == "Done" && (
                    <div className="items-center">
                      <p className=" text-[#2ED477]/80 md:hidden xl:hidden lg:hidden sm:text-xs">
                        {event.status}
                      </p>
                      <div className="flex justify-center items-center">
                        <div className="sm:hidden flex justify-center items-center">
                          <StatusCheckIcon
                            icon={<CheckCircleIcon className="w-5 h-5" />}
                            text={event.status}
                            bgColor={
                              event.status == "Done" ? "#E0B186" : "#2ED477"
                            }
                            textColor={
                              event.status == "Done" ? "#E0B186" : "#2ED477"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {event.status != "Done" && (
                    <div className="flex  gap-2 justify-center ">
                      <Tooltip title="เสร็จสิ้นการนัดครั้งนี้" placement="top">
                        <div className="border-[1px]  rounded-full w-fit h-fit hover:bg-[#0921FF]/20 border-[#0921FF]">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            className="text-[#0921FF]"
                            onClick={() =>
                              Swal.fire({
                                title: "เสร็จสิ้นการนัดครั้งนี้?",
                                text: "ไม่สามารถย้อนกลับได้",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "ใช่ เสร็จสิ้น!",
                                cancelButtonText: "ยกเลิก",
                                reverseButtons: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  finishTask(event._id).then(() =>
                                    Swal.fire({
                                      title: "นัดครั้งนี้เสร็จสิ้นแล้ว",
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
                                    timer: 1000,
                                  });
                                }
                              })
                            }
                          >
                            <CheckIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Tooltip title="ยกเลิกการนัดครั้งนี้" placement="top">
                        <div className="border-[1px]  rounded-full w-fit h-fit hover:bg-[#FF2F3B]/20 border-[#FF2F3B]">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            className="text-[#FF2F3B]"
                            onClick={() =>
                              Swal.fire({
                                title: "ยกเลิกบริการนัดครั้งนี้?",
                                text: "หากยกเลิกแล้วจะไม่สามารถย้อนกลับได้",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "ใช่ ลบเลย!",
                                cancelButtonText: "ยกเลิก",
                                reverseButtons: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteEvent(event._id).then(() =>
                                    Swal.fire({
                                      title: "ยกเลิกแล้ว",
                                      showConfirmButton: false,
                                      icon: "success",
                                      timer: 1000,
                                    })
                                  );
                                } else if (
                                  result.dismiss === Swal.DismissReason.cancel
                                ) {
                                  Swal.fire({
                                    title: "ไม่ได้ยกเลิกนัด :)",
                                    showConfirmButton: false,
                                    icon: "error",
                                    timer: 1000,
                                  });
                                }
                              })
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </div>
                  )}
                </div>
              );
            })}
          {fields.map((item, index) => (
            <form
              className="text-[#121212] grid grid-cols-4 items-center text-center text-lg  w-full  gap-2"
              key={index}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-center sm:text-sm">
                <p>{eventList.length + index + 2}</p>
              </div>
              <div className="flex justify-center">
                <FormControl required>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <ReactDatePicker
                        className="inputOutline sm:text-xs  text-center"
                        onChange={onChange}
                        selected={value}
                        placeholderText="วัน"
                        error={Boolean(errors?.date)}
                        helperText="กรุณาเลือกวัน"
                      />
                    )}
                  />
                  {errors.date?.type === "required" && (
                    <p role="alert" className="caption text-[#FF2F3B]">
                      กรุณาเลือกวัน
                    </p>
                  )}
                </FormControl>
              </div>
              <div className="flex justify-center sm:flex-col gap-1 ">
                <FormControl>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="startTime"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        className="inputOutline sm:text-[9px] md:placeholder:text-[12px] text-center"
                        selected={value}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="เวลาเริ่ม"
                        error={Boolean(errors?.startTime)}
                        helperText="กรุณาเลือกเวลา"
                      />
                    )}
                  />
                  {errors.startTime?.type === "required" && (
                    <p role="alert" className="caption text-[#FF2F3B]">
                      กรุณาเลือกเวลา
                    </p>
                  )}
                </FormControl>
                <FormControl>
                  <Controller
                    rules={{ required: false }}
                    control={control}
                    name="endTime"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        className="inputOutline sm:text-[9px] md:placeholder:text-[12px] text-center "
                        selected={value}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="เสร็จสิ้น"
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="body2 w-fit h-fit px-6 p-1.5 rounded-full border-2 border-[#AD8259]/60 bg-[#AD8259] text-white hover:bg-[#AD8259]/20 hover:text-[#AD8259]
                  sm:text-sm sm:px-5 sm:p-1 md:text-sm lg:text-sm"
                >
                  เพิ่ม
                </button>
              </div>
            </form>
          ))}
        </motion.div>
        {eventList.length == course.amount - 1 ? (
          data.status != "Rejected" ? (
            <motion.div className="text-center pt-4">
              <p className="caption md:h6 xl:h6 pb-2 text-black/50">
                ไม่สามารถเพิ่มนัดได้เนื่องจากครบจำนวนนัดแล้ว
              </p>
            </motion.div>
          ) : (
            <motion.div className="text-center pt-4"></motion.div>
          )
        ) : data.status == "Rejected" ? (
          " "
        ) : (
          <motion.div className="flex justify-center pt-4 pb-10">
            {data.status != "reviewed" && data.status != "Rejected" && (
              <CircleIconButton
                handleClick={() =>
                  append({
                    date: "",
                    startTime: "",
                    endTime: "",
                    status: "Approved",
                    owner_id: user.id,
                    patient_id: patient._id,
                    course_id: course._id,
                    clinic_id: data.clinic_id,
                  })
                }
                icon={<AddCircleOutlineIcon />}
                text="เพิ่มนัดครั้งต่อไป"
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default AppointmentModal;
