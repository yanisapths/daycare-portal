import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Router, { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import StatusCheckIcon from "../../components/OLIcon/StatusCheckIcon";
import CircleIconButton from "../../components/OLButton/CircleIconButton";
import FormModal from "../../pages/request/FormModal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import Swal from "sweetalert2";
import BodyChartCanvas from "./BodyChartCanvas";
import BodyChart from "./BodyChart";
import AddEventForm from "../OLForm/AddEventForm";
import DetailHeader from "../AppointmentView/DetailHeader";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openCanvas, setOpenCanvas] = useState(false);
  const [bodyChartURL, setBodyChartURL] = useState(null);
  const bodyChart = useRef();

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEventDialogOpen = () => {
    setOpenEventDialog(true);
  };
  const handleEventDialogClose = () => {
    setOpenEventDialog(false);
  };
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

  async function saveChart(appointmentId) {
    const bodyChartURL = bodyChart.current.toDataURL("image/png");
    setBodyChartURL(bodyChartURL);
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyChart: bodyChartURL }),
    };
    const res = await fetch(
      `${process.env.dev}/appointment/bodychart/${appointmentId}`,
      option
    )
      .then(async (res) => {
        toast.success("บันทึกเรียบร้อย");
        setOpenCanvas(false);
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }

  async function saveEventChart(eid) {
    const bodyChartURL = bodyChart.current.toDataURL("image/png");
    setBodyChartURL(bodyChartURL);
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyChart: bodyChartURL }),
    };
    const res = await fetch(`${process.env.dev}/event/bodychart/${eid}`, option)
      .then(async (res) => {
        toast.success("บันทึกเรียบร้อย");
        setOpenCanvas(false);
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
          <DetailHeader data={data} patient={patient} course={course} />
          <section className="mb-2 pt-2 text-black/50 border-black/20 border-b-[1px] border-dashed  ">
            <div className="text-[#121212] grid grid-cols-5 text-center items-center mb-2 caption w-full gap-2">
              <div>
                <p>ครั้งที่</p>
              </div>
              <div>
                <p>วันนัด</p>
              </div>
              <div>
                <p>เวลานัด</p>
              </div>
              <div>
                <p>สถานะ</p>
              </div>
              <div></div>
              <div></div>
            </div>
          </section>
          <div className="text-[#121212] grid grid-cols-5 text-center items-center mb-2 caption w-full gap-2">
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
            <div className="">
              {data.bodyChart && (
                <div>
                  <button
                    className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-2 bg-black/5 hover:bg-white"
                    onClick={handleDialogOpen}
                  >
                    <p className="text-xs">bodychart</p>
                  </button>
                  {openDialog && (
                    <BodyChart
                      data={data}
                      openDialog={openDialog}
                      handleDialogClose={handleDialogClose}
                    />
                  )}
                </div>
              )}
              {!data.bodyChart && (
                <button
                  className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-2 bg-black/5 hover:bg-white"
                  onClick={() => setOpenCanvas(true)}
                >
                  <p className="text-xs">bodychart</p>
                </button>
              )}
              {!data.bodyChart && openCanvas && (
                <BodyChartCanvas
                  bodyChart={bodyChart}
                  saveChart={saveChart}
                  setOpenCanvas={setOpenCanvas}
                  data={data}
                />
              )}
            </div>
          </div>

          {data.status != "Rejected" &&
            eventList.map((event, index) => {
              return (
                <div
                  className="text-[#121212] grid grid-cols-5 text-center items-center text-lg mb-2 caption w-full gap-2"
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
                    <div className="static items-center">
                      <p className=" text-[#2ED477]/80 md:hidden xl:hidden lg:hidden sm:text-xs">
                        {event.status}
                      </p>
                      <div className="flex justify-center items-center">
                        <div className="static sm:hidden flex justify-center items-center">
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
                  <div className="">
                    {event.bodyChart && (
                      <div>
                        <button
                          className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-2 bg-black/5 hover:bg-white"
                          onClick={handleEventDialogOpen}
                        >
                          <p className="text-xs">bodychart</p>
                        </button>
                        {openEventDialog && (
                          <BodyChart
                            data={event}
                            openDialog={openEventDialog}
                            handleDialogClose={handleEventDialogClose}
                          />
                        )}
                      </div>
                    )}
                    {!event.bodyChart && (
                      <button
                        className="cursor-ponter border-2 w-fit h-fit rounded-full p-4 py-2 bg-black/5 hover:bg-white"
                        onClick={() => setOpenCanvas(true)}
                      >
                        <p className="text-xs">bodychart</p>
                      </button>
                    )}
                    {!event.bodyChart && openCanvas && (
                      <BodyChartCanvas
                        bodyChart={bodyChart}
                        saveChart={saveEventChart}
                        setOpenCanvas={setOpenCanvas}
                        data={event}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          {fields.map((item, index) => (
            <AddEventForm
              key={index}
              index={index}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              eventList={eventList}
              control={control}
              errors={errors}
            />
          ))}
        </motion.div>
        {eventList.length == course.amount - 1 ? (
          data.status == "Rejected" ? (
            <motion.div className="text-center pt-4">
              <p className="caption md:h6 xl:h6 pb-2 text-black/50">
                ไม่สามารถเพิ่มนัดได้เนื่องจากครบจำนวนนัดแล้ว
              </p>
            </motion.div>
          ) : (
            " "
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
