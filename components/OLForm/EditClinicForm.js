import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import Router,{ useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  ListItemText,
  Grid,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 14,
    borderRadius: 12,
    p: 8,
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function EditClinicForm({ data, handleOpenEdit, setOpenEdit,clinicId }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [daycareImageProfile, setDaycareImageProfile] = useState("");
  const [input, setInput] = useState({});
  console.log(clinicId)
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setDaycareImageProfile(i);
      var reader = new FileReader();
      reader.readAsDataURL(i);
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
      clinic_name: data.clinic_name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      owner: data.owner,
      email: data.email,
      price: data.price,
      description: data.description,
      openDay: data.openDay,
      openTime: data.openTime,
      closeTime: data.closeTime,
      ownerImageUrl: data.ownerImageUrl,
      imageUrl: data.imageUrl,
    },
  });
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (data) => {
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .put(`${process.env.url}/clinic/update/${clinicId}`, json, axiosConfig)
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        toast.success("บันทึกเรียบร้อย");
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 pt-8 flex-wrap pb-8"
    >
      <div className="flex justify-between">
        <p className="h2">
          <input
            placeholder={data.clinic_name ? data.clinic_name : ""}
            {...register("clinic_name", { required: false })}
            className="border-gray-400 placeholder-gray-800 w-84 py-1 outline-none border-[1px] rounded-full px-4"
          />
        </p>{" "}
        <button
          onClick={() => handleOpenEdit()}
          className="rounded-full border-2 text-gray-100 shadow-lg hover:bg-[#E0B186] hover:border-[#E0B186]/5 border-[#AD8259] hover:shadow-[#AD8259]/50 bg-[#AD8259] w-fit h-fit p-1 cursor-pointer"
        >
          <CustomTooltip title="แก้ไขข้อมูล" placement="top">
            <DriveFileRenameOutlineIcon className="cursor-pointer" />
          </CustomTooltip>
        </button>{" "}
      </div>
      <p className="mt-2 text-xl font-bold text-black/75">
        <input
          placeholder={data.address ? data.address : ""}
          {...register("address", { required: false })}
          className="border-gray-400 placeholder-gray-800 w-full py-1 outline-none border-[1px] rounded-full px-4"
        />
      </p>
      <p className="mt-4 text-lg text-black/75 sm:truncate py-2 px-2">
        <TextField
          multiline
          fullWidth
          rows={2}
          variant="standard"
          sx={{ outline: "none" }}
          placeholder={
            data.description
              ? data.description
              : "ใส่คำอธิบายคร่าวๆเกี่ยวกับคลินิกของคุณ เพื่อให้ผู้คนได้รู้จักคุณดีขึ้น 😊"
          }
          {...register("description", { required: false })}
        />
      </p>

      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="w-2/6">
          <span className="caption tracking-wide text-gray-500 uppercase">
            เบอร์ติดต่อคลินิก
          </span>
          <p className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-sm">
            <input
              placeholder={
                data.phoneNumber
                  ? data.phoneNumber
                  : "ใส่คำอธิบายคร่าวๆเกี่ยวกับคลินิกของคุณ เพื่อให้ผู้คนได้รู้จักคุณดีขึ้น 😊"
              }
              {...register("phoneNumber", { required: false })}
              className="border-gray-400 placeholder-gray-800  w-80 xl:w-96 py-1 outline-none border-[1px] rounded-full px-4"
            />
          </p>
        </div>
        <div className="w-4/6">
          <span className="caption tracking-wide text-gray-500 uppercase">
            อีเมล์
          </span>

          <p className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-sm">
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: false,
              })}
              className="border-gray-400 placeholder-gray-800 w-80 py-1 outline-none border-[1px] rounded-full px-4"
            />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="w-2/6">
          <span className="caption tracking-wide text-gray-500 uppercase">
            ชื่อเจ้าของ
          </span>

          <p className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-sm">
            <input
              type="text"
              id="owner"
              name="owner"
              {...register("owner", {
                required: false,
              })}
              className="border-gray-400 placeholder-gray-800 w-80 xl:w-96 py-1 outline-none border-[1px] rounded-full px-4"
            />
          </p>
        </div>
        <div className="w-4/6">
          <span className="caption tracking-wide text-gray-500 uppercase">
            ราคาเริ่มต้น (฿/ชั่วโมง)
          </span>

          <p className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-sm">
            <input
              type="text"
              id="price"
              name="price"
              {...register("price", {
                required: false,
              })}
              className="border-gray-400 placeholder-gray-800 w-80 py-1 outline-none border-[1px] rounded-full px-4"
            />
          </p>
        </div>
      </div>
      <ul className="space-y-1 text-gray-700">
        <span className="caption tracking-wide text-gray-500 uppercase">
          วันและเวลาทำการ
        </span>
        <li className="text-lg flex flex-wrap sm:text-[14px] text-gray-900 gap-4 ">
          <Grid>
            <FormControl
              sx={{ width: "100%", backgroundColor: "white" }}
              variant="outlined"
            >
              <InputLabel id="openDay-label">วันเปิดของคลินิก</InputLabel>
              <Controller
                name="openDay"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      input={<OutlinedInput label="วันเปิดของคลินิก" />}
                      MenuProps={MenuProps}
                      renderValue={(selected) => selected.join(", ")}
                      multiple
                    >
                      {days.map((input) => (
                        <MenuItem key={input} value={input}>
                          <ListItemText primary={input} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <TextField
                sx={{ backgroundColor: "white" }}
                variant="outlined"
                id="openTime"
                label="เวลาเปิดคลินิก"
                type="time"
                onChange={handleTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("openTime")}
              />
            </FormControl>
          </Grid>

          <Grid>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <TextField
                sx={{ backgroundColor: "white" }}
                variant="outlined"
                id="closeTime"
                label="เวลาปิดคลินิก"
                type="time"
                onChange={handleTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("closeTime")}
              />
            </FormControl>
          </Grid>
        </li>
      </ul>
      <div className="flex gap-4 pt-4 items-center justify-end">
        <div
          className="text-[#AD8259] cursor-pointer"
          onClick={() => setOpenEdit(false)}
        >
          ยกเลิก
        </div>
        <button
          className="bg-[#AD8259] border-[#AD8259] text-white cursor-pointer border-2 w-fit h-fit rounded-full px-10 p-4 py-1 hover:shadow-xl hover:shadow-[#AD8259]/60 hover:bg-[#E0B186] hover:border-[#E0B186]/5"
          type="submit"
        >
          บันทึก
        </button>
      </div>
    </form>
  );
}

export default EditClinicForm;
