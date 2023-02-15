import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import FormModal from "../../pages/request/FormModal";
import RequestModal from "../OLModal/RequestModal";
import BtnCancel from "../BtnCancel";
import BtnAccept from "../BtnAccept";
import Overlay from "../OLLayout/Overlay";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import BtnDetails from "../BtnDetails";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 16,
    borderRadius: 12,
  },
}));

function EventTableRow({ event,user }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [p, setPatient] = useState({});
  const [course, setCourse] = useState({});
  const [appointment, setAppointment] = useState({});
  let patientId = appointment.patient_id;

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
      `${process.env.dev}/patient/${patientId}`
    );

    const courseData = await fetch(
      `${process.env.dev}/course/${event.course_id}`
    );

    const appointments = await fetch(
      `${process.env.dev}/appointment/${event.appointment_id}`
    );

    const course = await courseData.json();
    const p = await patientData.json();
    const appointment = await appointments.json();
    if (isSubscribed) {
      setCourse(course);
      setPatient(p);
      setAppointment(appointment);
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
  return (
    <>
      <tr
        key={event._id}
        layoutId={event._id}
        disable={event.status == "Done" ? true : false}
        className={
          event.status == "Approved"
            ? "bg-[#2ED477]/5 cursor-pointer hover:bg-[#2ED477]/20 text-[#6C5137]"
            : event.status == "Cancel"
            ? "bg-[#FF2F3B]/5 cursor-pointer hover:bg-[#FF2F3B]/20 text-[#6C5137]"
            : "cursor-pointer hover:bg-[#AD8259]/20 text-[#6C5137]"
        }
      >
        <td className="flex w-24">
          <p
            className={
              event.status == "Done"
                ? "p-4 text-black/40 truncate"
                : "p-4 truncate"
            }
          >
            {event._id}
          </p>
        </td>
        <td
          className={
            event.status == "Done"
              ? "p-4 text-black/40"
              : "p-4 text-gray-700 whitespace-nowrap"
          }
        >
          {new Date(event.date).toLocaleDateString("th-TH", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">
          {event.endTime ? (
            <p
              className={
                event.status == "Done"
                  ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                  : "px-3 py-1.5 text-black text-xs font-medium"
              }
            >
              {new Date(event.startTime).toLocaleTimeString("en-EN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {"-"}{" "}
              {new Date(event.endTime).toLocaleTimeString("en-EN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          ) : (
            <p
              className={
                event.status == "Done"
                  ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                  : "px-3 py-1.5 text-black text-xs font-medium"
              }
            >
              {new Date(event.startTime).toLocaleTimeString("en-EN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
        </td>
        <td
          className={
            event.status == "Done"
              ? "p-4 text-black/40"
              : "p-4 text-gray-700 whitespace-nowrap"
          }
        >
          {appointment.patient_id ? (
            <p>
              ( {p.nickName} ) {p.firstName} {p.lastName}
            </p>
          ) : (
            <p>
              ( {appointment.nickName} ) {appointment.firstName} {appointment.lastName}
            </p>
          )}
        </td>

        <td className="p-4 text-gray-700 whitespace-nowrap">
          {event.status == "Done" ? (
            <strong className="text-black/40 text-xs font-medium">
              เสร็จสิ้นการให้บริการ
            </strong>
          ) : (
            <>
              {event.status == "Approved" ? (
                <strong className="text-[#2ED477] px-3 py-1.5 rounded-full text-xs font-medium">
                  ยืนยันแล้ว
                </strong>
              ) : (
                <>
                  {event.status == "Cancel" ? (
                    <strong className="cursor-pointer hover:bg-[#FF2F3B]/20 text-[#FF2F3B] px-3 py-1.5 rounded-full text-xs font-medium">
                      ยกเลิกแล้ว
                    </strong>
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          )}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap space-x-2">
          {event.status != "Done" && (
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
                    finishTask(event._id).then(() =>
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
          )}
        </td>
        <td>
          <Tooltip title="ลบ" placement="top">
            <IconButton
              aria-label="delete"
              size="medium"
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
            >
              <DoDisturbIcon />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </>
  );
}

export default EventTableRow;
