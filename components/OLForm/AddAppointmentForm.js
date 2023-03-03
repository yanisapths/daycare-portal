import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import Router, { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import SmallCalendar from "../calendar/SmallCalendar";

import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const place = [
  { id: 1, label: "คลินิก" },
  { id: 2, label: "บ้าน" },
];

const sex = [
  { id: 1, label: "ชาย" },
  { id: 2, label: "หญิง" },
  { id: 3, label: "อื่นๆ" },
];

function AddAppointmentForm({
  user,
  clinicData,
  patientData,
  open,
  handleClose,
  setOpen,
  availables,
  courseData,
}) {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [appointmentPlace, setAppointmentPlace] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpenCalendar(true);
  };
  const handleCloseCalendar = (event, reason) => {
    event.preventDefault();
    setAppointmentDate("");
    setAppointmentTime("");
    setEndTime("");
    if (reason !== "backdropClick") {
      setOpenCalendar(false);
    } else {
      setOpenCalendar(false);
    }
  };
  const handleDateSelect = (event, reason) => {
    event.preventDefault();
    getSelectedDate(appointmentDate, appointmentTime, endTime);
    if (reason !== "backdropClick") {
      setOpenCalendar(false);
    }
  };
  function getSelectedDate(appointmentDate, appointmentTime, endTime) {
    setAppointmentDate(appointmentDate);
    setAppointmentTime(appointmentTime);
    setEndTime(endTime);
  }
  function removeSelectedDate() {
    setAppointmentDate();
    setAppointmentTime();
    setEndTime();
  }
  const handlePatientChange = (event) => {
    setPatientId(event.target.value);
  };
  const removePatient = () => {
    setPatientId();
  };

  const handlePlaceChange = (event) => {
    setAppointmentPlace(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.owner_id = user.id;
    data.status = "Approved";
    data.appointmentDate = appointmentDate;
    data.appointmentTime = appointmentTime;
    data.endTime = endTime;
    data.patient_id = patient_id;
    data.appointmentPlace = appointmentPlace;
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log(json);
    console.log(new Date(appointmentDate).toDateString());
    console.log(new Date(appointmentTime).toTimeString());
    console.log(new Date(endTime).toTimeString());
    const response = await axios
      .post(
        `${process.env.dev}/appointment/create/${clinicData._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.success("กำลังเพิ่มนัด...🛠️🚧");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <>
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
          เพิ่มนัดหมาย
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:grid lg:grid-cols-12">
                <section className="flex justify-center lg:px-8 py-8 px-12 lg:col-span-12 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="col-span-3">
                      <label
                        htmlFor="patient_id"
                        className="inputLabel pb-0 text-sm"
                      >
                        ลูกค้าในแบบบันทึก
                      </label>
                      <div className="flex items-center align-middle gap-2">
                        <Select
                          sx={{
                            borderRadius: "40px",
                            height: "46px",
                            "@media (min-width: 780px)": {
                              width: "285px",
                            },
                          }}
                          {...register("patient_id", { required: false })}
                          value={patient_id}
                          onChange={handlePatientChange}
                        >
                          <MenuItem value="">
                            <span>ไม่เลือก</span>
                          </MenuItem>
                          {patientData.map((input, key) => (
                            <MenuItem key={key} value={input._id}>
                              <span>
                                ( {input.nickName} ) {input.firstName}{" "}
                                {input.lastName}
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="">
                      {patient_id != "" ? (
                        ""
                      ) : (
                        <div className="py-4 lg:py-8 xl:py-10">
                          <div className="text-[#b1c2be] border-b-2 border-dashed">
                            <p>สำหรับลูกค้าใหม่</p>
                          </div>
                          <div className="py-4 grid grid-cols-6 gap-6">
                            <div className="col-span-3">
                              <label
                                htmlFor="firstName"
                                className="inputLabel pb-0 text-sm"
                              >
                                ชื่อ
                              </label>

                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="inputOutline"
                                {...register("firstName", { required: false })}
                              />
                            </div>
                            <div className="col-span-3">
                              <label
                                htmlFor="lastName"
                                className="inputLabel pb-0 text-sm"
                              >
                                นามสกุล
                              </label>

                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="inputOutline"
                                {...register("lastName", { required: false })}
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="nickName"
                                className="inputLabel pb-0 text-sm"
                              >
                                ชื่อเล่น
                              </label>

                              <input
                                type="text"
                                id="nickName"
                                name="nickName"
                                className="inputOutline"
                                {...register("nickName", { required: false })}
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="age"
                                className="inputLabel pb-0 text-sm"
                              >
                                อายุ
                              </label>

                              <input
                                type="text"
                                id="age"
                                name="age"
                                className="inputOutline"
                                {...register("age", { required: false })}
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="sex"
                                className="inputLabel pb-0 text-sm"
                              >
                                เพศ
                              </label>
                              <Controller
                                render={({
                                  field: { field, onChange, value },
                                }) => (
                                  <>
                                    <Select
                                      sx={{
                                        borderRadius: "40px",
                                        height: "40px",
                                        "@media (min-width: 780px)": {
                                          width: "120px",
                                        },
                                        px: 2,
                                        mt: 0.5,
                                      }}
                                      {...field}
                                      {...register("sex", { required: false })}
                                    >
                                      {sex.map((input, key) => (
                                        <MenuItem
                                          key={input.id}
                                          value={input.label}
                                          onChange={onChange}
                                        >
                                          {input.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </>
                                )}
                                name="sex"
                                control={control}
                              />
                            </div>
                            <div className="col-span-3">
                              <label
                                htmlFor="lineId"
                                className="inputLabel pb-0 text-sm"
                              >
                                LINE ID
                              </label>

                              <input
                                type="text"
                                id="lineId"
                                name="lineId"
                                className="inputOutline"
                                {...register("lineId", { required: false })}
                              />
                            </div>
                            <div className="col-span-3">
                              <label
                                htmlFor="phoneNumber"
                                className="inputLabel pb-0 text-sm"
                              >
                                เบอร์โทร
                              </label>

                              <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="inputOutline"
                                {...register("phoneNumber", {
                                  required: false,
                                  pattern: {
                                    value: /^([0-9]\d*)(\.\d+)?$/,
                                  },
                                })}
                              />
                              {errors.phoneNumber?.type === "pattern" && (
                                <p role="alert" className="text-[#FF2F3B]">
                                  เบอร์โทรต้องเป็นตัวเลขเท่านั้น
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="flex items-center justify-center lg:px-8 py-8 px-12 lg:col-span-12 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="mt-8 grid grid-cols-6 gap-6">
                      <section className="col-span-6 space-y-4">
                        <div className="col-span-6">
                          <label htmlFor="course" className="inputLabel">
                            คอร์ส<span className="text-[#FF2F3B]">*</span>
                          </label>
                          <FormControl sx={{ width: "100%" }}>
                            <Controller
                              render={({
                                field: { field, onChange, value },
                              }) => (
                                <>
                                  <Select
                                    {...field}
                                    sx={{
                                      borderRadius: "40px",
                                      height: "46px",
                                      "@media (min-width: 780px)": {
                                        width: "285px",
                                      },
                                    }}
                                    {...register("course_id", {
                                      required: true,
                                    })}
                                    value={value || ""}
                                  >
                                    {courseData?.map((input, key) => (
                                      <MenuItem
                                        onChange={onChange}
                                        key={key}
                                        value={input._id}
                                      >
                                        {input.courseName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </>
                              )}
                              name="course_id"
                              control={control}
                            />
                            {errors.course_id?.type === "required" && (
                              <p role="alert" className="text-[#FF2F3B]">
                                กรุณาเลือกคอร์ส
                              </p>
                            )}
                          </FormControl>
                        </div>
                        <div className="col-span-6">
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="outlined"
                            required
                          >
                            <>
                              <label
                                htmlFor="appointmentPlace"
                                className="inputLabel"
                              >
                                สถานที่นัดหมาย
                                <span className="text-[#FF2F3B]">*</span>
                              </label>
                              <Select
                                sx={{
                                  borderRadius: "40px",
                                  height: "46px",
                                  "@media (min-width: 780px)": {
                                    width: "285px",
                                  },
                                }}
                                {...register("appointmentPlace", {
                                  required: true,
                                })}
                                value={appointmentPlace}
                                onChange={handlePlaceChange}
                              >
                                {place.map((input, key) => (
                                  <MenuItem key={key} value={input.label}>
                                    {input.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                            {errors.appointmentPlace?.type === "required" && (
                              <p role="alert" className="text-[#FF2F3B]">
                                กรุณาเลือกสถานที่นัดหมาย
                              </p>
                            )}
                          </FormControl>
                          {appointmentPlace == "คลินิก" ? (
                            ""
                          ) : (
                            <>
                              <div className="py-4 col-span-6">
                                <p className="text-[#b1c2be]">ที่อยู่</p>
                                <div className="text-black/50 border-b-2 border-dashed" />
                              </div>
                              <div className="col-span-6">
                                <label
                                  htmlFor="location"
                                  className="inputLabel"
                                >
                                  (บ้านเลขที่, หมู่, ตรอกซอย, ถนน) เขต/อำเภอ
                                  แขวง/ตำบล จังหวัด
                                </label>

                                <input
                                  type="text"
                                  id="location"
                                  name="location"
                                  className="inputOutline"
                                  {...register("location", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="description" className="inputLabel">
                            ข้อควรระวัง หรือ รายละเอียดเพิ่มเติม
                          </label>
                          <FormControl
                            sx={{ width: "100%" }}
                            variant="standard"
                          >
                            <Controller
                              render={({ field: { onChange, value } }) => (
                                <>
                                  <input
                                    id="outlined-textarea"
                                    className="inputOutline"
                                    placeholder="เช่น เรื่องที่ควรระวัง หรือส่วนที่ต้องดูแลเป็นพิเศษ"
                                    {...register("description", {
                                      required: false,
                                    })}
                                    onChange={onChange}
                                    multiline
                                  />
                                </>
                              )}
                              name="description"
                              control={control}
                              rules={{
                                required: false,
                              }}
                            />
                          </FormControl>
                        </div>
                        <p className="text-black/50">
                          เลือกวันเวลาที่คลินิกว่าง
                        </p>
                        <div className="border-black/20  border-b-[1px] border-dashed" />
                        <div className="pt-10 px-8">
                          <div className="col-span-6 pb-6 flex justify-center">
                            <SmallCalendar
                              currentDate={currentDate}
                              today={today}
                              setToday={setToday}
                              selectedDate={selectedDate}
                              setSelectedDate={setSelectedDate}
                              availables={availables}
                              getSelectedDate={getSelectedDate}
                              removeSelectedDate={removeSelectedDate}
                              appointmentDate={appointmentDate}
                              appointmentTime={appointmentTime}
                              endTime={endTime}
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, mb: 4 }}>
          <button
            className="hover:shadow-lg 
                  w-20 h-9 hover:bg-black/5
                  rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
            onClick={handleClose}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            ยกเลิก
          </button>
          <button
            className="shadow-lg 
                  w-20 h-9 rounded-full sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg
                  bg-[#FFECA7] hover:bg-[#FFECA7]/70"
            onClick={handleSubmit(onSubmit)}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            เพิ่ม
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAppointmentForm;
