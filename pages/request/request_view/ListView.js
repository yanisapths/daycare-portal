import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import RequestListCard from "../../../components/common/RequestListCard";
import SimpleCalendar from "../../../components/calendar/SimpleCalendar";

function ListView({ data }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <div className="pt-12 space-y-12 md:space-y-0 xl:space-y-0 md:pt-10 xl:pt-10 md:flex xl:flex md:gap-10 xl:gap-32 xl:pl-24">
      <SimpleCalendar
        className="w-2/6"
        currentDate={currentDate}
        today={today}
        setToday={setToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="w-4/6 min-w-full xl:min-w-[750px] md:min-w-[550px]">
        <p className="text-lg font-semibold">
          {" "}
          {selectedDate.toDate().toLocaleDateString("th-TH", {
            day: "numeric",
            weekday: "long",
            month: "short",
          })}
        </p>
        {/*request list */}
        {data?.map((request) => (
          <div key={request._id} className="mb-6">
            {selectedDate.toDate().toDateString() ==
            new Date(request.appointmentDate).toDateString() ? (
              <RequestListCard
                request={request}
                key={request._id}
                data={data}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListView;
