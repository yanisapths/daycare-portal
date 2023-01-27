import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import TimeModal from "./TimeModal";

import "react-datepicker/dist/react-datepicker.css";
const place = [
  { id: 1, label: "บ้าน" },
  { id: 2, label: "คลินิก" },
];

function AddAppointmentForm({
  user,
  clinicData,
  patientData,
  open,
  handleClose,
  setOpen,
}) {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [availData, setAvailData] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);

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
    if (reason !== "backdropClick") {
      setOpenCalendar(false);
    }
  };
  function getSelectedDate(appointmentDate, appointmentTime, endTime) {
    setAppointmentDate(appointmentDate);
    setAppointmentTime(appointmentTime);
    setEndTime(endTime);
  }
  async function fetchData() {
    const url = `${process.env.dev}/course/match/owner/${user.id}`;
    const availurl = `${process.env.dev}/available/match/owner/${user.id}`;
    //course

    const res = await fetch(url);
    const avail = await fetch(availurl);
    try {
      const courseData = await res.json();
      const availData = await avail.json();
      if (courseData) {
        setCourseData(courseData);
      }
      if (availData) {
        setAvailData(availData);
      } else return;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    getSelectedDate(appointmentDate, appointmentTime, endTime);
  });

  const onSubmit = async (data) => {
    console.log(data);
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
          เพิ่มนัด
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:grid lg:grid-cols-12">
                <section className="flex justify-center lg:px-8 py-8 px-12 lg:col-span-12 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="col-span-3">
                      <label
                        htmlFor="patient"
                        className="inputLabel pb-0 text-sm"
                      >
                        ลูกค้าในแบบบันทึก
                      </label>
                      <Controller
                        render={({ field: { field, onChange, value } }) => (
                          <>
                            <Select
                              sx={{
                                borderRadius: "40px",
                                height: "46px",
                                "@media (min-width: 780px)": {
                                  width: "285px",
                                },
                              }}
                              {...field}
                              {...register("patient", { required: false })}
                              value={value || ""}
                            >
                              {patientData.map((input, key) => (
                                <MenuItem
                                  key={input._id}
                                  value={input._id}
                                  onChange={onChange}
                                >
                                  <span>( {input.nickName} ) </span>{" "}
                                  {input.firstName} {input.lastName}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        )}
                        name="patient"
                        control={control}
                      />
                    </div>
                    <div className="py-4 lg:py-8 xl:py-10">
                      <div className="text-black/50 border-b-2 border-dashed">
                        <p>สำหรับลูกค้าใหม่</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
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

                        <input
                          type="text"
                          id="sex"
                          name="sex"
                          className="inputOutline"
                          {...register("sex", { required: false })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="lineid"
                          className="inputLabel pb-0 text-sm"
                        >
                          LINE ID
                        </label>

                        <input
                          type="text"
                          id="lineid"
                          name="lineid"
                          className="inputOutline"
                          {...register("lineid", { required: false })}
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
                          {...register("phoneNumber", { required: false })}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-[#b1c2be]">ที่อยู่</p>
                        <div className="text-black/50 border-b-2 border-dashed" />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="address" className="inputLabel">
                          ที่อยู่ (บ้านเลขที่, หมู่, ตรอกซอย, ถนน)
                        </label>

                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="inputOutline"
                          {...register("address", {
                            required: false,
                          })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="province" className="inputLabel">
                          จังหวัด
                        </label>

                        <input
                          type="text"
                          id="province"
                          name="province"
                          className="inputOutline"
                          {...register("province", {
                            required: false,
                          })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="district" className="inputLabel">
                          เขต/อำเภอ
                        </label>

                        <input
                          type="text"
                          id="district"
                          name="district"
                          className="inputOutline"
                          {...register("district", {
                            required: false,
                          })}
                        />
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="subDistrict" className="inputLabel">
                          แขวง/ตำบล
                        </label>

                        <input
                          type="text"
                          id="subDistrict"
                          name="subDistrict"
                          className="inputOutline"
                          {...register("subDistrict", {
                            required: false,
                          })}
                        />
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="postalCode" className="inputLabel">
                          รหัสไปรษณีย์
                        </label>

                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          className="inputOutline"
                          {...register("postalCode", {
                            required: false,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex items-center justify-center lg:px-8 py-8 px-12 lg:col-span-12 xl:col-span-6 xl:py-24">
                  <div className="max-w-xl lg:max-w-3xl">
                    <div className="mt-8 grid grid-cols-6 gap-6">
                      <section className="col-span-6 space-y-4">
                        <p className="text-black/50">
                          เลือกวันเวลาที่คลินิกว่าง
                        </p>
                        <div className="border-black/20  border-b-[1px] border-dashed" />
                        <button
                          onClick={handleClickOpen}
                          className="rounded-xl bg-[#A17851]/30 shadow-lg px-10 py-2"
                        >
                          <p className="text-[#6C5137] font-semibold text-lg">
                            เลือกวัน/เวลา
                          </p>
                        </button>
                        <TimeModal
                          open={openCalendar}
                          handleClose={handleCloseCalendar}
                          data={availData}
                          handleDateSelect={handleDateSelect}
                          getSelectedDate={getSelectedDate}
                        />
                        {appointmentDate && appointmentTime ? (
                          <div className="text-center whitespace-nowrap space-x-4 flex w-fit px-4 rounded-lg text-[#005844] body1 bg-[#ACDED5]/30">
                            <FormControl>
                              <Controller
                                control={control}
                                name="appointmentDate"
                                render={({ field: { onChange, value } }) => (
                                  <div>
                                    <strong
                                      className="body1 pt-2"
                                      onChange={onChange}
                                      {...register("appointmentDate", {
                                        required: false,
                                      })}
                                    >
                                      {new Date(appointmentDate).toDateString()}
                                    </strong>
                                  </div>
                                )}
                              />
                            </FormControl>
                            <FormControl>
                              <Controller
                                control={control}
                                name="appointmentTime"
                                render={({ field: { onChange, value } }) => (
                                  <div className="">
                                    <strong
                                      className="body1 pt-2"
                                      onChange={onChange}
                                      {...register("appointmentTime", {
                                        required: false,
                                      })}
                                    >
                                      {new Date(
                                        appointmentTime
                                      ).toLocaleTimeString("en-EN", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}{" "}
                                      -{" "}
                                    </strong>
                                  </div>
                                )}
                              />
                            </FormControl>
                            <FormControl>
                              <Controller
                                control={control}
                                name="endTime"
                                render={({ field: { onChange, value } }) => (
                                  <div className="">
                                    <div className="">
                                      <strong
                                        className="body1 pt-2"
                                        onChange={onChange}
                                        {...register("endTime", {
                                          required: false,
                                        })}
                                      >
                                        {new Date(endTime).toLocaleTimeString(
                                          "en-EN",
                                          {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                          }
                                        )}
                                      </strong>
                                    </div>
                                  </div>
                                )}
                              />
                            </FormControl>
                          </div>
                        ) : (
                          <></>
                        )}
                      </section>
                      <div className="col-span-6">
                        <label
                          htmlFor="appointmentDate"
                          className="inputLabel pb-0 text-sm"
                        >
                          วัน
                        </label>
                        <FormControl>
                          <Controller
                            control={control}
                            name="appointmentDate"
                            render={({ field: { onChange, value } }) => (
                              <ReactDatePicker
                                className="inputOutline"
                                onChange={onChange}
                                selected={value}
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="appointmentTime"
                          className="inputLabel pb-0 text-sm"
                        >
                          เวลา
                        </label>
                        <FormControl>
                          <Controller
                            control={control}
                            name="appointmentTime"
                            render={({ field: { onChange, value } }) => (
                              <DatePicker
                                onChange={onChange}
                                className="inputOutline"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="endTime"
                          className="inputLabel pb-0 text-sm"
                        >
                          เวลาสิ้นสุด
                        </label>
                        <FormControl>
                          <Controller
                            control={control}
                            name="endTime"
                            render={({ field: { onChange, value } }) => (
                              <DatePicker
                                onChange={onChange}
                                className="inputOutline"
                                selected={value}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl sx={{ width: "100%" }}>
                          <Controller
                            render={({ field: { field, onChange, value } }) => (
                              <>
                                <label htmlFor="course" className="inputLabel">
                                  คอร์ส
                                </label>
                                <Select
                                  {...field}
                                  sx={{
                                    borderRadius: "40px",
                                    height: "46px",
                                    "@media (min-width: 780px)": {
                                      width: "285px",
                                    },
                                  }}
                                  {...register("course_id", { required: true })}
                                  value={value || ""}
                                >
                                  {courseData?.map((input, key) => (
                                    <MenuItem
                                      onChange={onChange}
                                      key={input.id}
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
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          sx={{ width: "100%" }}
                          variant="outlined"
                          required
                        >
                          <Controller
                            render={({ field: { field, onChange, value } }) => (
                              <>
                                <label htmlFor="place" className="inputLabel">
                                  สถานที่นัดหมาย
                                </label>
                                <Select
                                  sx={{
                                    borderRadius: "40px",
                                    height: "46px",
                                    "@media (min-width: 780px)": {
                                      width: "285px",
                                    },
                                  }}
                                  {...field}
                                  {...register("place", { required: true })}
                                  value={value || ""}
                                >
                                  {place.map((input, key) => (
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
                            name="place"
                            control={control}
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="description" className="inputLabel">
                          ข้อควรระวัง หรือ รายละเอียดเพิ่มเติม
                        </label>
                        <FormControl sx={{ width: "100%" }} variant="standard">
                          <Controller
                            render={({ field: { onChange, value } }) => (
                              <>
                                <TextField
                                  id="outlined-textarea"
                                  placeholder="..."
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
