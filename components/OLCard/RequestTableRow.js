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

function RequestTableRow({ d, index }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [p, setPatient] = useState({});
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

  const fetchData = async () => {
    let isSubscribed = true;
    const patientData = await fetch(
      `${process.env.dev}/patient/${d.patient_id}`
    );

    const courseData = await fetch(`${process.env.dev}/course/${d.course_id}`);

    const course = await courseData.json();
    const p = await patientData.json();
    if (isSubscribed) {
      setCourse(course);
      setPatient(p);
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

  async function deleteRequest(appointmentId) {
    const res = await fetch(
      `${process.env.dev}/appointment/delete/${appointmentId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        toast.success("ลบรายการแล้ว");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  return (
    <>
      {selectedId && (
        <Overlay close={closeModal}>
          <RequestModal
            data={d}
            course={course}
            patient={p}
            setSelectedId={setSelectedId}
            close={closeModal}
          ></RequestModal>
        </Overlay>
      )}
      <Tooltip title="ดูรายละเอียด" placement="top">
        <tr
          key={d._id}
          layoutId={d._id}
          onClick={() => setSelectedId(d._id)}
          disable={d.status == "Done" ? true : false}
          className={
            d.status == "Approved"
              ? "bg-[#2ED477]/5 cursor-pointer hover:bg-[#2ED477]/20 text-[#6C5137]"
              : d.status == "Rejected"
              ? "bg-[#FF2F3B]/5 cursor-pointer hover:bg-[#FF2F3B]/20 text-[#6C5137]"
              : "cursor-pointer hover:bg-[#AD8259]/20 text-[#6C5137]"
          }
        >
          <td
            className={
              d.status == "Done" || d.status == "reviewed"
                ? "p-4 text-black/40"
                : "p-4 mx-4 px-4"
            }
          >
            {index}
          </td>
          <td
            className={
              d.status == "Done" || d.status == "reviewed"
                ? "p-4 text-black/40"
                : "p-4 text-gray-700 whitespace-nowrap"
            }
          >
            {new Date(d.appointmentDate).toLocaleDateString("th-TH", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </td>
          <td className="p-4 text-gray-700 whitespace-nowrap">
            {d.endTime ? (
              <p
                className={
                  d.status == "Done" || d.status == "reviewed"
                    ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                    : "px-3 py-1.5 text-black text-xs font-medium"
                }
              >
                {new Date(d.appointmentTime).toLocaleTimeString("en-EN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                {"-"}{" "}
                {new Date(d.endTime).toLocaleTimeString("en-EN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            ) : (
              <p
                className={
                  d.status == "Done" || d.status == "reviewed"
                    ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                    : "px-3 py-1.5 text-black text-xs font-medium"
                }
              >
                {new Date(d.appointmentTime).toLocaleTimeString("en-EN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            )}
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
          <td
            className={
              d.status == "Done" || d.status == "reviewed"
                ? "p-4 text-black/40"
                : "p-4 text-gray-700 whitespace-nowrap"
            }
          >
            {" "}
            {d.appointmentPlace}
          </td>

          {d.status == "pending" ? (
            <td className="p-4 text-gray-700 whitespace-nowrap space-x-2">
              <BtnAccept
                text="ยืนยัน"
                onClick={() =>
                  Swal.fire({
                    title: "ยืนยันรับคำขอนี้?",
                    text: "ยืนยันรับคำขอแล้วเพิ่มลงในนัดหมาย",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "ยอบรับ",
                    cancelButtonText: "ยกเลิก",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      acceptRequest(d._id).then(() =>
                        Swal.fire({
                          title: "ยืนยันรับคำขอแล้ว",
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
              <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
              <FormModal open={open} handleClose={handleClose} request={d} />
            </td>
          ) : (
            <td className="p-4 text-gray-700 whitespace-nowrap">
              {d.status == "Done" ? (
                <strong className="text-black/40 text-xs font-medium">
                  เสร็จสิ้นการให้บริการ
                </strong>
              ) : (
                <>
                  {d.status == "Approved" ? (
                    <strong className="text-[#2ED477] px-3 py-1.5 rounded-full text-xs font-medium">
                      ยืนยันแล้ว
                    </strong>
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
                        <strong className="text-[#7879F1] px-3 py-1.5 rounded-full text-xs font-medium">
                          รีวิวแล้ว
                        </strong>
                      )}
                    </>
                  )}
                </>
              )}
            </td>
          )}

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
    </>
  );
}

export default RequestTableRow;
