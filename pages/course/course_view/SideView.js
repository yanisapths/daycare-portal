import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import SmallInput from "../../../components/common/SmallInput";

function SideView() {
  const theme = useTheme();
  const [procedureName, setProcedureName] = useState();
  const [price, setPrice] = useState();
  const [smallInputList, setSmallInput] = useState([
    { procedure: "" },
  ]);
  console.log(smallInputList);

  const addSmallInput = () => {
    setSmallInput([
      ...smallInputList,
      { procedure: "" },
    ]);
  };
  const removeSmallInput = () => {
    const list = [...smallInputList];
    list.splice(index, 1);
    setSmallInput(list);
  };
  const handleSmallInputChange = (e, index) => {
    const { procedure, value } = e.target;
    const list = [...smallInputList];
    list[index][procedure] = value;
    setSmallInput(list);
  };
  return (
    <Box
      className="h-full w-full overflow-y-auto"
      sx={{ bgcolor: theme.palette.primary.main }}
    >
      <form>
        <div className="pt-16 text-center">
          <Typography variant="h3">เพิ่มคอร์ส</Typography>
          <div className="pb-10" />
          <input
            type="text"
            name="courseName"
            placeholder="ชื่อคอร์ส"
            className="w-2/3 inputUnderline"
          />
          <div className="flex pt-16 items-center px-16">
            <div className="space-y-10">
              <div className="grid grid-cols-3 ">
                {/* Amount */}
                <Typography variant="h5" className="pt-4">
                  จำนวน
                </Typography>
                <input
                  type="text"
                  name="amount"
                  placeholder=""
                  className="inputUnderline"
                />
                <Typography variant="h5" className="pt-4">
                  ครั้ง
                </Typography>
              </div>
              <div className="grid grid-cols-3 ">
                {/* Duration */}
                <Typography variant="h5" className="pt-4">
                  เวลา
                </Typography>
                <input
                  type="text"
                  name="duration"
                  placeholder=""
                  className="inputUnderline"
                />
                <Typography variant="h5" className="pt-4">
                  ชั่วโมง
                </Typography>
              </div>

              <div className="grid grid-cols-3 ">
                {/* Price */}
                <Typography variant="h5" className="pt-4">
                  ราคา
                </Typography>
                <input
                  type="text"
                  name="totalPrice"
                  placeholder=""
                  className="inputUnderline"
                />
                <Typography variant="h5" className="pt-4">
                  บาท
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-16 px-24">
          <Typography variant="h5">หัตถการ</Typography>
          <div
            onClick={addSmallInput}
            className="px-4 py-1 md:px-16 md:py-2 rounded-full cursor-pointer border  border-[#AD8259] bg-[#AD8259] shadow-lg text-white hover:bg-transparent hover:text-[#AD8259] focus:outline-none focus:ring active:text-[#AD8259]"
          >
            <p>เพิ่ม</p>
          </div>
        </div>
        {smallInputList.map((singleInput, index) => (
          <div key={index}>
            <SmallInput onChange={(e) => handleSmallInputChange(e,index)} value={singleInput.procedure}/>
          </div>
        ))}
          <div className="px-10 py-2 md:px-48 md:py-10 text-center items-center">
         <div
            className="buttonPrimary"
          >
            <p>เพิ่ม</p>
          </div>
          </div>
      </form>
    </Box>
  );
}

export default SideView;
