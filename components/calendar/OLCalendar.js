import React, { useState, useContext, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Stack from "@mui/material/Stack";
import useCollapse from "react-collapsed";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Swal from "sweetalert2";
import Router from "next/router";
import { useRouter } from "next/router";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Calendar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableData, setAvailableData] = useState([]);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "available",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchAvailableData();
    }
  }, [status]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(availableData);

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

  async function fetchAvailableData() {
    await delay(1000);
    const url = `${process.env.dev}/available/match/owner/${session.user.id}`;
    //course
    if (session.user.id) {
      const res = await fetch(url);
      try {
        const availableData = await res.json();
        if (availableData) {
          setAvailableData(availableData);
          console.log(availableData);
        } else return;
      } catch (err) {
        console.log(err);
      }
    } else {
      await delay(3000);
    }
  }

  async function deleteAvailable(availableId) {
    const res = await fetch(
      `${process.env.dev}/available/delete/${availableId}`,
      { method: "DELETE" }
    )
      .then(async (res) => {})
      .catch((err) => {
        console.log("ERROR: ", err);
      });
    fetchAvailableData();
  }

  return (
    <div className="lg:flex">
      <div className="lg:w-4/12">
        <div
          {...getToggleProps()}
          className="rounded-md bg-black/10 py-4 mt-6 lg:h-14 lg:w-full"
        >
          {isExpanded ? "ปิดปฏิทิน" : "แสดงปฏิทิน"}
        </div>
        <div {...getCollapseProps()} className="">
          <DateRangePicker
            className="lg:pt-4 lg:mx-auto sm:flex sm:flex-col sm:col-span-3"
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#A17851"]}
            onChange={handleSelect}
          />
        </div>
      </div>

      <div className="lg:w-9/12 lg:grid lg:grid-cols-4 lg:px-10 sm:pt-16 sm:space-y-8">
        {dates.map(function (date) {
          return (
            <div key={date} className="">
              <div className="lg:pt-10 lg:px-24 pb-4">
                <div className="bg-[#A17851] rounded-full w-16 py-3">
                  <p className="h5 text-white">{date.getDate()}</p>
                </div>
                <p className="h6 pt-4 w-12">{days[date.getDay()]}</p>
              </div>
              {availableData?.map((data) => {
                {
                  if (
                    date.getDate() == new Date(data.availableDate).getDate()
                  ) {
                    return (
                      <div className="flex mx-8">
                        <div className="flex justify-between rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-2 px-12 py-4">
                          <p className="tracking-wide">
                            {new Date(data.startTime).toLocaleTimeString(
                              "th-TH",
                              {
                                hour: "numeric",
                                minute: "2-digit",
                              }
                            )}
                            am
                          </p>
                          <p className="px-2">-</p>
                          <p className="tracking-wide">
                            {new Date(data.endTime).toLocaleTimeString(
                              "th-TH",
                              {
                                hour: "numeric",
                                minute: "2-digit",
                              }
                            )}
                            am
                          </p>
                        </div>
                        <div className="pt-3 px-2">
                          <IconButton
                            aria-label="delete"
                            size="medium"
                            onClick={() =>
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it!",
                                cancelButtonText: "No, cancel!",
                                reverseButtons: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteAvailable(data._id).then(() =>
                                    Swal.fire(
                                      "Deleted!",
                                      "Available slot has been deleted.",
                                      "success"
                                    )
                                  );
                                } else if (
                                  result.dismiss === Swal.DismissReason.cancel
                                ) {
                                  Swal.fire(
                                    "Cancelled",
                                    "Available slot is safe :)",
                                    "error"
                                  );
                                }
                              })
                            }
                          >
                            <DoDisturbIcon />
                          </IconButton>
                        </div>
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

export default Calendar;
