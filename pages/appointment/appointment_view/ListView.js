import React, { useState, useEffect } from "react";
import AppointmentTableRow from "../../../components/OLCard/AppointmentTableRow";
import EventTableRow from "../../../components/OLCard/EventTableRow";

function ListView({ data, user, events }) {
  return (
    <div className=" pb-24">
      <div className="mt-12 shadow-xl rounded-2xl mx-6">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center">หมายเลข</div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center">วันที่</div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center">เวลา</div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center">ลูกค้า</div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center">สถานะ</div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
                <th className="p-4 font-medium text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((d, index) => (
                <AppointmentTableRow d={d} index={index} key={d._id} user={user} />
              ))}
              {events?.map((event, index) => (
                <EventTableRow event={event} index={index} key={event._id} user={user}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListView;
