import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  TextField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FEFCE8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FEFCE8",
      },
    },
  },
});

function Create(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [daycareImageProfile, setDaycareImageProfile] = useState("");
  const [input, setInput] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const classes = useStyles(props);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedDays(event.target.days);
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const days = [
    { id: 1, label: "Monday" },
    { id: 2, label: "Tueday" },
    { id: 3, label: "Wednesday" },
    { id: 4, label: "Thursday" },
    { id: 5, label: "Friday" },
    { id: 6, label: "Saturday" },
    { id: 7, label: "Sunday" },
  ];

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setDaycareImageProfile(i);
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(i);
    }
  };

  function imageIsLoaded(e) {
    $("div.withBckImage").css({
      "background-image": "url(" + e.target.result + ")",
    });
  }

  const {
    register,
    value,
    watch,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      clinic_name: "",
      address: "",
      phoneNumber: "",
      owner: session.user.name,
      email: "",
      price: "",
      description: "",
    },
  });
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      clinic_name: event.target.clinic_name.value,
      address: event.target.address.value,
      phoneNumber: event.target.phoneNumber.value,
      owner: session.user.name,
      email: event.target.email.value,
      imageUrl: event.target.imageUrl.files,
      price: event.target.price.value,
      description: event.target.description.value,
      openDay: event.target.openDay.value,
      openTime: event.target.openTime.value,
      closeTime: event.target.closeTime.value,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let imgBase64 = "";
    await getBase64(data.imageUrl[0], async (result) => {
      data.imageUrl = result;

      const response = await axios
        .post(
          `https://olive-service-api.vercel.app/clinic/create`,
          data,
          axiosConfig
        )
        .then(async (res) => {
          console.log("RESPONSE RECEIVED: ", res.data);
          const { owner } = res.data.owner;
          const { cid } = res.data._id;

          localStorage.setItem("cid", res.data._id);
          localStorage.getItem("cid", cid);

          localStorage.setItem("owner", res.data.owner);
          localStorage.getItem("owner", owner);

          router.push(
            {
              pathname: "/",
              query: {
                cid: localStorage.getItem("cid", cid),
                owner: localStorage.getItem("owner", owner),
              },
            },
            "/"
          );
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  async function getBase64(file, cb) {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
  }

  console.log(
    watch(["clinic_name", "address", "phoneNumber", "owner", "email"])
  );

  return (
    <div>
      <Head>
        <title>Daycare | Create </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main bg-white md:h-full overflow-hidden ">
        <div className="flex-grow md:pt-0 pb-0  mt-5 mb-5  px-20 py-20  sm:px-6 lg:px-8 bg-yellow-50 rounded-md ">
          <section className="pt-6 ">
            <div className="text-center max-w-2xl pb-3 mx-24 lg:mx-96 ">
              <h1 className="font-bold font-noto text-2xl lg:text-3xl text-[#6C5137] ">
                สร้างคลินิก
              </h1>
            </div>
          </section>
          <form
            className="mt-0 grid grid-cols-2 gap-2 md:grid md:grid-cols-6 md:gap-2"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-3  col-span-2">
              <label className="inputLabel" htmlFor="clinic_name">
                ชื่อคลินิก
              </label>
              <input
                className="inputBox"
                type="text"
                id="clinic_name"
                name="clinic_name"
                onChange={handleInputChange}
                {...register("clinic_name", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-3 col-span-2">
              <label className="inputLabel" htmlFor="owner">
                ชื่อเจ้าของ
              </label>
              <input
                className="inputBox"
                type="text"
                id="owner"
                value={session.user.name}
                name="owner"
                {...register("owner", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-4">
              <label className="inputLabel" htmlFor="address">
                ที่อยู่
              </label>
              <input
                className="inputBox"
                type="text"
                id="address"
                name="address"
                {...register("address", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="phoneNumber">
                เบอร์โทรติดต่อของคลินิก
              </label>
              <input
                className="inputBox"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                {...register("phoneNumber", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="email">
                อีเมล์
              </label>
              <input
                className="inputBox"
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="price">
                ราคาเริ่มต้น (฿/ชั่วโมง)
              </label>
              <input
                className="inputBox"
                type="text"
                id="price"
                name="price"
                {...register("price", {
                  required: "Required",
                })}
              />
            </div>
            <div className="md:col-span-2 sm:col-span-6">
              <label
                className="inputLabel"
                htmlFor="imageUrl"
                onChange={uploadToClient}
              >
                อัพโหลดรูปคลินิก
              </label>
              <input
                className="inputBox border-0 pb-10 "
                type="file"
                id="imageUrl"
                name="imageUrl"
                {...register("imageUrl", {
                  required: "Required",
                })}
              />
            </div>
            <FormControl
              sx={{
                background: "white",
              }}
              fullWidth
            >
              <InputLabel id="openDay-label">วันเปิดของคลินิก</InputLabel>
              <Controller
                render={({ value, field }) => (
                  <Select
                    {...field}
                    labelId="openDay"
                    id="openDay"
                    label="openDay"
                    onChange={handleChange}
                  >
                    {days.map((input, key) => (
                      <MenuItem key={input.id} value={input.label}>
                        {input.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                name="openDay"
              />
            </FormControl>

            <TextField
              sx={{backgroundColor:'white'}}
            variant="outlined"
              id="openTime"
              label="เวลาเปิดคลินิก"
              type="time"
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.TextField}
            />

            <TextField
            sx={{backgroundColor:'white'}}
            variant="outlined"
              id="closeTime"
              label="เวลาปิดคลินิก"
              type="time"
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.TextField}
            />
            <div className="md:col-span-6 pt-8">
              <label className="inputLabel" htmlFor="description">
                ใส่คำอธิบายคร่าวๆเกี่ยวกับคลินิกของคุณ เพื่อให้ผู้คนได้รู้จักคุณดีขึ้น 😊
              </label>
              <input
                className="inputBox flex flex-wrap py-20"
                type="text"
                id="description"
                name="description"
                {...register("description", {
                  required: "Required",
                })}
              />
            </div>

            <div className="md:col-start-3 md:col-span-2 items-center text-center ">
              <input
                type="submit"
                className="buttonPrimary px-20 md:px-30 bg-[#AD8259] cursor-pointer font-bold text-lg"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Create;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
