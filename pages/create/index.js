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
  OutlinedInput,
  ListItemText,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import toast from "react-hot-toast";

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

function Create() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [daycareImageProfile, setDaycareImageProfile] = useState("");
  const [input, setInput] = useState({});
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
    getValues,
    setValue,
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
      openDay: [],
      owner_id: session.user.id,
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
      owner_id: session.user.id,
    };
    console.log(data);

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
          toast.success("กำลังสร้างคลิกนิก...🛠️🚧");
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
    if (file) {
      try {
        await reader.readAsDataURL(file);
        reader.onload = function () {
          cb(reader.result);
        };
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("กรุณาใส่รูปภาพคลินิก");
    }
  }

  console.log(
    watch([
      "clinic_name",
      "address",
      "phoneNumber",
      "owner",
      "email",
      "openDay",
      "openTime",
      "closeTime",
      "imageUrl",
    ])
  );

  return (
    <div>
      <Head>
        <title>Clinic | Create </title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="divide-y divide-[#A17851] divide-opacity-30">
        <Header />

        <main className="main bg-white pt-0 h-screen  scroll-smooth ">
          <h1 className="pageTitle sm:text-lg">สร้างคลินิก</h1>
          <div className="flex flex-col justify-between bg-[#fff9e6] m-3 rounded-2xl">
            <form>
              <div
                className=" sm:py-3 sm:mx-5 m-4 grid grid-cols-2 row-span-6 gap-2 lg:mx-20 lg:grid-cols-6 md:gap-2"
                onSubmit={handleSubmit}
              >
                <div className="col-start-1 col-span-2 md:col-span-4 lg:col-span-3  ">
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
                <div className="col-start-1 md:col-start-5 col-span-2 lg:col-start-4 lg:col-span-3">
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
                <div className="col-start-1 col-span-2 md:col-start-1 md:col-span-4 lg:col-span-6">
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
                <div className="col-start-1 col-span-2 md:col-start-5 lg:col-span-3 ">
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
                <div className="col-start-1 col-span-2 md:col-start-1 md:col-span-4 lg:col-start-4 lg:col-span-3">
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
                <div className="col-start-1 col-span-2 md:col-start-5 ">
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
                <div className="col-start-1 col-span-2 md:col-span-2 lg:col-start-4 ">
                  <label
                    className="inputLabel"
                    htmlFor="imageUrl"
                    onChange={uploadToClient}
                  >
                    อัพโหลดรูปคลินิก
                  </label>
                  <input
                    className=" border-0"
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    {...register("imageUrl", {
                      required: "Required",
                    })}
                  />
                </div>
                <div className="col-start-1 col-span-2">
                  <Grid>
                    <FormControl
                      sx={{ width: "100%", backgroundColor: "white" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel id="openDay-label">
                        วันเปิดของคลินิก
                      </InputLabel>
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
                </div>

                <div className="col-start-1 lg:col-start-3 md:col-start-5">
                  <Grid>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
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
                </div>
                <div className="col-start-2 lg:col-start-4 md:col-start-6">
                  <Grid>
                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      required
                    >
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
                </div>

                <div className="col-start-1 col-span-2  md:col-span-6 lg:col-span-6">
                  <label className="inputLabel" htmlFor="description">
                    ใส่คำอธิบายคร่าวๆเกี่ยวกับคลินิกของคุณ
                    เพื่อให้ผู้คนได้รู้จักคุณดีขึ้น 😊
                  </label>
                  <input
                    className="inputBox  flex flex-wrap sm:h-20 md:h-48 lg:h-52 display-linebreak "
                    type="textarea"
                    id="description"
                    name="description"
                    {...register("description", {
                      required: "Required",
                    })}
                  />
                </div>

                <div className="col-span-2 lg:col-span-6 md:col-span-6  items-center text-center ">
                  <input
                    type="submit"
                    className="bg-[#ffdf8e] font-bold text-lg text-[#AD8259] cursor-pointer rounded-full border-4
                    hover:border-[#AD8259] shadow-lg
                    hover:bg-transparent 
                    my-3 w-56 h-10 lg:w-64 lg:h-14 lg:text-xl"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* <div className="flex-grow h-full sm:m-3 bg-yellow-50 shadow-lg rounded-xl "> */}
        </main>
      </div>
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
