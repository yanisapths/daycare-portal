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
import BtnDetails from "../BtnDetails";
import SimpleChip from "../OLButton/SimpleChip";

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
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentModal({
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
  let count = [];
  const event = data.events.length + 1;

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

  for (let i = data.events.length; i < course.amount - 1; i++) {
    count.push((props) => <div>{props.children}</div>);
  }

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
        console.log("RESPONSE RECEIVED: ", res.req);
        toast.success("กำลังเพิ่มนัด...🛠️🚧");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="bg-white mx-2 xl:mx-auto p-12 py-6 relative shadow-lg shadow-black/5 rounded-3xl w-[900px] overflow-y-scroll max-h-[500px] scrollbar-hide"
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
                <motion.h6 className="flex  md:space-x-10 xl:space-x-10 space-x-2 xl:h6 md:h6 caption">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PersonIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      อายุ{" "}
                    </span>
                    {patient.age ? (
                      patient.age
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {patient.sex ? (
                      patient.sex
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle md:gap-2 xl:gap-2">
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold sm:hidden md:visible lg:visible xl:visible">
                      ข้อควรระวัง{" "}
                    </span>
                    {patient.precaution ? (
                      <span className="text-[#FF2F3B]">
                        {patient.precaution}
                      </span>
                    ) : (
                      "-"
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="flex md:space-x-24 xl:space-x-24 space-x-4 xl:h6 md:h6 caption">
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<PhoneIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ติดต่อ{" "}
                    </span>
                    {patient.phoneNumber ? (
                      patient.phoneNumber
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle md:gap-2 xl:gap-2">
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
                  <div className="flex items-center align-middle gap-2 xl:h6 md:h6 caption">
                    {" "}
                    <CircleIcon icon={<LocationOnIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
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
                <motion.h6 className="flex space-x-10">
                  <div className="flex items-center align-middle gap-2">
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
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WcIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">เพศ </span>
                    {data.sex ? (
                      data.sex
                    ) : (
                      <span className="text-sm text-black/40">-</span>
                    )}
                  </div>
                  <div className="flex items-center align-middle gap-2">
                    {" "}
                    <CircleIcon icon={<WarningIcon className="text-sm" />} />
                    <span className="body2 text-[#A17851] font-bold">
                      ข้อควรระวัง{" "}
                    </span>{" "}
                    {data.description ? (
                      <span className="text-[#FF2F3B]">{data.description}</span>
                    ) : (
                      "-"
                    )}
                  </div>
                </motion.h6>
                <motion.h6 className="flex space-x-24">
                  <div className="flex items-center align-middle gap-2">
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
                  <div className="flex items-center align-middle gap-2">
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
                  <div className="flex items-center align-middle gap-2">
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
              <div className="flex items-center align-middle gap-2">
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
            <motion.div className="flex justify-center gap-2 pt-2 px-40 md:px-0 lg:px-0 xl:px-0">
              <SimpleChip
                prefix="จำนวน"
                text={course.amount}
                quantify="ครั้ง"
              />
              <SimpleChip
                prefix="ราคา"
                text={course.totalPrice}
                quantify="บาท"
              />
              <SimpleChip
                prefix="ครั้งละ"
                text={course.duration}
                quantify="ชั่วโมง"
              />
            </motion.div>
          </div>
          <div className="flex justify-center text-black/60 align-middle gap-2">
            <Tooltip placement="top" title="Click To Copy">
              <Button
                sx={{ borderRadius: 16, px: 2 }}
                endIcon={<ContentCopyIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(data._id);
                }}
              >
                appointment number
              </Button>
            </Tooltip>
          </div>
          <section className="mb-2 pt-4 text-black/50 border-black/20 border-b-[1px] border-dashed mx-auto">
            <div className="flex caption lg:body1 tracking-wide xl:px-12 xl:gap-20">
              <div className="w-1/6">
                <p className="">ครั้งที่</p>
              </div>
              <div className="w-2/6">
                <p>วันนัด</p>
              </div>
              <div className="w-2/6">
                <p>เวลานัด</p>
              </div>
              <div className="w-1/6">
                <p>สถานะ</p>
              </div>
              <div className="w-1/6">
                <p></p>
              </div>
            </div>
          </section>
          <div className="text-[#121212] flex xl:text-center p-2 mb-1 caption md:h6 lg:h5 w-full mx-auto gap-5 md:gap-2 lg:gap-2 xl:gap-2">
            <div className="xl:w-1/6 w-1/12">
              <p>1</p>
            </div>
            <div className="xl:w-2/6 w-5/12">
              <p>
                {new Date(data.appointmentDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="xl:w-2/6 w-5/12">
              <p>
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
            <p className="w-1/6 text-[#2ED477]/80 md:invisible lg:invisible xl:invisible lg:w-0 xl:w-0">
              {data.progressStatus ? data.progressStatus : data.status}
            </p>
            <div className="invisible md:visible xl:visible xl:w-1/6 lg:w-1/6 md:w-1/6 w-0">
              <StatusCheckIcon
                icon={<CheckCircleIcon />}
                text={data.progressStatus ? data.progressStatus : data.status}
                bgColor={data.progressStatus == "Done" ? "#E0B186" : data.status =="reviewed" ? "#7879F1" : "#2ED477"}
                textColor={
                  data.progressStatus == "Done" ? "#E0B186" : data.status =="reviewed" ? "#7879F1" : "#2ED477"
                }
              />
            </div>
            <div className="w-1/6"></div>
          </div>
          {eventList.map((event, index) => {
            return (
              <div
                className="text-[#121212] flex xl:text-center p-2 mb-1 caption md:h6 lg:h5 w-full mx-auto gap-5 md:gap-2 lg:gap-2 xl:gap-2"
                key={index}
              >
                <div className="xl:w-1/6 w-1/12">
                  <p>{index + 2}</p>
                </div>
                <div className="xl:w-2/6 w-5/12">
                  {event.date ? (
                    <p>
                      {new Date(event.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="xl:w-2/6 w-5/12">
                  {event.startTime ? (
                    <p>
                      {new Date(event.startTime).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {event.endTime ? (
                        <>
                          {" - "}
                          {new Date(event.endTime).toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <p className="w-1/6 text-[#2ED477]/80 md:invisible xl:invisible lg:invisible xl:w-0 lg:w-0">
                  {event.status}
                </p>
                <div className="invisible md:visible xl:visible lg:visible xl:w-1/6 md:w-1/6 w-0">
                  <StatusCheckIcon
                    icon={<CheckCircleIcon />}
                    text={event.status}
                    bgColor={event.status == "Done" ? "#E0B186" : "#2ED477"}
                    textColor={event.status == "Done" ? "#E0B186" : "#2ED477"}
                  />
                </div>
                <div className="xl:w-1/6 w-1/12">
                  <Tooltip title="ยกเลิกนัด" placement="top">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      className="text-[#FF2F3B]"
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
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            );
          })}
          {fields.map((item, index) => (
            <form
              className="text-[#121212] flex items-center xl:text-center p-1 body1 md:h6 lg:h5 w-full mx-auto gap-2"
              key={index}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-1/6">
                <p>{eventList.length + index + 2}</p>
              </div>
              <div className="w-2/6">
                <FormControl required>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                      <ReactDatePicker
                        className="inputOutline"
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
              <div className="w-2/6 flex gap-4">
                <FormControl>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="startTime"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        className="inputOutline"
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
                        className="inputOutline"
                        selected={value}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="เวลาเสร็จสิ้น"
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="w-1/6">
                <button
                  type="submit"
                  className="body2 w-fit h-fit px-6 p-1.5 rounded-full border-2 border-[#AD8259]/60 bg-[#AD8259] text-white hover:bg-[#AD8259]/20 hover:text-[#AD8259]"
                >
                  เพิ่ม
                </button>
              </div>
            </form>
          ))}
        </motion.div>
        {data.status != "reviewed" && eventList.length == course.amount - 1 ? (
          <motion.div className="text-center pt-4">
            <p className="caption md:h6 xl:h6 pb-2 text-black/50">
              ไม่สามารถเพิ่มได้เนื่องจากครบจำนวนนัดแล้ว
            </p>
            <Tooltip title="การให้บริการเสร็จสิ้น" placement="top">
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
                      finishTask(data._id).then(() =>
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
            </Tooltip>
          </motion.div>
        ) : (
          <motion.div className="flex justify-center pt-16">
            {data.status != "reviewed" && (
              <CircleIconButton
                handleClick={() =>
                  append({
                    date: "",
                    startTime: "",
                    endTime: "",
                    event: event,
                    status: "Approved",
                    owner_id: user.id,
                    patient_id: patient._id,
                    course_id: course._id,
                  })
                }
                icon={<AddCircleOutlineIcon />}
                text="เพิ่มนัดใหม่"
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default AppointmentModal;
