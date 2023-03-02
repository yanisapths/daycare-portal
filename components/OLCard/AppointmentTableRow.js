import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Overlay from "../OLLayout/Overlay";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import AppointmentModal from "../OLModal/AppointmentModal";

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

function AppointmentTableRow({ clinic,d, index, event, user }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [p, setPatient] = useState({});
  const [course, setCourse] = useState({});
  const [eventList, setEvent] = useState([]);
  const left = (eventList.length + 1) % course.amount;
  let count = [];
  const e = d.events.length + 1;

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
    const eventUrl = `${process.env.url}/event/match/${d._id}`;
    const patientData = await fetch(
      `${process.env.url}/patient/${d.patient_id}`
    );

    const courseData = await fetch(`${process.env.url}/course/${d.course_id}`);
    const events = await fetch(eventUrl);
    const eventList = await events.json();

    const course = await courseData.json();
    const p = await patientData.json();
    if (isSubscribed) {
      setCourse(course);
      setPatient(p);
      setEvent(eventList);
    }
    return () => (isSubscribed = false);
  };

  function Finalized(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Done" }),
    };
    const res = fetch(
      `${process.env.url}/appointment/accept/${appointmentId}`,
      option
    )
      .then((res) => {
        toast.success("สำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  async function deleteRequest(appointmentId) {
    const res = await fetch(
      `${process.env.url}/appointment/delete/${appointmentId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        toast.success("ลบรายการสำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  for (let i = d.events.length; i < course.amount - 1; i++) {
    count.push((props) => <div>{props.children}</div>);
  }

  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <AppointmentModal
            eventList={eventList}
            user={user}
            data={d}
            patient={p}
            setSelectedId={setSelectedId}
            close={closeModal}
            course={course}
            clinic={clinic}
          ></AppointmentModal>
        </Overlay>
      )}
      {d.status != "pending" && (
        <Tooltip title="ดูรายละเอียด" placement="top">
          <tr
            key={d._id}
            layoutid={d._id}
            onClick={() => setSelectedId(d._id)}
            className={
              d.status == "Approved"
                ? "bg-[#2ED477]/5 cursor-pointer text-center hover:bg-[#2ED477]/20 text-[#6C5137]"
                : d.status == "Rejected"
                ? "bg-[#FF2F3B]/5 cursor-pointer text-center hover:bg-[#FF2F3B]/20 text-[#6C5137]"
                : d.status == "Done"
                ? "bg-[#4B5563]/5 cursor-pointer text-center hover:bg-[#4B5563]/10 text-[#4B5563]"
                : "cursor-pointer text-center hover:bg-[#AD8259]/20 text-[#6C5137]"
            }
          >
            <td className="flex justify-center">
              <p
                className={
                  d.status == "Done" || d.status == "reviewed"
                    ? "p-4 text-black/40 truncate w-32"
                    : "p-4 truncate w-32"
                }
              >
                {d._id}
              </p>
            </td>
            <td
              className={
                d.status == "Done" || d.status == "reviewed"
                  ? "p-4 text-black/40"
                  : "p-4 text-gray-700 whitespace-nowrap"
              }
            >
              {d.patient_id ? (
                <p>
                  ( {p.nickName} ) {p.firstName} {p.lastName}
                </p>
              ) : (
                <p>
                  ( {d.nickName} ) {d.firstName} {d.lastName}
                </p>
              )}
            </td>
            <td className="p-4 text-gray-700 whitespace-nowrap">
              {d.status == "Approved" ? (
                <strong className="text-[#2ED477] px-3 py-1.5 rounded-full text-xs font-medium">
                  ยืนยันแล้ว
                </strong>
              ) : (
                <span className="text-xs font-medium text-[#f35685]">
                  {d.status == "pending" ? (
                    "รอยืนยัน"
                  ) : (
                    <>
                      {d.status == "Rejected" ? (
                        <CustomTooltip
                          title={
                            d.rejectReason ? (
                              <div className="px-2 pb-3">
                                <div className="p-2">{d.rejectReason}</div>
                                <div className="px-3 rounded-full ">
                                  <span className="text-sm text-[#7879F1]">
                                    {d.tag}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          }
                          placement="top"
                        >
                          <strong className="cursor-pointer hover:bg-[#FF2F3B]/20 text-[#FF2F3B] px-3 py-1.5 rounded-full text-xs font-medium">
                            ปฏิเสธการให้บริการ
                          </strong>
                        </CustomTooltip>
                      ) : (
                        <strong className="text-black/40 text-xs font-medium">
                          เสร็จสิ้นการให้บริการ
                        </strong>
                      )}
                    </>
                  )}{" "}
                </span>
              )}
            </td>
            <td className="p-4 text-gray-700 whitespace-nowrap">
              <p className={d.status == "Done" ? "text-black/40" : ""}>
                {eventList.length + 1}/{course.amount}
              </p>
            </td>
            <td className="p-4 text-gray-700 whitespace-nowrap space-x-2">
              {d.progressStatus == "Done" &&
                d.status != "Done" &&
                d.status != "reviewed" &&
                d.status != "Rejected" && (
                  <button
                    className="w-36 text-sm h-9 rounded-full bg-[#4B5563]/20 text-[#6C514B556337] hover:bg-[#4B5563]/60 hover:text-white hover:shadow-xl"
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
                          Finalized(d._id);
                          Swal.fire({
                            title: "ให้บริการเสร็จสิ้นแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          });
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
                    }
                  >
                    เสร็จสิ้นการให้บริการ
                  </button>
                )}
            </td>
            <td>
              <Tooltip title="ลบ" placement="top">
                <IconButton
                  aria-label="delete"
                  size="medium"
                  onClick={() =>
                    Swal.fire({
                      title: "ลบรายการนี้?",
                      text: "หากลบแล้วจะไม่สามารถย้อนกลับได้",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "ใช่ ลบเลย!",
                      cancelButtonText: "ยกเลิก",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteRequest(d._id).then(() =>
                          Swal.fire({
                            title: "ลบคำขอแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "คำขอไม่ได้ถูกลบ :)",
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
        </Tooltip>
      )}
    </>
  );
}

export default AppointmentTableRow;
