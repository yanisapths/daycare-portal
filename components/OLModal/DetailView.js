import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DialogActions, Hidden } from "@mui/material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Router, { useRouter } from "next/router";
function DetailView({
  open,
  handleClose,
  id,
  name,
  amount,
  duration,
  totalPrice,
  procedures,
  type,
  selectedId,
}) {
  async function deleteCourse(courseId) {
    const url = `${process.env.url}/course/delete/${courseId}`;
    const res = await fetch(url, {
      method: "DELETE",
    })
      .then(async (res) => {
        toast.success("ลบรายการสำเร็จ");
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ลบรายการไม่สำเร็จ");
      });
  }

  return (
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        layoutId={selectedId}
        sx={{
          "& .MuiDialog-paper": {
            width: "70%",
            boxShadow: "none",
            borderRadius: "30px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: { sm: 24, md: 26, lg: 32, xl: 30 },
            mx: 2,
            mt: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <div className="flex flex-row sm:grid sm:grid-col-2 ">
            <div className="basis-1/4 flex self-start lg:basis-24 xl:basis-20 xxl:basis-28 xxl:text-3xl md:text-xl md:basis-20 sm:text-lg sm:basis-14">
              {name}
            </div>
            {type != "false" ? (
              <div
                className="flex basis-2/6 justify-start items-center text-center w-fit xl:pl-4
                          sm:col-start-2 "
              >
                <div className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-xs px-2 py-1 xxl:px-4">
                  {type}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex basis-5/12 xl:6/12 xl:ml-16 gap-2 justify-end  text-gray-400 cursor-pointer sm:col-start-2 sm:pt-2">
              <EditIcon />
              <DeleteIcon
                onClick={() => {
                  handleClose();
                  Swal.fire({
                    title: "ลบคอร์สนี้?",
                    text: "หากลบแล้วจะไม่สามารถย้อนกลับได้",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "ใช่ ลบเลย!",
                    cancelButtonText: "ยกเลิก",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteCourse(id).then(() =>
                        Swal.fire({
                          title: "ลบคอร์สแล้ว",
                          showConfirmButton: false,
                          icon: "success",
                          timer: 1000,
                        })
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire({
                        title: "ลบคอร์สไม่สำเร็จ: )",
                        showConfirmButton: false,
                        icon: "error",
                        timer: 1000,
                      });
                    }
                  });
                }}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box>
            {/* type and price */}
            <div className="flex flex-col text-center rounded-xl mx-5 ">
              <div className="divide-y-2 divide-dashed">
                <div className="justify-between flex flex-row text-black/70 sm:text-xs">
                  <p>การรักษา</p>
                  <p>ราคา(บาท)</p>
                </div>
                <div className="flex flex-col pt-3 space-y-4 text-black/70">
                  {procedures?.map((procedure) => (
                    <div
                      className="flex flex-row justify-between bg-[#ffdf8e]/50 rounded-3xl mx-2 py-2 px-3 sm:px-2 sm:mx-0 sm:text-xs
                   "
                      key={procedure}
                    >
                      <p>{procedure.procedureName}</p>
                      <p>{procedure.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/*total time and total price */}
              <div className="flex flex-col divide-y-2 divide-dashed mt-8 sm:mt-6 text-black/70 sm:text-xs">
                <div className="flex justify-start sm:justify-center ">
                  <p className="sm:hidden">ค่าใช้จ่ายและระยะเวลาการรักษา</p>
                  <p className="text-[15px] md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden ">
                    ค่าใช้จ่ายและระยะเวลา
                  </p>
                </div>

                <div className="flex flex-col justify-start items-start pt-3 text-lg sm:text-sm sm:items-center">
                  <div>คอร์ส {amount} ครั้ง</div>
                  <div>{duration} ชั่วโมง / ครั้ง</div>
                  <div className="flex self-end text-xl font-semibold sm:text-lg sm:self-center sm:pt-5">
                    รวม {totalPrice} บาท
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, justifyContent: "center" }}>
          <div className="mx-auto text-center flex flex-row justify-center">
            <button
              className=" text-[#FF2F3B] w-20 h-9  hover:underline
                  sm:text-sm md:text-base lg:h-10 lg:text-lg xxl:h-11 xxl:text-xl"
              onClick={handleClose}
              sx={{ fontSize: "18px" }}
            >
              ยกเลิก
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DetailView;
