import React, { useState, useEffect } from "react";
import AppointmentTableRow from "../../../components/OLCard/AppointmentTableRow";
import EventTableRow from "../../../components/OLCard/EventTableRow";

function ListView({ data, user, events,staffs }) {
  return (
    <div className="pb-24 mx-12">
       <p className="h6 font-semibold px-6">
         นัดทั้งหมด
        </p>
      <div className="mt-4 shadow-xl rounded-2xl mx-6">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">หมายเลข</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">วันที่</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">เวลา</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">ลูกค้า</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">สถานะ</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">คงเหลือ</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
              </tr>
            </thead>

              {data?.map((d, index) => (
            <tbody className="divide-y divide-gray-100" key={d._id}>
                <AppointmentTableRow d={d} index={index} key={d._id} user={user} staffs={staffs} />
            </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListView;
