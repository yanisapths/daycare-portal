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

import DatePicker,{ registerLocale } from "react-datepicker";
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
import toast from "react-hot-toast";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import th from "date-fns/locale/th"; 
registerLocale("th", th); 

const Availability = ({ clinicData }) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableData, setAvailableData] = useState([]);

  async function fetchAvailableData() {
    if (session && clinicData) {
      const url = `${process.env.dev}/available/match/${clinicData._id}`;
      const res = await fetch(url);
      try {
        const availableData = await res.json();
        if (availableData) {
          setAvailableData(availableData);
        } else return;
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!clinicData) {
        return router.push("/noClinic");
      }
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
      .then(async (res) => {
        toast.success("ลบสำเร็จ");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
    fetchAvailableData();
  }

  const onSubmit = async (data) => {
    console.log(data);
    data.owner_id = session.user.id;
    data.clinic_id = clinicData._id;
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .post(
        `${process.env.dev}/available/create/${clinicData._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        toast.success("เพิ่มวันเวลาว่างสำเร็จ");
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

            <div className="flex justify-end px-8  ">
              <BtnAdd click={handleClickOpen} />
            </div>
            <div
              className="space-y-12 px-12 md:space-y-16 md:flex-col md:items-center md:px-0 md:pt-6 lg:pt-7 lg:justify-center lg:gap-10 lg:flex lg:space-y-0 lg:px-0  xxl:pt-4 xl:space-y-0  xl:pt-4 
     xl:flex xl:gap-10 xl:justify-center sm:space-y-6 sm:pt-4 sm:px-0 sm:mx-6"
            >
              <div className="md:flex md:justify-center lg:flex lg:justify-center">
                <SimpleCalendar
                  className="w-2/6 "
                  currentDate={currentDate}
                  today={today}
                  setToday={setToday}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>

              <div className="flex flex-col justify-start items-center md:px-10  min-w-full lg:min-w-[450px] xxl:min-w-[650px]  xl:min-w-[650px] md:min-w-[550px] ">
                <p className="text-lg font-semibold pb-2 text-center">
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
                          <div className="flex justify-between rounded-2xl shadow-lg transition hover:shadow-2xl bg-white my-4 px-20 py-6 sm:px-14">
                            <p className="tracking-wide">
                              {new Date(data.startTime).toLocaleTimeString(
                                "th-TH",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
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
                  fontWeight: "bold",
                }}
              >
                เพิ่มวันและเวลาว่าง
              </DialogTitle>
              <DialogContent dividers>
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 ">
                  <div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px", color:"black" }}>
                        วัน
                      </InputLabel>
                      <FormControl>
                        <Controller
                          control={control}
                          name="availableDate"
                          render={({ field: { onChange, value } }) => (
                            <ReactDatePicker
                              className="rounded-full outline-none border-2
                         w-full px-16 py-2 focus:border-black border-[#A17851]"
                              onChange={onChange}
                              selected={value}
                              locale="th"
                              dateFormat="dd-MM-yyyy"
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px",color:"black" }}>
                        เวลาเริ่ม
                      </InputLabel>
                      <FormControl>
                        <Controller
                          render={({ field: { onChange, value } }) => (
                            <>
                              <DatePicker
                                onChange={onChange}
                                className="rounded-full outline-none border-2
                          w-full px-16 py-2 focus:border-black border-[#A17851]"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                locale="th"
                              />
                            </>
                          )}
                          name="startTime"
                          control={control}
                        />
                      </FormControl>
                    </div>
                    <div className="pb-6">
                      <InputLabel shrink style={{ fontSize: "24px",color:"black" }}>
                        เวลาสิ้นสุด
                      </InputLabel>
                      <FormControl>
                        <Controller
                          render={({ field: { onChange, value } }) => (
                            <>
                              <DatePicker
                                onChange={onChange}
                                className="rounded-full outline-none border-2
                          w-full px-16 py-2 focus:border-black border-[#A17851]"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                locale="th"
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
              <DialogActions sx={{ mx: 4,   }}>
                <div className="flex justify-center gap-4 items-center w-full my-2">
                  <div>
                  <button
                  className="body1 lg:h6 rounded-full outline-none border-2 border-black/25 hover:bg-black/10
                px-6 py-2 "
                  onClick={handleClose}
                  sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
                >
                  ยกเลิก
                </button>
                  </div>
                  <div>
                  <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="body1 text-white lg:h6 rounded-full outline-none border-2 bg-[#A17851] px-6 py-2 hover:bg-[#A17851]/60 "
                >
                  ตกลง
                </button>
                  </div>
                
               
                </div>
                
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
  if (session) {
    const url = `${process.env.dev}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinicData = await res.json();
      if (!clinicData) {
        return router.push("/noClinic");
      }
      return { props: { clinicData } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
