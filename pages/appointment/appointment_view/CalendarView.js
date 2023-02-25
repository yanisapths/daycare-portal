import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AppointmentListCard from "../../../components/OLCard/AppointmentListCard";
import SimpleCalendar from "../../../components/calendar/SimpleCalendar";
import EventListCard from "../../../components/OLCard/EventListCard";

function CalendarView({ data, event, user, staffs }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <div className="space-y-12 md:space-y-0 md:flex-col md:items-center md:px-0 md:pt-6 lg:pt-7 lg:pl-7 lg:gap-10 lg:flex lg:space-y-0 lg:px-0 xxl:pt-4 xl:space-y-0  xl:pt-4 
     xl:flex xl:gap-10 xl:justify-center px-12 sm:space-y-6 sm:pt-4 sm:px-0 sm:mx-6 ">
      <div className="md:flex md:justify-center lg:flex lg:justify-center  ">
      <SimpleCalendar
        className=""
        currentDate={currentDate}
        today={today}
        setToday={setToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      </div>
     
      <div className="md:px-10  min-w-full md:pt-12 lg:min-w-[550px] xxl:min-w-[750px]  xl:min-w-[650px] md:min-w-[550px] ">
        <p className="text-lg font-semibold">
          {" "}
          {selectedDate.toDate().toLocaleDateString("th-TH", {
            day: "numeric",
            weekday: "long",
            month: "short",
          })}
        </p>
        {/*appointment list */}
        {data &&
          data?.map((d, index) => (
            <div key={index} className="mb-4">
              {selectedDate.toDate().toDateString() ==
              new Date(d.appointmentDate).toDateString() ? (
                <AppointmentListCard
                  d={d}
                  index={index}
                  data={data}
                  user={user}
                  staffs={staffs}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        {/*event list */}
        {event &&
          event?.map((d, index) => (
            <div key={index} className="mb-4">
              {selectedDate.toDate().toDateString() ==
              new Date(d.date).toDateString() ? (
                <EventListCard
                  d={d}
                  index={index}
                  data={data}
                  event={event}
                  staffs={staffs}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        {!data ||
          (data.length < 1 && (
            <div className="text-center px-10 pt-40">
              <p className="h4 lg:h2 text-black/30">ไม่มีนัดหมาย</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CalendarView;
