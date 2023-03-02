import React from "react";
import Router from "next/router";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function ListView({ staffData }) {
  async function deleteStaff(sid) {
    const url = `${process.env.dev}/staff/delete/${sid}`;
    const res = await fetch(url, { method: "DELETE" })
      .then(async (res) => {
        toast.success("ลบพนักงานแล้ว");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบพนักงานไม่สำเร็จ");
      });
  }

  if (staffData) {
    return (
      <>
        <article className="w-full overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl bg-white mt-4 p-2 ">
          <div className="grid grid-cols-2 gap-2 text-sm  px-2 mt-4 pb-3 ">
            <div className=" col-start-1 ">
              {staffData.nickName ? (
                <p className="font-bold text-base text-[#6C5137] sm:text-xl md:text-xl lg:text-2xl">
                  {staffData.nickName}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="col-start-2 flex justify-end  ">
              <Tooltip title="ลบ" placement="top">
                <IconButton
                  aria-label="delete"
                  size="small"
                  className="text-[#FF2F3B]"
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
                        deleteStaff(staffData._id).then(() =>
                          Swal.fire({
                            title: "ลบแล้ว",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000,
                          })
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                          title: "ยกเลิก :)",
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
            <div className=" col-start-1 col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-1">
              <span className="font-semibold">ชื่อ-นามสกุล: </span>
              {staffData.firstName ? (
                <span className="text-base ">
                  {staffData.firstName} {staffData.lastName}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className=" col-start-2 col-span-2 sm:col-start-1 md:col-start-2 md:col-span-1 lg:col-start-1 xl:col-start-2 xl:col-span-1">
              <span className="font-semibold ">ตำแหน่ง: </span>
              {staffData.position ? (
                <span className="text-base"> {staffData.position}</span>
              ) : (
                <></>
              )}
            </div>
            <div className=" col-start-1 ">
              <span className="font-semibold ">อายุ: </span>
              <span className="text-base"> {staffData.age}</span>
            </div>
            <div className=" col-start-2 ">
              <span className="font-semibold ">เพศ: </span>
              <span className="text-base"> {staffData.sex}</span>
            </div>
            <div className="col-start-1 col-span-2 ">
              <span className="font-semibold">LINE ID: </span>
              <span className="text-base"> {staffData.lineId}</span>
            </div>
            <div className="sm:col-start-1 sm:col-span-2">
              <span className="font-semibold">เบอร์โทรศัพท์: </span>
              <span className="text-base lg:text-sm">
                {" "}
                {staffData.phoneNumber}
              </span>
            </div>
            <div className="col-start-1 col-span-2 sm:col-start-1 ">
              <span className="font-semibold">อีเมล์: </span>
              <span className="text-base lg:text-sm"> {staffData.email}</span>
            </div>
          </div>
        </article>
      </>
    );
  } else {
    return <></>;
  }
}

export default ListView;
