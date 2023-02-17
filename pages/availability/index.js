import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Swal from "sweetalert2";
import Router from "next/router";
import dayjs from "dayjs";
import axios from "axios";
import BtnAdd from "../../components/common/BtnAdd";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import SimpleCalendar from "../../components/calendar/SimpleCalendar";

import DatePicker from "react-datepicker";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Availability = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const [clinicData, setData] = useState({});
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableData, setAvailableData] = useState([]);
  console.log(availableData);
  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `${process.env.url}/clinic/owner/${session.user.id}`
      );
      try {
        const clinicData = await res.json();
        if (clinicData) {
          setData(clinicData);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
      await delay(3000);
    }
  }

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
        } else return;
      } catch (err) {}
    } else {
      await delay(3000);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
      fetchAvailableData();
    }
  }, [status]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      availableDate: "",
    },
  });
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

  const onSubmit = async (data) => {
    console.log(data);
    data.owner_id = session.user.id;
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.url}/available/create/${clinicData._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <div>
      <Head>
        <title>Clinic | Availability </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />
        <main className="main">
          <div className="text-center">
            <h1 className="pageTitle">จัดการวันว่าง</h1>

            <div className="flex justify-end space-x-10 px-8 lg:px-24 pt-10 lg:py-12">
              <BtnAdd onClick={handleClickOpen} />
            </div>
            <div className="pt-12 space-y-12 md:space-y-0 xl:space-y-0 md:pt-10 xl:pt-10 md:flex xl:flex md:gap-10 xl:gap-10 xl:justify-center px-12">
              <SimpleCalendar
                className="w-2/6"
                currentDate={currentDate}
                today={today}
                setToday={setToday}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <div className="w-4/6 min-w-full xl:min-w-[750px] md:min-w-[550px]">
                <p className="text-lg font-semibold pb-2">
                  {" "}
                  {selectedDate.toDate().toLocaleDateString("th-TH", {
                    day: "numeric",
                    weekday: "long",
                    month: "short",
                  })}
                </p>
                {availableData?.map((data) => {
                  {
                    if (
                      selectedDate.toDate().toDateString() ==
                      new Date(data.availableDate).toDateString()
                    ) {
                      return (
                        <div className="flex justify-center items-center">
                          <div className="flex justify-between rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-4 px-20 py-6">
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
            </div>
            <Dialog
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              maxWidth="xl"
              sx={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <DialogTitle
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 24,
                  mx: 2,
                  mt: 2,
                  textAlign: "center",
                }}
              >
                เพิ่มวันและเวลาว่าง
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-24">
                  <div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px" }}>
                        วัน
                      </InputLabel>
                      <FormControl>
                        <Controller
                          control={control}
                          name="availableDate"
                          render={({ field: { onChange, value } }) => (
                            <ReactDatePicker
                              className="rounded-full outline-none border-2
                         w-full px-16 py-2 focus:border-[#A17851]"
                              onChange={onChange}
                              selected={value}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px" }}>
                        เวลาเริ่ม
                      </InputLabel>
                      <FormControl>
                        <Controller
                          render={({ field: { onChange, value } }) => (
                            <>
                              <DatePicker
                                onChange={onChange}
                                className="rounded-full outline-none border-2
                          w-full px-16 py-2 focus:border-[#A17851]"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                            </>
                          )}
                          name="startTime"
                          control={control}
                        />
                      </FormControl>
                    </div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px" }}>
                        เวลาสิ้นสุด
                      </InputLabel>
                      <FormControl>
                        <Controller
                          render={({ field: { onChange, value } }) => (
                            <>
                              <DatePicker
                                onChange={onChange}
                                className="rounded-full outline-none border-2
                          w-full px-16 py-2 focus:border-[#A17851]"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                            </>
                          )}
                          name="endTime"
                          control={control}
                        />
                      </FormControl>
                    </div>
                  </div>
                </form>
              </DialogContent>
              <DialogActions sx={{ mx: 4, mb: 4 }}>
                <button
                  className="body1 lg:h6 rounded-full outline-none border-2 border-black/25 hover:bg-black/10
                px-6 py-2 mb-4"
                  onClick={handleClose}
                  sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="body1 text-white lg:h6 rounded-full outline-none border-2 bg-[#A17851] px-6 py-2 hover:bg-[#A17851]/60 mb-4"
                >
                  ตกลง
                </button>
              </DialogActions>
            </Dialog>
          </div>
        </main>
        <FooterSocial />
      </div>
    </div>
  );
};

export default Availability;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
