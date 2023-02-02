import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BtnCancel from "../../../components/BtnCancel";
import BtnAccept from "../../../components/BtnAccept";
import RequestModal from "../../../components/OLModal/RequestModal";
import Overlay from "../../../components/OLLayout/Overlay";
import CircleTextButton from "../../../components/OLButton/CircleTextButton";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import FormModal from "../FormModal";
import Router from "next/router";
import toast from "react-hot-toast";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

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

function TableView({ data }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [p, setPatient] = useState({});
  const [course, setCourse] = useState({});
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

  async function acceptRequest(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    };
    const res = await fetch(
      `${process.env.url}/appointment/accept/${appointmentId}`,
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
      `${process.env.url}/appointment/delete/${appointmentId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  useEffect(() => {
    {
      data &&
        data.map((r) => {
          const patienturl = `${process.env.url}/patient/${r.patient_id}`;
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
    const courseurl = `${process.env.url}/course/${data.course_id}`;
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
      <div className="mt-12 shadow-xl rounded-2xl mx-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr className="">
                <th className="sticky left-0 p-4 text-left">
                  <label className="sr-only" htmlFor="row_all">
                    Select All
                  </label>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">ลำดับ</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">วันที่</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">เวลา</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">ลูกค้า</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">สถานที่</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">สถานะ</div>
                </th>

                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
              </tr>
            </thead>

            {data?.map((d, index) => (
              <tbody className="divide-y divide-gray-100" key={d._id}>
                <tr
                  key={d._id}
                  disable={d.status == "Done" ? true : false}
                  className={
                    d.status == "Approved"
                      ? "bg-[#2ED477]/5"
                      : d.status == "Rejected"
                      ? "bg-[#FF2F3B]/5"
                      : ""
                  }
                >
                  <td className=""></td>
                  <td
                    className={
                      d.status == "Done" ? "p-4 text-black/40" : "p-4 mx-4 px-4"
                    }
                  >
                    {index}
                  </td>
                  {selectedId && (
                    <div className="left-0 top-0 items-center justify-center bg-black/10 w-full h-full flex fixed">
                      <RequestModal
                        data={d}
                        patient={p}
                        setSelectedId={setSelectedId}
                        close={closeModal}
                        course={course}
                      ></RequestModal>
                    </div>
                  )}
                  <td
                    className={
                      d.status == "Done"
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
                          d.status == "Done"
                            ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                            : "px-3 py-1.5 text-black text-xs font-medium"
                        }
                      >
                        {new Date(d.appointmentTime).toLocaleTimeString(
                          "en-EN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
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
                          d.status == "Done"
                            ? "px-3 py-1.5 text-black/40 text-xs font-medium"
                            : "px-3 py-1.5 text-black text-xs font-medium"
                        }
                      >
                        {new Date(d.appointmentTime).toLocaleTimeString(
                          "en-EN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    )}
                  </td>
                  <td
                    className={
                      d.status == "Done"
                        ? "p-4 text-black/40"
                        : "p-4 text-gray-700 whitespace-nowrap"
                    }
                  >
                    {" "}
                    <span className="font-bold">({d.nickName})</span>{" "}
                    {d.firstName} {d.lastName}
                  </td>
                  <td
                    className={
                      d.status == "Done"
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
                              acceptRequest(d._id).then(() =>
                                Swal.fire({
                                  title: "รับคำขอแล้ว",
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
                      />
                      <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
                      <FormModal
                        open={open}
                        handleClose={handleClose}
                        request={d}
                      />
                    </td>
                  ) : (
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      {d.status == "Done" ? (
                        <strong className="text-black/40 text-xs font-medium">
                          {d.status}
                        </strong>
                      ) : (
                        <>
                          {d.status == "Approved" ? (
                            <strong className="text-[#2ED477] px-3 py-1.5 rounded-full text-xs font-medium">
                              {d.status}
                            </strong>
                          ) : (
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
                                {d.status}
                              </strong>
                            </CustomTooltip>
                          )}
                        </>
                      )}
                    </td>
                  )}

                  <td>
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
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
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
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default TableView;
