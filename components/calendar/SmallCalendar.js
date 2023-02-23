import React from "react";
import { generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn";
import PrimaryIconButton from "../OLButton/PrimaryIconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CancelIcon from "@mui/icons-material/Cancel";

function SmallCalendar({
  getSelectedDate,
  availables,
  currentDate,
  today,
  setToday,
  selectedDate,
  setSelectedDate,
  values,
  removeSelectedDate,
  appointmentDate,
  appointmentTime,
  endTime
}) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="text-[#121212] h-fit">
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
                    currentMonth
                      ? "text-sm"
                      : "text-sm text-gray-400 font-light",
                    today ? "bg-[#ffe898] text-[#6C5137]" : "",
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
      <div>
        {availables?.map((data) => {
          {
            if (
              new Date(selectedDate).toDateString() ==
              new Date(data.availableDate).toDateString()
            ) {
              return (
                <div
                  key={data._id}
                  className="flex justify-center align-middle gap-2 items-center"
                >
                  <div
                    key={data._id}
                    className={
                      appointmentDate == data.availableDate && appointmentTime == data.startTime && endTime == data.endTime
                        ? "text-center cursor-pointer flex gap-2 rounded-lg text-[#6C5137] body1 bg-[#ffe898]/40  px-3 w-fit whitespace-nowrap my-2 shadow-xl shadow-[#ffe898]/40"
                        : "text-center cursor-pointer flex gap-2 rounded-lg text-[#6C5137] body1 border-2 border-[#ffe898]/60 px-3 w-fit whitespace-nowrap my-2 hover:text-black hover:bg-[#ffe898]/40 hover:shadow-xl hover:shadow-[#ffe898]/40 active:text-black active:bg-[#ffe898]/40 active:shadow-xl active:shadow-[#ffe898]/40"
                    }
                    onClick={() =>
                      getSelectedDate(
                        data.availableDate,
                        data.startTime,
                        data.endTime
                      )
                    }
                  >
                     <p className="tracking-wide pr-2">
                      {new Date(data.availableDate).toLocaleDateString("th-TH")}
                    </p>
                    <p className="tracking-wide">
                      {new Date(data.startTime).toLocaleTimeString("th-TH", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="px-2">-</p>
                    <p className="tracking-wide">
                      {new Date(data.endTime).toLocaleTimeString("th-TH", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {appointmentTime ? (
                    <div>
                      <PrimaryIconButton
                        handleClick={() => getSelectedDate("", "", "")}
                        icon={
                          <CancelIcon className="text-[#6C5137]" size="medium" />
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            } else {
              return;
            }
          }
        })}
      </div>
    </div>
  );
}

export default SmallCalendar;