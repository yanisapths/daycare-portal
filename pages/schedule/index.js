import React, { useState, useContext, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import BtnAdd from "../../components/common/BtnAdd";
import Calendar from "../../components/calendar/OLCalendar";
import Header from "../../components/Header";
import FooterSocial from "../../components/FooterSocial";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Head from "next/head";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Schedule = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const [clinicData, setData] = useState({});

  async function fetchData() {
    await delay(1000);
    if (session.user.id) {
      const res = await fetch(
        `${process.env.dev}/clinic/owner/${session.user.id}`
      );
      try {
        const clinicData = await res.json();
        if (clinicData) {
          setData(clinicData);
          console.log(clinicData);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
      await delay(3000);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
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

  console.log(watch(["availableDate", "startTime", "endTime"]));

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
        `${process.env.dev}/available/create/${clinicData._id}`,
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
        <title>Clinic | Schedule </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main">
          <div className="text-center">
            <h1 className="pageTitle">ตารางนัด</h1>

            <div className="flex justify-end space-x-10 px-8 lg:px-24 pt-10 lg:py-12">
              <BtnAdd onClick={handleClickOpen} />
            </div>
            <div className="px-8 lg:px-20 w-full">
              <Calendar />
            </div>
            <Dialog
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
              maxWidth="xl"
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
                Availability
              </DialogTitle>
              <DialogContent>
                <Box>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-4 md:py-24 md:w-96 md:mx-28 xl:py-24 xl:w-96 xl:mx-28">
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
                </Box>
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

export default Schedule;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
