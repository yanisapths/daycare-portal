import React from "react";
import { generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SimpleCalendar({currentDate, today,setToday, selectedDate, setSelectedDate }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
      <div className="md:w-96 md:h-96 xl:w-96 xl:h-96 text-[#121212]">
        <div className="flex justify-between">
          <p className="font-semibold">
            {months[today.month()]}, {today.year()}
          </p>
          <div className="flex items-center gap-5">
            <ChevronLeftIcon
              className="cursor-pointer"
              onClick={() => setToday(today.month(today.month() - 1))}
            />
            <p
              className="font-semibold cursor-pointer hover:text-[#6C5137] transition-all"
              onClick={() => setToday(currentDate)}
            >
              วันนี้
            </p>
            <ChevronRightIcon
              className="cursor-pointer"
              onClick={() => setToday(today.month(today.month() + 1))}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <p key={index} className="h-14 grid place-content-center text-sm">
                {day}
              </p>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="h-14 border-t grid place-content-center"
                >
                  <p
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      currentMonth ? "text-sm" : "text-sm text-gray-400 font-light",
                      today ? "bg-[#FFECA7] text-[#6C5137]" : "",
                      selectedDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-[#6C5137] text-white"
                        : "",
                      "cursor-pointer font-semibold h-10 w-10 rounded-full grid place-content-center hover:bg-[#6C5137] hover:text-white hover:transition-all"
                    )}
                  >
                    {date.date()}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
  );
}

export default SimpleCalendar;
