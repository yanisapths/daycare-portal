import React from "react";
import RequestTableRow from "../../../components/OLCard/RequestTableRow";

function TableView({ data }) {
  return (
    <>
      <div className="mt-12 shadow-xl rounded-2xl mx-6">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full text-sm divide-y divide-gray-200 bg-white">
            <thead>
              <tr className="bg-[#AD8259] text-white">
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">ลำดับ</div>
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
                  <div className="flex items-center">สถานที่</div>
                </th>
                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center">สถานะ</div>
                </th>

                <th className="p-4 text-left whitespace-nowrap">
                  <div className="flex items-center"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {data?.map((d, index) => (
               <RequestTableRow d={d} index={index} key={d._id}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableView;
