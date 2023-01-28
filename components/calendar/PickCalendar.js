import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import useCollapse from "react-collapsed";
import { useRouter } from "next/router";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PickCalendar = ({ availables, setSelected, getSelectedDate }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).getDate();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  // Usage
  const dates = getDates(selectionRange.startDate, selectionRange.endDate);
  return (
    <div className="">
      <div className="">
        <div
          {...getToggleProps()}
          className="rounded-md bg-[#FFECA7]/30 w-full py-2 text-center "
        >
          <p className="font-semibold text-[#6C5137]">
            {isExpanded ? "ปิดปฏิทิน" : "แสดงปฏิทิน"}
          </p>
        </div>
        <div {...getCollapseProps()} className="">
          <DateRangePicker
            className="lg:pt-4 lg:mx-auto sm:flex sm:flex-col sm:col-span-3"
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#AD8259"]}
            onChange={handleSelect}
          />
        </div>
      </div>

      <div className="flex space-x-4 text-center">
        {dates.map(function (date) {
          return (
            <div key={date}>
              {today == date.getDate() ? (
                <p className="body1 pt-4 font-semibold text-[#6C5137]">Today</p>
              ) : (
                <p className="body1 pt-4 font-semibold text-[#6C5137]">
                  {date.toDateString()}
                </p>
              )}

              {availables?.map((data) => {
                {
                  if (
                    date.getDate() == new Date(data.availableDate).getDate()
                  ) {
                    return (
                      <div
                        key={data._id}
                        className="cursor-pointer flex rounded-lg text-[#6C5137] body1 bg-[#AD8259]/30 
                      py-1 px-3 w-full whitespace-nowrap my-2
                      hover:text-black hover:bg-[#AD8259] hover:shadow-xl hover:shadow-[#AD8259]/40
                      active:text-black active:bg-[#AD8259] active:shadow-xl active:shadow-[#AD8259]/40
                      "
                        onClick={() =>
                          getSelectedDate(
                            data.availableDate,
                            data.startTime,
                            data.endTime
                          )
                        }
                      >
                        <p className="tracking-wide">
                          {new Date(data.startTime).toLocaleTimeString(
                            "en-EN",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                        <p className="px-2">-</p>
                        <p className="tracking-wide">
                          {new Date(data.endTime).toLocaleTimeString("en-EN", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    );
                  } else {
                    return;
                  }
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickCalendar;
