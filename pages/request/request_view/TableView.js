import React from "react";
import RequestTableRow from "../../../components/OLCard/RequestTableRow";

function TableView({ data }) {
  return (
    <div className="mx-6 pb-24">
      <p className="h6 font-semibold">คำขอทั้งหมด</p>
      <div className="mt-4 shadow-xl rounded-2xl">
        <div className="overflow-x-auto rounded-2xl scrollbar-hide">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center">ลำดับ</div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center text-center">
                    วันที่
                  </div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex  justify-center items-center">เวลา</div>
                </th>
                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center ">
                    ลูกค้า
                  </div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    สถานที่
                  </div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex justify-center items-center">สถานะ</div>
                </th>

                <th className="p-4 text-center whitespace-nowrap">
                  <div className="flex justify-center items-center"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((d, index) => (
                <RequestTableRow d={d} index={index + 1} key={d._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableView;
