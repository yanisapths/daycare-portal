import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { DialogActions } from "@mui/material";

function detailView({
  open,
  handleClose,
  setOpen,
  key,
  name,
  amount,
  duration,
  totalPrice,
  procedures,
  type,
}) {
  const theme = useTheme();
  return (
    <>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        sx={{ "& .MuiDialog-paper": { width: "70%", boxShadow:'none' } }}
        BackdropProps={{style:{ opacity: 0.2, backgroundColor: "rgba(0, 0, 0,0.35)",transition:'none' }}}
      >
        <DialogTitle
          sx={{
            color: theme.palette.primary.darker,
            fontSize: { sm: 24, md: 26, lg: 32, xl: 30 },
            mx: 2,
            mt: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <div className="flex flex-row sm:grid sm:grid-col-2 ">
            <div className="basis-1/4 flex self-start  xl:basis-2/12 xxl:text-3xl md:text-xl md:basis-1/4 sm:text-lg sm:basis-2/5">{name}</div>
          
          <div className="flex basis-2/6 justify-start items-center text-center w-fit xl:pl-4
                          sm:col-start-2 ">
            <div className="rounded-full bg-[#A5A6F6]/20 text-[#7879F1] text-xs px-2 py-1 xxl:px-4">
               {type}
               </div>
           
          </div>
          <div className="flex basis-5/12 xl:6/12 xl:ml-10 gap-2 justify-end  text-gray-400 cursor-pointer sm:col-start-2 sm:pt-2">
            <EditIcon />
            <DeleteIcon />
          </div>
          </div>
          
          
        </DialogTitle>
        <DialogContent >
          <Box>
            {/* type and price */}
            <div className="flex flex-col text-center rounded-xl mx-5 ">
              <div className="divide-y-2 divide-dashed">
              <div className="justify-between flex flex-row text-black/70 sm:text-xs">
                <p>การรักษา</p>
                <p>ราคา(บาท)</p>
              </div>
              <div className="flex flex-col pt-3 space-y-4 text-black/70">
                <div className="flex flex-row justify-between bg-[#ffdf8e]/50 rounded-3xl mx-2 py-2 px-3 sm:px-2 sm:mx-0 sm:text-xs">
                    <p>Ultrasound</p>
                    <p>1500</p>
                </div>
                <div className="flex flex-row justify-between bg-[#ffdf8e]/50 rounded-3xl mx-2 py-2 px-3 sm:px-2 sm:mx-0 sm:text-xs">
                    <p>Laser</p>
                    <p>990</p>
                </div>
                <div className="flex flex-row justify-between bg-[#ffdf8e]/50 rounded-3xl mx-2 py-2 px-3 sm:px-2 sm:mx-0 sm:text-xs">
                    <p>จัดกระดูก</p>
                    <p>690</p>
                </div>
              </div>
              </div>
              
              {/*total time and total price */}
              <div className="flex flex-col divide-y-2 divide-dashed mt-8 sm:mt-6 text-black/70 sm:text-xs">
                <div className="flex justify-start sm:justify-center ">
                <p className="sm:hidden">ค่าใช้จ่ายและระยะเวลาการรักษา</p>
                <p className="text-[15px] md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden ">ค่าใช้จ่ายและระยะเวลา</p>
                </div>
                
                <div className="flex flex-col justify-start items-start pt-3 text-lg sm:text-sm sm:items-center">
                  <div>คอร์ส 3 ครั้ง</div>
                  <div>2 ชั่วโมง / ครั้ง</div>
                  <div className="flex self-end text-xl font-semibold sm:text-lg sm:self-center sm:pt-5">
                  รวม 15990 บาท
                </div>
                </div>
                
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4,  justifyContent: "center" }}>
          <div className="mx-auto text-center flex flex-row justify-center">
              <button className=" text-[#FF2F3B] w-20 h-9  hover:underline
                  sm:text-sm md:text-base lg:h-10 lg:text-lg xxl:h-11 xxl:text-xl"
              onClick={handleClose}
              sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}>
                ยกเลิก
              </button>
            
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default detailView;
