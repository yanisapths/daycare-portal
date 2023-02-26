import React, { useState, useEffect } from "react";
import AppointmentTableRow from "../OLCard/AppointmentTableRow";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
const status = [
  {id: 0, label: "ทั้งหมด"},
  { id: 1, label: "กำลังดำเนินการ" },
  { id: 2, label: "ปฏิเสธ/ยกเลิก" },
  { id: 3, label: "เสร็จสิ้น" },
];
const ListView = ({ data, user, events, staffs  }) => {
  const [result, setResult] = useState("");
  const handleChange = (event) => {
    setResult(event.target.value);
  };
  return (
    <div className="pb-24">
      <div className="flex mx-auto items-center">
        <p className="h6 font-semibold px-6">นัดทั้งหมด</p>
        <div className="">
          <Box sx={{ width: 160 }}>
            <FormControl fullWidth>
              <InputLabel>สถานะ</InputLabel>
              <Select
                sx={{ borderRadius: "32px" }}
                label="เลือกนัดจากชื่อ"
                value={result}
                onChange={handleChange}
              >
                {status.map((input, index) => {
                  return (
                    <MenuItem key={input.id} value={input.id} className="gap-4">
                      <CircleIcon
                        className={
                          input.id == 0
                          ? "w-4 h-3 text-[#ffe898]" :
                          input.id == 1
                            ? "w-4 h-3 text-[#2ED477]"
                            : input.id == 2
                            ? "w-4 h-3 text-[#FF2F3B]"
                            : "w-4 h-3 text-[#7C552F]"
                        }
                      />{" "}
                      {input.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="mt-4 shadow-xl rounded-2xl mx-6">
        <div className="overflow-x-auto rounded-2xl scrollbar-hide">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center">หมายเลข</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex justify-center items-center">ลูกค้า</div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center">สถานะ</div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center">คงเหลือ</div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center"></div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center"></div>
                </th>
              </tr>
            </thead>

            {result == "" && result == 0 &&
              data.map((d, index) => (
                <tbody className="divide-y divide-gray-100" key={d._id}>
                  <AppointmentTableRow
                    d={d}
                    index={index}
                    key={d._id}
                    user={user}
                    staffs={staffs}
                  />
                </tbody>
              ))}
            {data.map((d, index) => {
              return result == 1 && d.status == "Approved" ? (
                <tbody
                  className="divide-y divide-gray-100 bg-[#2ED477]/10"
                  key={d._id}
                >
                  <AppointmentTableRow
                    d={d}
                    index={index}
                    key={d._id}
                    user={user}
                    staffs={staffs}
                  />
                </tbody>
              ) : result == 2 && d.status == "Rejected" ? (
                <tbody
                  className="divide-y divide-gray-100 bg-[#FF2F3B]/10"
                  key={d._id}
                >
                  <AppointmentTableRow
                    d={d}
                    index={index}
                    key={d._id}
                    user={user}
                    staffs={staffs}
                  />
                </tbody>
              ) : result == 3 && d.status == "Done" ? (
                <tbody
                  className="divide-y divide-gray-100"
                  key={d._id}
                >
                  <AppointmentTableRow
                    d={d}
                    index={index}
                    key={d._id}
                    user={user}
                    staffs={staffs}
                  />
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-100" key={index}></tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListView;
