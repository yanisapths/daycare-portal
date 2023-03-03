import React from "react";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEventForm({errors, control, onSubmit, index, eventList,handleSubmit }) {
  return (
    <form
    className="text-[#121212] grid grid-cols-5 items-center text-center text-lg  w-full  gap-2"
    key={index}
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className="flex justify-center sm:text-sm">
      <p>{eventList.length + index + 2}</p>
    </div>
    <div className="flex justify-center">
      <FormControl required>
        <Controller
          rules={{ required: true }}
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              className="inputOutline sm:text-xs  text-center"
              onChange={onChange}
              selected={value}
              placeholderText="วัน"
              error={Boolean(errors?.date)}
              helperText="กรุณาเลือกวัน"
            />
          )}
        />
        {errors.date?.type === "required" && (
          <p role="alert" className="caption text-[#FF2F3B]">
            กรุณาเลือกวัน
          </p>
        )}
      </FormControl>
    </div>
    <div className="flex justify-center sm:flex-col gap-1 ">
      <FormControl>
        <Controller
          rules={{ required: true }}
          control={control}
          name="startTime"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              onChange={onChange}
              className="inputOutline sm:text-[9px] md:placeholder:text-[12px] text-center"
              selected={value}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="เวลาเริ่ม"
              error={Boolean(errors?.startTime)}
              helperText="กรุณาเลือกเวลา"
            />
          )}
        />
        {errors.startTime?.type === "required" && (
          <p role="alert" className="caption text-[#FF2F3B]">
            กรุณาเลือกเวลา
          </p>
        )}
      </FormControl>

      <FormControl>
        <Controller
          rules={{ required: false }}
          control={control}
          name="endTime"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              onChange={onChange}
              className="inputOutline sm:text-[9px] md:placeholder:text-[12px] text-center "
              selected={value}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="เสร็จสิ้น"
            />
          )}
        />
      </FormControl>
    </div>
    <div className="">
      <button
        type="submit"
        className="body2 w-fit h-fit px-6 p-1.5 rounded-full border-2 border-[#AD8259]/60 bg-[#AD8259] text-white hover:bg-[#AD8259]/20 hover:text-[#AD8259]
        sm:text-sm sm:px-5 sm:p-1 md:text-sm lg:text-sm"
      >
        เพิ่ม
      </button>
    </div>
  </form>
  )
}

export default AddEventForm