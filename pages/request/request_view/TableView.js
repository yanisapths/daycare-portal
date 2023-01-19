import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BtnCancel from "../../../components/BtnCancel";
import BtnAccept from "../../../components/BtnAccept";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import FormModal from "../FormModal";
import Router from "next/router";
import toast from "react-hot-toast";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  async function acceptRequest(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    };
    const res = await fetch(
      `https://olive-service-api.vercel.app/appointment/accept/${appointmentId}`,
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
      `https://olive-service-api.vercel.app/appointment/delete/${appointmentId}`,
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
                  <div className="flex items-center">ลบ</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((d, index) => (
                <tr
                  key={d._id}
                  className={
                    d.status == "Approved"
                      ? "bg-[#2ED477]/5"
                      : d.status == "Rejected"
                      ? "bg-[#FF2F3B]/5"
                      : ""
                  }
                >
                  <td className=""></td>
                  <td className="p-4 mx-4 px-4">{index}</td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">
                    {new Date(d.appointmentDate).toDateString()}
                  </td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">
                    <strong className="bg-[#ffe898]/50 text-[#6C5137] px-3 py-1.5 rounded text-xs font-medium">
                      {new Date(d.appointmentTime).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
                  </td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">
                    {" "}
                    <span className="font-bold">({d.nickname})</span>{" "}
                    {d.firstName} {d.lastName}
                  </td>
                  <td className="p-4 text-gray-700 whitespace-nowrap">
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
                      {d.status == "Approved" ? (
                        <strong className="bg-[#2ED477]/10 text-[#2ED477] px-3 py-1.5 rounded text-xs font-medium">
                          {d.status}
                        </strong>
                      ) : (
                        <CustomTooltip
                          title={
                            d.rejectReason ? (
                              <div className="px-2 pb-3">
                                <div className="p-2">{d.rejectReason}</div>
                                <div className="px-3 rounded-full bg-[#7879F1]/10 ">
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
                          <strong className="cursor-pointer hover:bg-[#FF2F3B]/20 bg-[#FF2F3B]/10 text-[#FF2F3B] px-3 py-1.5 rounded text-xs font-medium">
                            {d.status}
                          </strong>
                        </CustomTooltip>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableView;
