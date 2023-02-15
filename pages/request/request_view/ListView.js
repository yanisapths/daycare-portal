import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import RequestListCard from "../../../components/common/RequestListCard";
import SimpleCalendar from "../../../components/calendar/SimpleCalendar";

function ListView({ data }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <div className="flex justify-center">
      <div className="sm:w-full xl:min-w-[950px] sm:pt-12">
        <p className="text-lg font-semibold">คำขอใหม่รอการตอบรับ</p>
        {/*request list */}
        {data?.map((request) => (
          <div key={request._id} className="mb-6">
            <div>
              <RequestListCard
                request={request}
                key={request._id}
                data={data}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListView;
