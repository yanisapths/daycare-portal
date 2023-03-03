import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import RequestListCard from "../../../components/common/RequestListCard";
import SimpleCalendar from "../../../components/calendar/SimpleCalendar";

function ListView({ data, staffs }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <div className="flex justify-center">
      <div className="sm:w-full xl:min-w-[950px] lg:w-5/6 md:w-5/6 ">
        <p className="text-lg font-semibold">คำขอใหม่รอการตอบรับ</p>
        {/*request list */}
        {data ? (
          data.length > 0 ? (
            data.map((request) => (
              <div key={request._id} className="mb-6">
                <div>
                  <RequestListCard
                    request={request}
                    key={request._id}
                    data={data}
                    staffs={staffs}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center pt-40">
              <div className="h3 font-light sm:h5 text-black/30 ">
                ไม่มีคำขอรับบริการใหม่
              </div>
            </div>
          )
        ) : (
          <div className="col-span-2 text-center pt-40">
            <div className="h3 font-light sm:h5 text-black/30 ">
              ไม่มีคำขอรับบริการใหม่
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListView;
